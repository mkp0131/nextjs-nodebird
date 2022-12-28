import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

/*
 * all(): 배열로 받은 것들을 한번에 실행
 * take(): 실행될때까지 기다리겠다.
 * takeEvery(): take 를 while 로 감싸주는 효과
 * takeLatest(): 두번실행 방지(앞에 들어온 것 무시 / 마지막것만 실행된다. 즉 로딩중인 것을 취소하고 마지막 것을 실행) * 백엔드의 응답을 취소한다.(요청을 취소하는 것이 아니다. / 백엔드에 중복제거하는 로직 필요)
 * throttle(): 설정한 시간안에 한번만 실행
 * fork(): 함수를 실행 *비동기
 * call(): 함수를 실행 *동기(값이 return 될때까지 기다린다.)
 * put(): redux -> dispach
 * delay(): 딜레이 / 개발할때 사용
 */

export const DELAY_TIME = 1000;

// Saga를 하나로 합쳐준다.
export default function* rootSaga() {
  // all(): 배열로 받은 것들을 한번에 실행
  yield all([
    // fork(): 함수를 실행
    fork(postSaga),
    fork(userSaga),
  ]);
}
