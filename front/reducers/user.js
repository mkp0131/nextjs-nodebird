import produce from 'immer';

const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggingOut: false, // 로그아웃 시도중
  isLoggedIn: false,
  loginError: null,
  logoutError: null,
  signupLoading: false, // 회원가입 시도중
  signupDone: false, // 회원가입 완료
  signupError: null, // 회원가입시 에러 났을시 에러 메시지
  followLoading: false,
  followDone: false,
  followError: false,
  unFollowLoading: false,
  unFollowDone: false,
  unFollowError: false,
  user: null,
  signUpData: {},
  loginData: {},
};

// 타입 상수 지정
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummy_user = (data) => {
  return {
    ...data,
    nickname: '디아블로',
    id: 2,
    Posts: [],
    Followings: [],
    Followers: [],
  };
};

// 액션 크리에이터
export const loginRequestAction = (data) => {
  return {
    type: LOGIN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

export const signupRequestAction = () => {
  return {
    type: SIGNUP_REQUEST,
  };
};

export const followRequestAction = (data) => {
  return {
    type: FOLLOW_REQUEST,
    data: data,
  };
};

export const unfollowRequestAction = (data) => {
  return {
    type: UNFOLLOW_REQUEST,
    data: data,
  };
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.isLoggingIn = true;
        draft.isLoggedIn = false;
        draft.loginError = null;
        draft.user = action.data;
        break;

      case LOGIN_SUCCESS:
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.loginError = null;
        draft.user = dummy_user(action.data);
        break;

      case LOGIN_FAILURE:
        draft.isLoggingIn = false;
        draft.isLoggedIn = true;
        draft.loginError = action.error;
        break;

      case LOGOUT_REQUEST:
        draft.isLoggingOut = true;
        draft.logoutError = null;
        break;

      case LOGOUT_SUCCESS:
        draft.isLoggingOut = false;
        draft.logoutError = null;
        draft.isLoggedIn = false;
        draft.user = null;
        break;

      case LOGOUT_FAILURE:
        draft.isLoggingOut = false;
        draft.logoutError = action.error;
        break;

      case SIGNUP_REQUEST:
        draft.signupLoading = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;

      case SIGNUP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        draft.signupError = null;
        break;

      case SIGNUP_FAILURE:
        draft.signupLoading = false;
        draft.signupDone = false;
        draft.signupError = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.user.Posts.unShift({ id: action.data });
        break;

      case REMOVE_POST_OF_ME:
        draft.user.Posts = state.user.Posts.filter(
          (post) => post.id !== action.data
        );
        break;

      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;

      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.followError = null;
        draft.user.Followings.push(action.data);
        break;

      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followDone = false;
        draft.followError = action.error;
        break;

      case UNFOLLOW_REQUEST:
        draft.unFollowLoading = true;
        draft.unFollowDone = false;
        draft.unFollowError = null;
        break;

      case UNFOLLOW_SUCCESS:
        draft.unFollowLoading = false;
        draft.unFollowDone = true;
        draft.unFollowError = null;
        draft.user.Followings =
          draft.user.Followings.filter(
            (follow) => follow.id !== action.data.id
          );
        break;

      case UNFOLLOW_FAILURE:
        draft.unFollowLoading = false;
        draft.unFollowDone = false;
        draft.unFollowError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default userReducer;
