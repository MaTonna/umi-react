import store from 'store';
import API from '@/api';
import { MenuItem } from '@/hooks/useAsyncLayoutMenu';
import RouteConfig from '../../config/config';
import { IRoute } from 'umi-types/config';

// 格式化顶部菜单数据
function formatTopMenu(topMenuList: any[]): MenuItem[] {
  return topMenuList.map(menuItem => ({
    path: menuItem.id,
    name: menuItem.topMenuName,
  }));
}

// 从缓存获取顶部菜单
export function getTopMenuFromStorage() {
  const userInfo = store.get('userInfo') || {};
  const { userId = '' } = userInfo;
  const topMenuList = store.get('topMenuList_'.concat(userId));
  return topMenuList && formatTopMenu(topMenuList);
}

// 获取顶部菜单
export function getTopMenu() {
  let topMenuList = getTopMenuFromStorage();
  return new Promise<MenuItem[]>((resolve, reject) => {
    if (topMenuList) {
      resolve(topMenuList);
      return;
    }
    API.home.getTopMenu().then((menuInfo: any) => {
      const userInfo = store.get('userInfo') || {};
      const { userId = '' } = userInfo;
      topMenuList = menuInfo.topMenuList;
      store.set('topMenuList_'.concat(userId), topMenuList);
      resolve(formatTopMenu(topMenuList));
    });
  });
}

// 格式化侧边菜单数据
function formatSideMenu(sideMenuList: any[]): MenuItem[] {
  return sideMenuList.map(menuItem => ({
    path: menuItem.sortMenuHref,
    name: menuItem.sortMenuName,
  }));
}

// 过滤没有权限的侧边菜单
function filterAuthSideMenu(list: any[], authorities: any[]) {
  return list.filter((menuItem: any) => {
    return authorities.some((auth: any) => {
      return auth.authority === menuItem.sortMenuAuthority;
    });
  });
}

// 从缓存获取侧边菜单
export function getSideMenuByIdFromStorage(topMenuId: string) {
  const userInfo = store.get('userInfo') || {};
  const { authorities = [], userId = '' } = userInfo;
  // 获取侧边菜单缓存
  const sideMenuList = store.get(`sideMenuList_${topMenuId}_${userId}`);
  return sideMenuList && formatSideMenu(filterAuthSideMenu(sideMenuList, authorities));
}

// 通过顶部菜单id获取侧边菜单
export function getSideMenuById(topMenuId: string) {
  // 获取侧边菜单缓存
  let sideMenuList = getSideMenuByIdFromStorage(topMenuId);
  return new Promise<MenuItem[]>((resolve, reject) => {
    if (sideMenuList) {
      resolve(sideMenuList);
      return;
    }
    // 不存在缓存，获取侧边菜单信息
    API.home.getMenu({ topMenuId }).then((menuInfo: any) => {
      const userInfo = store.get('userInfo') || {};
      const { authorities = [], userId = '' } = userInfo;

      sideMenuList = menuInfo.sortMenuList;
      store.set(`sideMenuList_${topMenuId}_${userId}`, sideMenuList);

      const menuRouteMap: MenuRouteMap = store.get('menuRouteMap') || {};
      sideMenuList.forEach((data: any) => {
        menuRouteMap[data.sortMenuHref] = data;
      });
      store.set('menuRouteMap', menuRouteMap);

      resolve(formatSideMenu(filterAuthSideMenu(sideMenuList, authorities)));
    });
  });
}

interface MenuRouteMapItem {
  topMenuId: string;
  id: string;
  sortMenuHref: string;
  sortMenuAuthority: string;
}

export interface MenuRouteMap {
  [key: string]: MenuRouteMapItem;
}

// 通过url获取侧边菜单
export function getSideMenuByUrl(url: string) {
  return new Promise<MenuItem[]>((resolve, reject) => {
    const getMenu = (topMenuId: string) => {
      getSideMenuById(topMenuId).then((data: any) => resolve(data));
    };

    getSelectedMenuInfoByUrl(url).then(selectedMenuInfo => {
      const { topMenuId } = selectedMenuInfo;
      getMenu(topMenuId);
    });
  });
}

// 判断路由是否存在
function _examinIsRouteExist(url: string, routes: IRoute[]): boolean {
  return routes.some(route => {
    if (route.path === url) return true;
    if (route.routes) return _examinIsRouteExist(url, route.routes);
    return false;
  });
}

export function examinIsRouteExist(url: string) {
  return _examinIsRouteExist(url, RouteConfig.routes || []);
}

// 从缓存获取选中顶部菜单id
export function getSelectedMenuInfoByUrlFromStorage(url: string) {
  const menuRouteMap: MenuRouteMap = store.get('menuRouteMap') || {};
  return menuRouteMap[url] || { topMenuId: '', id: '', sortMenuHref: '', sortMenuAuthority: '' };
}

// 通过url获取选中的顶部菜单id
export function getSelectedMenuInfoByUrl(url: string) {
  let selectedMenuInfo: MenuRouteMapItem = getSelectedMenuInfoByUrlFromStorage(url);
  return new Promise<MenuRouteMapItem>((resolve, reject) => {
    if (selectedMenuInfo.topMenuId || url === '/' || !examinIsRouteExist(url)) {
      resolve(selectedMenuInfo);
      return;
    }
    API.home.getMenuByUrl({ url }).then((menuInfo: any) => {
      const menuRouteMap: MenuRouteMap = store.get('menuRouteMap') || {};
      const { currentSortMenu = {} } = menuInfo;
      menuRouteMap[url] = currentSortMenu;
      selectedMenuInfo = currentSortMenu;
      store.set('menuRouteMap', menuRouteMap);
      resolve(selectedMenuInfo);
    });
  });
}

export function clearMenuStorage(userId: string) {
  store.clearAll();
}

// 获取路由icon与路由的对应关系
interface IconMap {
  [key: string]: string;
}
function _getRouteIconMap(routes: IRoute[], iconMap: IconMap) {
  routes.forEach(item => {
    if (item.path && item.icon) {
      iconMap[item.path] = item.icon;
    }
    if (item.routes) _getRouteIconMap(item.routes, iconMap);
  });
}

export function getRouteIconMap() {
  const iconMap: IconMap = {};
  _getRouteIconMap(RouteConfig.routes || [], iconMap);
  return iconMap;
}
