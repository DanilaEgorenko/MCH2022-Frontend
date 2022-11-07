/* eslint-disable */

const minimizeArgs = require('./minimizeArgs.js');

// https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
const isWin = process.platform.startsWith('win');

function envGetter(variable) {
  return isWin ? '%' + variable + '%' : '$' + variable;
}

for (const [arg, value] of Object.entries(minimizeArgs())) {
  process.env[arg] = value;
}

// test
// for (const arg in minimizeArgs()) {
//   stdErrorExec('echo ' + arg + ' is: ' + envGetter(arg));
// }
