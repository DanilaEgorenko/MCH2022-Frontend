import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootStateT} from '../store';

/*

формат ИНН

ИНН физического лица представляет собой последовательность из 12 арабских цифр. Первые две из них означают код субъекта
Российской Федерации, третья и четвертая — номер налоговой инспекции, шесть цифр с пятой по десятую — номер налоговой
записи налогоплательщика

Если в качестве индивидуального предпринимателя регистрируется физическое лицо с ИНН, ему не назначают новый ИНН,
а используютимеющийся. Если у физического лица ИНН нет, ему присваивают ИНН и выдают
свидетельство о постановке на учет вместе с остальными документами.

Если в качестве индивидуального предпринимателя регистрируется физическое лицо с ИНН, ему не назначают новый ИНН,
а используют имеющийся. Если у физического лица ИНН нет,
ему присваивают ИНН и выдают свидетельство о постановке на учет вместе с остальными документами.


формат ОГРН
*/

// eslint-disable-next-line max-len
// https://ru.wikipedia.org/wiki/Основной_государственный_регистрационный_номер#:~:text=Государственный%20регистрационный%20номер%20записи%2C%20вносимый,Х%20Х%20Х%20Х%20Ч

// перевод аббревиатур
// https://englishfull.ru/znat/inn-po-angliyski.html
export interface CompanyI {
  // ИНН (Идентификационный Номер Налогоплательщика) — ITN (Indi­vid­ual Tax­pay­er Num­ber)
  itn: string,
  // ОГРН (Основной Государственный Регистрационный Номер) — PSRN (Pri­ma­ry State Reg­is­tra­tion Number)
  psrn: string,
  // наззвание компании
  name: string,
  // юридическое имя
  legalName: string,
  email: string,
  phone: string,
  link: string,
  category: {
    title: string,
    industry: string,
  },
  // Место регистрации
  placeOfIncorporation: string,
  // Место производства
  placeOfProduction: string,
  // представител компании
  representative: string,
}

export interface AuthStateI extends CompanyI {
  isAuthorized: boolean,
  token: string,
}

interface ApiResponseLoginI extends CompanyI {
  token: string,
}

const initialState: AuthStateI = {
  isAuthorized: false,
  token: '',
  email: '',
  itn: '',
  psrn: '',
  name: '',
  legalName: '',
  link: '',
  category: {
    title: '',
    industry: '',
  },
  placeOfIncorporation: '',
  placeOfProduction: '',
  representative: '',
  phone: '',
};


export const AuthSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    logout: (state: AuthStateI) => {
      Object.assign(state, initialState);
    },

    login: (state: AuthStateI, action: PayloadAction<ApiResponseLoginI>) => {
      Object.assign(state, action.payload);
      state.isAuthorized = true;
    },

    update: (state: AuthStateI) => {
      console.log('Добавить обновление информации о компании', state);
    },
  },
});

export const AuthActions = AuthSlice.actions;
export const selectAuth = (state: RootStateT) => state.AuthReducer;

export default AuthSlice.reducer;
