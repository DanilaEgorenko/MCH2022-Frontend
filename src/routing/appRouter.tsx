import React, {FunctionComponent} from 'react';

import Router from '../components/router/routerComponent';

import AppRouterMap from './appRoutingMap';

import {useSelector} from 'react-redux';
import {selectAuth} from '../redux/reducers/authReducer';


// //////////////////////////////////////////////////////
//
//              Конфиг приложения: router
//
// //////////////////////////////////////////////////////


const AppRouter: FunctionComponent = () => {
  const isAuthorized = useSelector(selectAuth).isAuthorized;
  return (
    <Router routerMap={AppRouterMap} isAuthorized={isAuthorized}/>
  );
};

export default AppRouter;
