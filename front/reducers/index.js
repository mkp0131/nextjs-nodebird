import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import postReducer from './post';
import userReducer from './user';

// 리듀서
// State 를 순차적으로 실행한다.
const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
