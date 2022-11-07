import React, {FC} from 'react';
import HeaderComponent from '../components/header/headerComponent';
import {AppRoutingList, AppDefaultHeaderLinks, AppPageNamesT} from '../routing/appRoutingHeaderConfig';


// //////////////////////////////////////////////////////
//
//            Стандартная страница приложения
//            Все вложенные элементы обернуты
//               в Materialize .container
//
// //////////////////////////////////////////////////////


interface PageProps {
  nameOfActive: AppPageNamesT;
}

const RootPage: FC<PageProps> = ({nameOfActive, children}) => (
  <>
    <HeaderComponent
      nameLinkMapT={AppRoutingList}
      displayedNames={AppDefaultHeaderLinks}
      nameOfActive={nameOfActive} />
    <div className="container">
      {children}
    </div>
  </>
);

export default RootPage;
