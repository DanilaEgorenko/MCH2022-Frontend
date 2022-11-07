import React, {FunctionComponent} from 'react';
import {useLocation, Outlet, Navigate} from 'react-router-dom';

interface RoutesProtectorProps {
  isAuthorized: boolean,
  redirectLink: string,
}

/**
 *
 * Все страницы (React.FC), обернутые в RoutesProtector
 * не будут доступны для роутинга, пока не будет
 * выполнено isAuthorized === true.
 *
 * Если isAuthorized === false, выполняется редирект на
 * redirectLink. Исходный путь сохраняется в HistoryAPI.state.from.
 * HistoryAPI.state реализует интерфейс HistoryStateI (см routerTypes.ts).
 * Чтобы прочитать HistoryAPI.state.from нужно сделать преобразование к
 * типу этого интерфейса или интерфейса-наследника.
 *
 */

const RoutesProtector: FunctionComponent<RoutesProtectorProps> = ({isAuthorized, redirectLink}) => {
  const location = useLocation();
  console.log('isAuthorized:', isAuthorized);
  return isAuthorized ? (
    <Outlet />
  ) : (
    // replace эквивалентно replace={true}
    // говорит о том, чтобы после логина возвращало на ту же страницу,
    // с которой произошел редирект на страницу логина
    <Navigate to={redirectLink} replace state={{from: location}} />
  );
};

export default RoutesProtector;
