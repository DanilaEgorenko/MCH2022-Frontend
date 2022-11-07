import React, {FC} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import ProfileHeaderSign from '../profileHeaderSign/profileHeaderSign';

import './header.scss';
// не разообрался, почему в этой версии React не работает импорт
// import logo from './logo.png';
const logo = process.env.PUBLIC_URL + '/img/logo.png';

type HeaderMapNameT<N extends string = string> = N;

type HeaderNameLinkMapT<N extends string = string, L extends string = string> = {
  // eslint-disable-next-line no-unused-vars
  [key in HeaderMapNameT<N>]: {
    headerSign: string,
    link: L,
  };
};

interface HeaderProps<N extends string = string, L extends string = string> {
  readonly nameLinkMapT: HeaderNameLinkMapT<N, L>,
  readonly displayedNames: N[],
  readonly nameOfActive: N;
}


/**
  * Универсальный компонент хедера.
  * Настраивается через конфиг.
  * @param {HeaderNameLinkMapT} headerLinksMap - карта соответствия: {
  *   headerSign: string;
  *   link: L;
  * }
  * @param {string[]} displayedNames - массив тех ключей карты, которые будут отображаться
  * @param {string} nameOfActive - имя того ключа, который подствечивается как текущая страница
  * @return {JSX}
*/
const HeaderComponent: FC<HeaderProps> = ({nameLinkMapT, displayedNames, nameOfActive}) => {
  const navigate = useNavigate();
  const isMainPage = useLocation().pathname === '/';
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper theme-color">
          {!isMainPage &&
            <button className="back btn grey darken-3" onClick={() => navigate(-1)}>&#8592; назад</button>}
          <Link to="/" className="logo left">
            <img className="material-icons" alt='Главная' src={logo} height={56}/>
          </Link>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            {displayedNames.map((page, i) => (
              <li className={page === nameOfActive ? 'active' : ''} key={i}>
                <Link to={nameLinkMapT[page].link}>{nameLinkMapT[page].headerSign}</Link>
              </li>
            ))}
          </ul>
          <div className="right">
            <ProfileHeaderSign />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
