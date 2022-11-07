import React, {FC, useState, FormEvent, FormEventHandler, ChangeEventHandler, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import HeaderComponent from '../components/header/headerComponent';
import ValidatableInput from '../components/validatableInput/validatableInputComponent';

import Ajax from '../api/ajax';
import regexpValidation from '../utils/regexp';

import useMaterialize from '../hooks/useMaterialize';

import store from '../redux/store';
import {AuthActions} from '../redux/reducers/authReducer';

import {mock} from '../utils/globals';
import {mockApiLogin} from '../utils/mock';

import type {HistoryStateI} from '../components/router/routerTypes';

import '../index.scss';

const AuthPage: FC = () => {
  // с их помощью либо делаем редирект на то место, где требовалась
  // аутентификация, либо на главную
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [srvErr, setSrvErr] = useState('');
  const M = useMaterialize();

  useEffect(() => M.updateTextFields());

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
    event.preventDefault();
    // test2@mail.ru
    // password123
    (mock ? mockApiLogin() : Ajax.post({
      url: 'login/',
      body: {
        'email': email,
        'password': password,
      },
    })).then(({status, response}) => {
      if (status === Ajax.STATUS.ok) {
        store.dispatch(AuthActions.login(response.data));
        if ((location.state as HistoryStateI)?.from) {
          navigate((location.state as HistoryStateI).from);
        } else {
          navigate('/company');
        }
      } else {
        console.warn(response.msg);
        setSrvErr(response.msg);
      }
    });
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e: FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  return (
    <div className='auth'>
      <HeaderComponent
        nameLinkMapT={{}}
        displayedNames={[]}
        nameOfActive={''} />
      <div className='container'>
        <h3 className='theme-color'>&nbsp;</h3>

        <div className='row'>
          <div className='plate col s4 offset-s4'>

            <form className='w-100' onSubmit={handleSubmit}>
              <div className='container'>
                <h4 className='center'>Вход</h4>
                <div className='divider'></div>
                <div className='row'>
                  <ValidatableInput className='col s12'
                    id='email'
                    labelSign='E-mail'
                    onChange={handleEmailChange}
                    required={true}
                    tooltipWidth = '200px'
                    conditions={regexpValidation.email.conditions} />
                </div>
                <div className='row'>
                  <ValidatableInput className='col s12'
                    id='password'
                    type='password'
                    labelSign='Пароль'
                    trimmed={false}
                    onChange={handlePasswordChange}
                    required={true}
                    tooltipWidth = '200px'
                    conditions={regexpValidation.password.conditions} />
                </div>
                {srvErr ?
                  <div className='row'>
                    <p>{srvErr}</p>
                  </div> :
                  ''}
                <div className='row'>
                  <button className='btn grey darken-3 waves-effect waves-light right'
                    type='submit'
                    name='action'>
                    Войти
                    <i className='material-icons right'>arrow_forward</i>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
