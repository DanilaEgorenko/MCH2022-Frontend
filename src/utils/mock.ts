import {CompanyI} from "../redux/reducers/authReducer";
import {mockNet} from "./utils";
import {AjaxResponse} from '../api/ajax';

export const companyData: CompanyI = {
  itn: '101010101012',
  psrn: '1313131313013',
  name: 'Корпорация добра',
  legalName: 'ОАО "всех обманули Корпорация зла"',
  email: 'corp@evilorgood.com',
  link: 'https://gitlab.com/Denactive/mch2022-frontend',
  category: {
    title: 'Интернет-реклама',
    industry: 'Реклама и маркетинг',
  },
  placeOfIncorporation: 'Москва',
  placeOfProduction: 'Липецк',
  representative: 'Зубенко Михаил Петрович',
  phone: '8-800-000-00-00',
};

export function mockApiLogin() {return mockNet(companyData) as Promise<AjaxResponse>;}
