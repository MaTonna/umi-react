import { useState, useEffect } from 'react';
import checkAuth from '@/utils/checkAuth';

interface MenuItem {
  name: string;
  path: string;
  icon?: string;
  routes?: MenuItem[];
  authority?: string[];
}
interface LayoutMenuData {
  menuTopList: MenuItem[];
  menuSideMap: { [key: string]: MenuItem[] };
}

interface Props {
  routes: MenuItem[];
}

// 格式化 routes 数据
const formatter = (data: MenuItem[]): LayoutMenuData => {
  const routes = data.filter(item => item && item.name && item.path);
  const menuTopList: MenuItem[] = [];
  const menuSideMap: { [key: string]: MenuItem[] } = {};
  routes.forEach(item => {
    menuTopList.push({
      name: item.name,
      path: item.path,
    });

    if (item.routes) {
      menuSideMap[item.path] = item.routes
        .filter(item => item && item.name && item.path && checkAuth(item.authority))
        .map(item => {
          return {
            name: item.name,
            path: item.path,
            icon: item.icon,
          };
        });
    }
  });

  return {
    menuTopList,
    menuSideMap,
  };
};

const _getMenuTopKey = (pathname: string) => {
  const pathArr = pathname.split('/');
  return `/${pathArr[1]}`;
};

const useLayoutMenu = (props: Props) => {
  const { routes } = props;
  const { pathname } = location;
  const _menuTopSelected = _getMenuTopKey(pathname);
  const _menuSideSelected = pathname;
  const menuData: LayoutMenuData = formatter(routes);
  const [menuTopSelected, setMenuTopSelected] = useState([_menuTopSelected]);
  const [menuSideSelected, setMenuSideSelected] = useState([_menuSideSelected]);
  const [menuTopList, setMenuTopList] = useState(menuData.menuTopList);
  const [menuSideList, setMenuSideList] = useState();

  const selectMenuTop = (key: string) => {
    setMenuTopSelected([key]);
  };

  const selectMenuSide = (key: string) => {
    setMenuSideSelected([key]);
  };

  useEffect(() => {
    let key;
    if (menuTopSelected && menuTopSelected[0]) {
      key = menuTopSelected[0];
    }
    key && setMenuSideList(menuData.menuSideMap[key]);
  }, [menuTopSelected]);

  useEffect(() => {
    const key = _getMenuTopKey(pathname);
    selectMenuTop(key);
    selectMenuSide(pathname);
  }, [pathname]);

  return {
    menuTopList,
    menuTopSelected,
    menuSideList,
    menuSideSelected,
    selectMenuTop,
    selectMenuSide,
  };
};

export default useLayoutMenu;
