import { useState, useEffect } from 'react';

let curPathname = '/';

export interface MenuItem {
  name: string;
  path: string;
  icon?: string;
}
interface SelectedMenuInfo {
  topMenuId: string;
  sideMenuList: MenuItem[];
}
interface Props {
  pathname: string;
  defaultMenuTopList: MenuItem[];
  getSideMenu?: (topMenuPath: string) => Promise<MenuItem[]>;
  getSelectedMenuInfoByUrl?: (url: string) => Promise<string>;
}

const useAsyncLayoutMenu = (props: Props) => {
  const { pathname, defaultMenuTopList, getSideMenu, getSelectedMenuInfoByUrl } = props;

  const [menuTopSelected, setMenuTopSelected] = useState(['']);
  const [menuSideSelected, setMenuSideSelected] = useState(['']);
  const [menuTopList, setMenuTopList] = useState(defaultMenuTopList);
  const [menuSideList, setMenuSideList] = useState([] as MenuItem[]);
  const [menuSideListLoading, setMenuSideListLoading] = useState(false);

  const selectMenuTop = (key: string) => {
    setMenuTopSelected([key]);
  };

  const selectMenuSide = (key: string) => {
    setMenuSideSelected([key]);
  };
  useEffect(() => {
    let key;
    if (menuTopSelected && menuTopSelected[0]) key = menuTopSelected[0];
    if (key) {
      setMenuSideListLoading(true);
      getSideMenu(key)
        .then(menuSideList => setMenuSideList(menuSideList))
        .catch(() => { })
        .finally(() => setMenuSideListLoading(false));
    }
  }, [menuTopSelected]);

  useEffect(() => {
    if (curPathname !== pathname) {
      curPathname = pathname;
      if (pathname.indexOf('/exception') > -1) {
        setMenuTopSelected(['']);
        setMenuSideSelected(['']);
        return;
      }
      getSelectedMenuInfoByUrl(pathname).then(data => {
        setMenuTopSelected([data]);
        setMenuSideSelected([pathname]);
      });
    }
  }, [pathname]);

  return {
    menuTopList,
    menuTopSelected,
    menuSideList,
    menuSideSelected,
    selectMenuTop,
    selectMenuSide,
    menuSideListLoading,
  };
};

export default useAsyncLayoutMenu;
