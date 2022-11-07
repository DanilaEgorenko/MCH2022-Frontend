import MainPage from '../pages/mainPage';
import AuthPage from '../pages/authPage';
import CompanyPage from '../pages/companyPage';
import IndustryPage from '../pages/industryPage';
import CategoryPage from '../pages/categoryPage';

import {RouterMapT} from '../components/router/routerTypes';
import type {NameLinksMapT} from './appRoutingHeaderConfig';


// //////////////////////////////////////////////////////
//
//              Конфиг приложения: paths
//
// //////////////////////////////////////////////////////


const AppRoutingMap: RouterMapT<NameLinksMapT> = {
  'Main': {
    link: '/',
    Component: MainPage,
    isAuthRequired: false,
  },
  'Industry': {
    link: '/industry/:id',
    Component: IndustryPage,
    isAuthRequired: false,
  },
  'Auth': {
    link: '/login',
    Component: AuthPage,
    isAuthRequired: false,
  },
  'Company': {
    link: '/company/:title',
    Component: CompanyPage,
    isAuthRequired: false,
  },
  'Category': {
    link: '/category/:id',
    Component: CategoryPage,
    isAuthRequired: false,
  },
  'CompanyWithoutParam': {
    link: '/company',
    Component: CompanyPage,
    isAuthRequired: true,
  },
  'Search': {
    link: '/search',
    Component: MainPage,
    isAuthRequired: false,
  },
} as const;

export default AppRoutingMap;
