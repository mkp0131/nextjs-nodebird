# nextJS 세팅 12버전

## [nextJS] 설치

```
// JS 버전 설치
npm i next@12
// TS 버전 설치
npm i next@12 --typescript
```

## [nextJS] 페이지 라우트

- `/pages` 폴더를 생성
- 원하는 라우트의 파일을 생성한다. 예) `index.js`, `404.js`
- 폴더를 생성하면 이중으로 라이트를 설정 할 수 있다.
- `[name].js` 동적으로 라우트 생성시 사용한다.

## [react] props 체크 prop-types 패키지 사용법

- https://www.npmjs.com/package/prop-types

### 설치

```sh
npm i prop-types
```

### 기본사용법

- 일반사용

```js
import PropTypes from 'prop-types';

const AppLayout = ({ child }) => {
  return (
    <div>
      <div>공통메뉴</div>
      {child}
    </div>
  );
};

AppLayout.propTypes = {
  // React Node (필수 항목)
  child: PropTypes.node.isRequired,
};

export default AppLayout;
```

- 복잡한 타입 정의(JSON 형식)

```js
FollowingList.propTypes = {
  header: PropTypes.string.isRequired,
  // JSON 형식
  data: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    })
  ).isRequired,
};
```

```js
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    // JSON 형식(세부적인 타입지정 X)
    Comment: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
```

### [react] prop-types 2개 이상의 타입지정

```js
 id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
```

## [antd] Grid 정리

### 중요 브릭 포인트

- `xs`: 모바일
- `sm`: 태블릿
- `md`: 작은 태블릿

### 기본사용

- 프릭 포인트를 이용한다.

```jsx
<Row>
  <Col xs={24} sm={4}>
    <div style={{ background: 'red' }}>1</div>
  </Col>
  <Col xs={24} sm={16}>
    <div style={{ background: 'blue' }}>{children}</div>
  </Col>
  <Col xs={24} sm={4}>
    <div style={{ background: 'green' }}>2</div>
  </Col>
</Row>
```

- ✅ 여백이 없다.
- `Row` 에 `gutter` 를 활용하여 여백을 준다. (`Row` 의 자식 `Col` 에 `padding` 이 들어간다.)

```jsx
<Row gutter={10}>
  <Col xs={24} sm={4}>
    <div style={{ background: 'red' }}>1</div>
  </Col>
  <Col xs={24} sm={16}>
    <div style={{ background: 'blue' }}>{children}</div>
  </Col>
  <Col xs={24} sm={4}>
    <div style={{ background: 'green' }}>2</div>
  </Col>
</Row>
```

### flex 사용

```jsx
<Row gutter={10}>
  <Col flex="200px">
    <div style={{ background: 'red' }}>1</div>
  </Col>
  <Col flex="auto">
    <div style={{ background: 'blue' }}>{children}</div>
  </Col>
  <Col flex="200px">
    <div style={{ background: 'green' }}>2</div>
  </Col>
</Row>
```

## [nextjs] Prop `className` did not match 에러

- `npm i -D babel-plugin-styled-components` 설치
- `.babelrc` 파일 생성

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true, // SSR을 위한 설정
        "displayName": true, // 클래스명에 컴포넌트 이름을 붙임
        "pure": true // dead code elimination (사용되지 않는 속성 제거)
      }
    ]
  ]
}
```

## [antd] styled-components 로 antd 컴포넌트 아래의 클래스 수정하기

```jsx
const ListItemMeta = styled(List.Item.Meta)`
  .ant-list-item-meta-title {
    margin-top: 5px;
  }
`;
```

## [antd] input custom error 에러

- https://e2e2e2.tistory.com/21

## [nextjs] react query 사용

- https://kir93.tistory.com/entry/NextJS%EC%97%90%EC%84%9C-react-query-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

## [antd] form input rest 값(텍스트) 비우기

- `<Form>` 컴포넌트에 `form` 속성을 부여한다.

```js
// form 에 부여할 form 속성
const [form] = Form.useForm();

return (
  <Form form={form} layout="vertical" onFinish={onFinish}>
    <Form.Item
```

- `form.resetFields()` 를 사용한다.

```js
const onFinish = useCallback((values) => {
  console.log('PostForm', values);
  dispatch(addPostAction());
  // 폼을 리셋한다.
  form.resetFields();
}, []);
```

### 참고사이트

- https://velog.io/@storyno7/5%EC%A3%BC%EC%B0%A8-reactAnt-design%EC%9C%BC%EB%A1%9C-form-%EB%A7%8C%EB%93%A4%EA%B8%B0

## [redux] nextjs redux-saga 기본 사용법

### 시나리오

#### 리덕스 dispatch -> 리덕스 미들웨어로 saga가 실행 -> saga에서 정의한 액션이 들어왔다면 정의해 놓은 파이프라인 실행

- 파이프라인: 리덕스를 모아놓은 파이프라인.
- saga에서 정의한 액션과 redux 에서 정의한 액션이 동시에 실행된다.

### 설치

```sh
npm i redux-saga
```

### `store/configureStore.js` 에 redux-saga 설정 추가

1. redux-saga 미들웨어 추가
2. store.sagaTask 설정

```js
const configureStore = () => {
  // ✅ 1. redux-saga 미들웨어
  const sageMiddleware = createSagaMiddleware();
  // 미들웨어 설정 ✅ 미들웨어에 사가 미들웨어 추가
  const middleware = [sageMiddleware, loggerMiddleware];
  // 개발모드(프로덕트 모드가 아닐시) devTool 실행
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middleware))
      : composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(rootReducer, enhancer);
  // ✅ 2. redux-saga 설정
  store.sagaTask = sageMiddleware.run(rootSaga);
  return store;
};
```

### Sagas 폴더 생성

- `sagas/index.js` 생성

```js
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

const DELAY_TIME = 1000;

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
      type: 'LOGIN_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOGIN_FAILURE ',
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
      type: 'LOGOUT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOGOUT_FAILURE ',
      data: error.response.data,
    });
  }
}

function addPostApi() {
  return axios.post('/api/post');
}

function* addPost() {
  try {
    yield delay(DELAY_TIME);
    // const result = yield call(addPostApi);
    yield put({
      type: 'ADDPOST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADDPOST_FAILURE ',
      data: error.response.data,
    });
  }
}

// 'LOGIN' 액션이 들어온다면 login 을 실행한다.
function* watchLogin() {
  yield takeLatest('LOGIN_REQUEST', login);
}
function* watchLogout() {
  yield takeLatest('LOGOUT_REQUEST', logout);
}
function* watchAddPost() {
  yield takeLatest('ADD_POST', addPost);
}

export default function* rootSaga() {
  // all(): 배열로 받은 것들을 한번에 실행
  yield all([
    // fork(): 함수를 실행
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAddPost),
  ]);
}
```

### Sagas 나누기!

- `sagas/post.js`, `sagas/user.js` 처럼 파일을 나누어준다.

```js
function addPostApi() {
  return axios.post('/api/post');
}

function* addPost() {
  try {
    yield delay(DELAY_TIME);
    // const result = yield call(addPostApi);
    yield put({
      type: 'ADDPOST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'ADDPOST_FAILURE ',
      data: error.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST', addPost);
}

export default function* postSaga() {
  // all(): 배열로 받은 것들을 한번에 실행
  yield all([
    // fork(): 함수를 실행
    fork(watchAddPost),
  ]);
}
```

- `sagas/index.js` 에서 하나로 합쳐준다.

```js
import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

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
```

## ⛔️실패! [eslint] 추가 설정

- 설치

```sh
npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

## [javascript] shortid 간단하게 uid 를 생성

- shortid 를 사용하면 `23TplPdS` 같은 id 를 생성
- https://www.npmjs.com/package/shortid
- `npm i shortid`
- `shortid.generate()`

## [redux] 불변성 유지 값 업데이트 npm i immer

### 순수 js

```js
case ADD_COMMENT_SUCCESS:
  // ✅ 불변성 유지
  // 핵심: 변경되는 값만 새로운 값으로, 나머지는 참조를 유지
  // 1. postIndex 얻기
  const postIndex = state.mainPosts.findIndex(
    (post) => post.id === action.data.postId
  );
  // 2. 해당 post 뽑아내기(얕은 복사)
  const post = state.mainPosts[postIndex];
  // 해당 포스트의 Comments 업데이트
  post.Comments = [
    dummy_comment(action.data.content),
    ...post.Comments,
  ];
  // 3. posts 를 얕은 복사
  const posts = [...state.mainPosts];
  // 4. posts[postIndex] 로 뽑아낸 post로 변경
  posts[postIndex] = post;
  // 5. 얕은복사한 posts 를 redux 에 넣어주기
  return {
    ...state,
    mainPosts: posts,
    addCommentLoading: false,
    addCommentError: null,
    addCommentDone: true,
  };
```

### immer 라이브러리 사용

#### 설치

- https://www.npmjs.com/package/immer
- react hook 의 경우에는 `use-immer` 를 사용한다.
- https://www.npmjs.com/package/use-immer

```sh
npm i immer
```

#### 기본 사용

- 기본 모양

```js
import produce from 'immer';

// state: 변화시킬 객체를 넣어준다.
// 두번째 인자로 함수를 넣어서 state 를 수정
return produce(state, (draft) => {
  // draft 로 state 에 접근
});
```

- immer 적용 사용 (위의 예제하고 동일한 코드)

```js
  return produce(state, (draft) => {
      case ADD_COMMENT_SUCCESS:
        // ✅ immer 사용
        // 1. post 를 찾고
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.postId
        );
        // 2. 찾은 post 에 Comment 를 업데이트
        post.Comments.unshift(
          dummy_comment(action.data.content)
        );
  })
```

## [javascript] faker 유저 더미데이터 만들기

- 꼭 5버전을 설치한다. (이후 버전은 개발자가 망쳤음)
- https://www.npmjs.com/package/faker/v/5.5.3

```
npm i faker@5
```

- 기본사용

```js
// faker 의 seed 값 고정
faker.seed(123);
initialState.mainPosts = initialState.mainPosts.concat(
  Array(100)
    .fill()
    .map((_) => {
      return {
        id: shortid.generate(),
        User: {
          id: shortid.generate(),
          nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Images: [{ src: faker.image.imageUrl() }],
        Comments: [
          {
            id: shortid.generate(),
            User: {
              id: shortid.generate(),
              nickname: faker.name.findName(),
            },
            content: faker.lorem.sentence(),
          },
        ],
      };
    })
);
```

## [nextjs] 권한이 없는 유저 페이지에서 리다이렉트

```js
// ✅ Router import 에 주의한다. {Router} X
import Router from 'next/router';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  // 권한없을시 페이지 막기 START
  useEffect(() => {
    if (!(user && user.id)) {
      Router.push('/');
    }
  }, [user, user?.id]);
  if (!user) {
    return null;
  }
  // 권한없을시 페이지 막기 END
```

## [react] 무한스크롤 수동 구현

```js
useEffect(() => {
  const onScroll = () => {
    /*
     * window.scrollY, // 스크롤된 양
     * document.documentElement.clientHeight, // 유저가 보는 문서의 높이
     * document.documentElement.scrollHeight // 전체 문서 높이
     */
    if (
      hasMorePost &&
      window.scrollY +
        document.documentElement.clientHeight +
        300 >
        document.documentElement.scrollHeight
    ) {
      console.log('✅ 인피니티 스크롤');
      dispatch(loadPostAction(5));
    }
  };
  window.addEventListener('scroll', onScroll);
  // 컴포넌트 언마운트시 이벤트 제거
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}, [hasMorePost]);
```
