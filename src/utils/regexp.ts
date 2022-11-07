type InputHTML5ValidationAttributesT = {
  pattern: RegExp;
  errorMsg: string;
  validation: {
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    type?: HTMLInputElement['type'];
  };
  conditions: {
    msgOnTrue: string,
    condition: (value: string) => boolean,
  }[];
};

// Только буквенные латинские символы и _ числом от 4 до 256
export const login = /^[a-zA-Z0-9_]{4,256}$/;
export const loginSymbols = /^[a-zA-Z0-9_]*$/;

// E-mail _ числом от 6 до 128
// export const email = /^[a-zA-Z][.a-zA-Z]{0,108}[a-zA-Z]@[a-zA-Z]{1,11}\.[a-zA-Z]+[.a-zA-Z]{0,3}$/;
// https://stackoverflow.com/questions/3617797/regex-to-match-only-letters
      // \p{L} - только Unicode буквы
export const email = /^\w[.\w]*\w@\w+\.\w+[.\w]*$/;
export const emailSymbols = /^\w[.\w]*\w@\w+\.\w+[.\w]*$/;

// Любые символы числом от 8 до 128
export const password = /^\S{8,128}$/;
export const passwordSymbols = /^\S*$/;

// Имена не короче 2-х букв.
export const firstName = /^[a-zA-Zа-яА-ЯЁё]{2,256}$/;
export const firstNameSymbols = /^[a-zA-Zа-яА-ЯЁё]*$/;

// Поддерживает двойные фамилии, апострофы, дефисы. от 2 до 256
export const lastName =
  /^[a-zA-Zа-яА-Я]{1,}'?-?[a-zA-Zа-яА-Я]{1,}(\s[a-zA-Zа-яА-Я]{1,256})?$/;
export const lastNameSymbols =
/^[a-zA-Zа-яА-Я]{1,}'?-?[a-zA-Zа-яА-Я]{1,}(\s[a-zA-Zа-яА-Я]+)?$/;

// Аналог [а-яёА-ЯЁ]
export const cirillic = /[\u0401\u0451\u0410-\u044f]*/;

export const regexp = {
  login,
  password,
  firstName,
  lastName,
  email,
  cirillic,
  latinOrCirillic: firstNameSymbols,
};

export const regexpValidation: {
  [key: string]: InputHTML5ValidationAttributesT;
} = {
  login: {
    pattern: login,
    errorMsg: 'Логин - это латинские буквы, цифры и ' +
      'нижнее подчеркивание (_). Длина логина - от 4 символов',
    validation: {
      minLength: 4,
      maxLength: 256,
      required: true,
    },
    conditions: [{
      condition: (value) => value.length < 4,
      msgOnTrue: 'Длина логина от 4-х символов',
    }, {
      condition: (value) => value.length >= 256,
      msgOnTrue: 'Длина логина меньше 256-ти символов',
    }, {
      condition: (value) => !loginSymbols.test(value),
      msgOnTrue: 'Используются только латинские буквы, цифры и нижнее подчеркивание (_)',
    }],
  },
  password: {
    pattern: password,
    errorMsg: 'Любая комбинация непробельных символов длиной более 8',
    validation: {
      minLength: 8,
      maxLength: 128,
      required: true,
    },
    conditions: [{
      condition: (value) => value.length < 8,
      msgOnTrue: 'Длина пароля от 8-х символов',
    }, {
      condition: (value) => value.length >= 128,
      msgOnTrue: 'Длина пароля меньше 128-ти символов',
    }, {
      condition: (value) => !passwordSymbols.test(value),
      msgOnTrue: 'Не используются пробельные символы',
    }],
  },
  firstName: {
    pattern: firstName,
    errorMsg: '',
    validation: {
      minLength: 2,
      maxLength: 256,
    },
    conditions: [{
      condition: (value) => value.length < 2,
      msgOnTrue: 'Длина имени от 2-х символов',
    }, {
      condition: (value) => value.length >= 256,
      msgOnTrue: 'Длина имени меньше 256-ти символов',
    }, {
      condition: (value) => !firstNameSymbols.test(value),
      msgOnTrue: 'Используются только латинские или кириллические буквы',
    }],
  },
  lastName: {
    pattern: lastName,
    errorMsg: '',
    validation: {
      minLength: 2,
      maxLength: 256,
    },
    conditions: [{
      condition: (value) => value.length < 2,
      msgOnTrue: 'Длина фамилии от 2-х символов',
    }, {
      condition: (value) => value.length >= 256,
      msgOnTrue: 'Длина фамилии меньше 256-ти символов',
    }, {
      condition: (value) => !regexp.latinOrCirillic.test(value.match(/\w/g)?.join('') || ''),
      msgOnTrue: 'Используются только латинские или кириллические буквы',
    }, {
      condition: (value) => !lastNameSymbols.test(value),
      msgOnTrue: 'Нестандартный вид фамилии',
    }],
  },
// export const email = /^[a-zA-Z][.a-zA-Z]{0,108}[a-zA-Z]@[a-zA-Z]{1,11}\.[a-zA-Z]+[.a-zA-Z]{0,3}$/;
  email: {
    pattern: email,
    errorMsg: '',
    validation: {
      minLength: 6,
      maxLength: 128,
    },
    conditions: [{
      condition: (value) => value.length < 6,
      msgOnTrue: 'Адрес от 6-х символов',
    }, {
      condition: (value) => value.length >= 128,
      msgOnTrue: 'Адрес меньше 128-ти символов',
    },
    {
      condition: (value) => value.split('@')[0].length < 2,
      msgOnTrue: 'Слишком короткая часть до @',
    }, {
      condition: (value) => value.split('@')[0].length >= 110,
      msgOnTrue: 'Слишком длинная часть до @',
    },
    // {
    //   condition: (value) => value.split('@')[1].split('.')[0].length < 1,
    //   msgOnTrue: 'Неправильный домен почты',
    // }, {
    //   condition: (value) => value.split('@')[1].split('.')[0].length > 11,
    //   msgOnTrue: 'Слишком длинный домен почты',
    // },
    {
      condition: (value) => {
        const [left, rigth] = value.split('@');
        if (!left || !rigth || value.split('@').length > 2) {
          console.log('!left', !left);
          console.log('!rigth', !rigth);
          console.log('value.split(\'@\').length > 2', value.split('@').length > 2);
          return true;
        }
        const lastDot = rigth.lastIndexOf('.');
        if (lastDot === -1) {
          console.log('lastDot === -1', lastDot === -1);
          return true;
        }
        const serverName = rigth.substring(0, lastDot);
        const domain =  rigth.substring(lastDot + 1);
        if (serverName.length < 1 || domain.length < 1) {
          console.log('serverName.length < 1', serverName.length < 1);
          console.log('domain.length < 1 < 1', domain.length < 1);
          return true;
        }
        return false;
      },
      msgOnTrue: 'Не соответствует формату: example@main.com',
    }, {
      condition: (value) => value.match(/[\w.@]/g)?.join('').length !== value.length,
      msgOnTrue: 'Должны использоваться только печатные символы, _, @ и .',
    },
    // {
    //   condition: (value) => !email.test(value),
    //   msgOnTrue: 'Нестандартная почта',
    // }
    ],
  },
};

export default regexpValidation;
