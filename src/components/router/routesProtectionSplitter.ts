import {RouterMapT} from './routerTypes';


export default function splitRoutesByProtection(routerMap: RouterMapT) {
  const protectedRoutes = (Object.entries(routerMap)
    .filter(([, {isAuthRequired}]) => isAuthRequired)
    .map(([key]) => routerMap[key]));

  const unprotectedRoutes = (Object.entries(routerMap)
    .filter(([, {isAuthRequired}]) => !isAuthRequired)
    .map(([key]) => routerMap[key]));

  return [protectedRoutes, unprotectedRoutes];
}

// так нельзя (
// export const ProtectedAppRoutes: FC = (props: any) =>
//   <>
//     {unprotectedKeys.map((name) => AppRoutingMap[name])
//       .map(({link, Component}, i) => (
//       <Route key={i} path={link} element={Component({})}/>
//     ))}
//   </>;
//   </>;
