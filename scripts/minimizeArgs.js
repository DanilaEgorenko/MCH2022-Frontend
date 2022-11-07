/* eslint-disable */

/**
 * Возвращает объект с аргументами командной строки и их значениями.
 * строки вида arg=true, arg='true' приведет к записи {ard: true} с типом boolean. То же для false
 * Если знака "=" нет, значением выставляется true
 * @return {object} ключ-имя аргумента, значение-правая часть после "=" или true / false
 */
function minimizeArgs() {
  args = {};
  process.argv.slice(2).forEach((arg, index) => {
    const eqIdx =  arg.indexOf('=');
    if (eqIdx === -1) {
      args[arg] = true;
      return;
    }

    let value = arg.slice(eqIdx + 1);
    
    if (value === 'true') {
      value = true;
    }
    if (value === 'false') {
      value = false;
    }
    
    args[arg.slice(0, eqIdx)] = value;
  });
  return args;
}

module.exports = minimizeArgs;
