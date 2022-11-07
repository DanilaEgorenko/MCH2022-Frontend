import {combineReducers, AnyAction} from 'redux';
import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import thunk, {ThunkAction} from 'redux-thunk';

import AuthReducer from './reducers/authReducer';
import {createLogger} from 'redux-logger';


// все что внизу и в hooks - напрвлено на роботу мидлварей и типизацию
// чтобы добавить редььюсер, испортируем его по образцу с AuthReducer
// и прописываем в __configureStore.reducer__ и __rootReducer__ в этом файле

// https://github.com/LogRocket/redux-logger#predicate--getstate-function-action-object--boolean
const loggingMiddleware = createLogger({
  predicate: (getState, action: PayloadAction) =>
    !(action.type === 'ws/tick' ||
      // action.type === 'ws/message' ||
      false
    ),
});

export const store = configureStore({
  reducer: {
    AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(loggingMiddleware, thunk),
});

export default store;

const rootReducer = combineReducers({AuthReducer});
export type RootStateT = ReturnType<typeof rootReducer>;
export type AppDispatchT = typeof store.dispatch;
export type AppStateGetterT = typeof store.getState;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateT,
  unknown,
  AnyAction
>
