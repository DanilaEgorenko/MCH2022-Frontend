// godlike ts
// https://stackoverflow.com/questions/45251664/typescript-derive-union-type-from-tuple-array-values

// export const AppRoutingList = {
//   'Main':  ['/',    'Главная'],
//   'About': ['/about', 'О нас'],
//   'Auth':  ['/login',  'Вход'],
// } as const;


// //////////////////////////////////////////////////////
//
//              Конфиг приложения: Header
//
// //////////////////////////////////////////////////////


export const AppRoutingList = {
  'Main': {
    link: '/',
    headerSign: 'Главная',
    headerDefaultDisplay: true,
  },
  // страница с категориями товаров в отрасли
  'Industry': {
    link: '/industry/:id',
    headerSign: 'Отрасль',
    headerDefaultDisplay: false,
  },
  'Auth': {
    link: '/login',
    headerSign: 'Вход',
    headerDefaultDisplay: false,
  },
  'Company': {
    link: '/company/:title',
    headerSign: 'Компания',
    headerDefaultDisplay: false,
  },
  'Category': {
    link: '/category/:id',
    headerSign: 'Категория',
    headerDefaultDisplay: false,
  },
  'CompanyWithoutParam': {
    link: '/company',
    headerSign: 'Компания',
    headerDefaultDisplay: false,
  },
  'Search': {
    link: '/search',
    headerSign: 'Поиск',
    headerDefaultDisplay: false,
  },
} as const;

export type AppPageNamesT = keyof typeof AppRoutingList;
export type AppLinksT = typeof AppRoutingList[AppPageNamesT]['link'];
export type AppHeaderSignsT = typeof AppRoutingList[AppPageNamesT]['headerSign'];

export type NameLinksMapT = {
  [key in AppPageNamesT]: typeof AppRoutingList[key]['link'];
};


export const AppDefaultHeaderLinks = (Object.keys(AppRoutingList) as AppPageNamesT[])
  .filter((key) => AppRoutingList[key].headerDefaultDisplay);
