import React from 'react';
import checkAuth from '@/utils/checkAuth';
import Exception403 from '@/pages/exception/403';
const { pathToRegexp } = require('path-to-regexp');
interface AuthComponentProps {
  location: any;
  route: any;
  children?: React.ReactNode;
}

const getRouteAuthority = (path: string, routeData: any[]) => {
  let authorities: string[] | string | undefined;

  routeData.forEach(route => {
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

const Authorized: React.FC<AuthComponentProps> = props => {
  const { location, route, children } = props;
  // console.log('authority', location, route, getRouteAuthority(location.pathname, route.routes));
  if (checkAuth(getRouteAuthority(location.pathname, route.routes))) {
    return <>{children}</>;
  } else {
    return <Exception403 />;
  }
};

export default Authorized;
