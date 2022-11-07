import React, {FunctionComponent} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import RoutesProtector from './routesProtectorComponent';

import splitRoutesByProtection from './routesProtectionSplitter';

import {RouterMapT} from './routerTypes';
import IndustryPage from '../../pages/industryPage';

// аналоги

// работающий
// https://github.com/iamshaunjp/React-Router-Version-6/blob/lesson-3/src/App.js

// не работающий но с такой же концептцией с примером History.state
// https://github.com/lesterfernandez/redirect-react-router-tutorial/blob/master/src/components/LogInButtons.jsx
// AppRoutes вынесены в отдельный компонент. Только так. Иначе, useLocation и, как следствие useNavigate, не работают.

// https://stackoverflow.com/questions/70491774/usenavigate-may-be-used-only-in-the-context-of-a-router-component
// Как идея, RouterComponent мог бы возвращать массив элементов Routes, а уже они бы вставлялись в BrowserRouter,
// но так нельзя(

interface AppRouterProps<L extends string = string> {
  routerMap: RouterMapT,
  isAuthorized: boolean,
  redirectLink?: L,
}

const AppRoutes: FunctionComponent<AppRouterProps> = ({routerMap, isAuthorized, redirectLink = '/login'}) => {
  const [ProtectedAppRoutes, UnprotectedAppRoutes] = splitRoutesByProtection(routerMap);

  return (
    <Routes>

      {UnprotectedAppRoutes.map(({link, Component}, i) => (
        <Route key={i} path={link} element={<Component />}/>
      ))}

      {/* Страницам, обернутым RoutesProtector нужна авторизация*/}
      <Route element={<RoutesProtector isAuthorized={isAuthorized} redirectLink={redirectLink} />}>
        {ProtectedAppRoutes.map(({link, Component}, i) => (
          <Route key={i} path={link} element={<Component />}/>
        ))}
      </Route>

    </Routes>
  );
};

/**
 * Передается конфигурация в формате RouterMapT (см routerTypes.ts)
 * Те пути, которые помечены как isAuthRequired не будут доступны,
 * пока isAuthorized === false.
 *
 * Если isAuthorized === false, при попытке перейти по защищенной ссылке
 * будет происходить редирект на redirectLink (по умолчанию '/login').
 * Исходный путь сохранится в HistoryAPI.state.from.
 *
 * HistoryAPI.state реализует интерфейс HistoryStateI (см routerTypes.ts).
 * Чтобы прочитать HistoryAPI.state.from нужно сделать преобразование к
 * типу этого интерфейса или интерфейса-наследника.
 *
 */

const AppRouter: FunctionComponent<AppRouterProps> = ({routerMap, isAuthorized, redirectLink = '/login'}) => (
  <BrowserRouter>
    <AppRoutes routerMap={routerMap} isAuthorized={isAuthorized} redirectLink={redirectLink}/>
  </BrowserRouter>
);


export default AppRouter;
