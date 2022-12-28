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
import shortid from 'shortid';
import { DELAY_TIME } from '.';
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '../reducers/post';
import {
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
} from '../reducers/user';

function* loadPost(action) {
  try {
    yield delay(DELAY_TIME);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function addPostApi() {
  return axios.post('/api/post');
}

function* addPost(action) {
  try {
    yield delay(DELAY_TIME);

    // const result = yield call(addPostApi);

    const id = shortid.generate();

    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data,
      data: { id, content: action.data },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(DELAY_TIME);

    // const result = yield call(addPostApi);
    yield put({
      type: REMOVE_POST_SUCCESS,
      // data: result.data,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: error.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(DELAY_TIME);

    const id = shortid.generate();

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: { id, ...action.data },
    });
  } catch (error) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: error.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  // all(): 배열로 받은 것들을 한번에 실행
  yield all([
    // fork(): 함수를 실행
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
