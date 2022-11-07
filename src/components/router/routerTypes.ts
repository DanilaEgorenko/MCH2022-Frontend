import {FC} from 'react';


export type RouterMapNameT<N extends string = string> = N;

type RouterMapNameLinkMapT<N extends string = string, L extends string = string> = {
  // eslint-disable-next-line no-unused-vars
  [key in RouterMapNameT<N>]: L;
};

export type RouterMapT<
  M extends RouterMapNameLinkMapT = RouterMapNameLinkMapT,
  K extends keyof M = keyof M> = {
    [key in K]: {
      link: M[key];
      Component: FC;
      isAuthRequired: boolean;
    };
  };

export type RouterMapNoteT = RouterMapT<RouterMapNameLinkMapT>[RouterMapNameT];

export interface HistoryStateI {
  from: string,
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: unknown,
}
