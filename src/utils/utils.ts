import {Temporal} from '@js-temporal/polyfill';

export function timeISORus() {
  return Temporal.Now.plainTimeISO().toLocaleString();
}

export function delay(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const wrapData = (data: any, msg: string, status: number) => ({
  msg, status, data,
});

export function mockNet(data: any, fail: boolean = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const answer = !fail? wrapData(data, 'success (mock)', 200) : wrapData({}, 'error (mock)', 400);
      console.log('mock resolved', answer);
      return !fail ? resolve({status: 200, response: answer}) : reject({status: 400, response: answer})}, 500);
  });
}
