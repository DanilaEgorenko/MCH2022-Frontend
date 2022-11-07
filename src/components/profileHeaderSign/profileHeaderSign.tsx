import React, {FC, useEffect} from 'react';
import {AuthActions, selectAuth} from '../../redux/reducers/authReducer';
import {useSelector} from 'react-redux';

import './profileHeaderSign.scss';

import factoryPlaceholder from '../../static/imgs/industry/medicine.jpeg';
import useMaterialize from '../../hooks/useMaterialize';
import {useNavigate} from 'react-router';
import store from '../../redux/store';


const ProfileHeaderSign: FC = () => {
  const {
    psrn, // ОГРН (Основной Государственный Регистрационный Номер) — PSRN (Pri­ma­ry State Reg­is­tra­tion Number)
    name, // наззвание компании
    representative, // представител компании
    isAuthorized,
  } = useSelector(selectAuth);

  const navigate = useNavigate();

  if (isAuthorized) {
    return (
      <>
        <div className='header__profile_sign dropdown-trigger' data-target='dropdown_profile_action'>
          <div className='header__profile_sign__text_box'>
            <h5 className='header__profile_sign__text_line'>{name}</h5>
            <p className='header__profile_sign__text_line'>ОГРН {psrn}</p>
            <p className='header__profile_sign__text_line'>{representative}</p>
          </div>
          <div className='header__profile_sign__avatar_box'>
            <img src={factoryPlaceholder} alt='профиль'
              className='header__profile_sign__avatar'
            />
            <div className='header__profile_sign__dropdown_content'>
              <button className='btn-small grey darken-3 waves-effect waves-light'
                onClick={() => navigate('/company')}>Профиль</button>
              <button className='btn-small grey darken-3 waves-effect waves-light center'
                onClick={() => store.dispatch(AuthActions.logout())}>Выход</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <ul>
      <li><a href='/register'>Зарегистрироваться</a></li>
      <li><a href='/login'>Войти</a></li>
    </ul>
  );
};

export default ProfileHeaderSign;
