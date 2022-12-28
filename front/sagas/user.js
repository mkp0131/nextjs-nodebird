import axios from 'axios';
import {
  all,
  fork,
  take,
  call,
  put,
  takeEvery,
  takeLatest,
  delay,
} from 'redux-saga/effects';
import { DELAY_TIME } from '.';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loginApi(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    yield delay(DELAY_TIME);
    // action 에 data 가 전달된다.
    // call() 의 두번째 인자로 첫번째 인자 함수에 인자로 줄 수있다.
    // const result = yield call(loginApi, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      data: error.response.data,
    });
  }
}

function logoutApi() {
  return axios.post('/api/logout');
}

function* logout() {
  try {
    yield delay(DELAY_TIME);
    // const result = yield call(logoutApi);
    yield put({
      type: LOGOUT_SUCCESS,
      // data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      data: error.response.data,
    });
  }
}

function* signup() {
  try {
    yield delay(DELAY_TIME);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      data: error.response.data,
    });
  }
}

function* followUser(action) {
  try {
    yield delay(DELAY_TIME);

    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}

function* unFollowUser(action) {
  try {
    yield delay(DELAY_TIME);

    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}

// 'LOGIN' 액션이 들어온다면 login 을 실행한다.
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}
function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

function* watchFollowUser() {
  yield takeLatest(FOLLOW_REQUEST, followUser);
}

function* watchUnFollowUser() {
  yield takeLatest(UNFOLLOW_REQUEST, unFollowUser);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollowUser),
    fork(watchUnFollowUser),
  ]);
}
