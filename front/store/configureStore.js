import { createWrapper } from 'next-redux-wrapper';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '../sagas';

// redux 로그를 남기는 커스텀 미들웨어
const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(`💄 Redux: ${JSON.stringify(action)}`);
    return next(action);
  };

const configureStore = () => {
  //  redux-saga 미들웨어
  const sageMiddleware = createSagaMiddleware();
  // 미들웨어 설정
  const middleware = [sageMiddleware, loggerMiddleware];
  // 개발모드(프로덕트 모드가 아닐시) devTool 실행
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(rootReducer, enhancer);
  // redux-saga 설정
  store.sagaTask = sageMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
