import React, {FC} from 'react';
import RootPage from './rootPage';

import '../index.scss';

const temlatePage: FC = () => (
  <RootPage nameOfActive='Main'>
    <h3 className="light-blue-text text-lighten">Привет</h3>
    <div className="row jc-sp-btw">


    </div>
  </RootPage>
);


export default temlatePage;
