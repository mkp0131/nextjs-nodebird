import faker from 'faker';
import produce from 'immer';
import shortid from 'shortid';

const initialState = {
  mainPosts: [],
  // 이미지 업로드시 Path 저장
  imagePaths: [],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePost: true,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
};

// faker 의 seed 값 고정
// faker.seed(123);

// const generateDummyPost = (cnt = 10) => {
//   return Array(cnt)
//     .fill()
//     .map((_) => {
//       return {
//         id: shortid.generate(),
//         User: {
//           id: shortid.generate(),
//           nickname: faker.name.findName(),
//         },
//         content: faker.lorem.paragraph(),
//         Images: [{ src: faker.image.imageUrl() }],
//         Comments: [
//           {
//             id: shortid.generate(),
//             User: {
//               id: shortid.generate(),
//               nickname: faker.name.findName(),
//             },
//             content: faker.lorem.sentence(),
//           },
//         ],
//       };
//     });
// };

// initialState.mainPosts = initialState.mainPosts.concat(
//   generateDummyPost(10)
// );

// 더미 생성 코드
// const dummy_post = (data) => {
//   console.log('✅' + data);
//   return {
//     id: data.id,
//     User: {
//       id: 2,
//       nickname: 'ldk',
//     },
//     content: data.content,
//     Images: [],
//     Comments: [],
//   };
// };

// const dummy_comment = (data) => {
//   return {
//     id: data.id,
//     User: {
//       nickname: 'mkp',
//     },
//     content: data.content,
//   };
// };

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const loadPostAction = (data) => {
  return {
    type: LOAD_POST_REQUEST,
    data,
  };
};

export const addPostAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data,
  };
};

export const removePostAction = (data) => {
  return {
    type: REMOVE_POST_REQUEST,
    data,
  };
};

export const addCommentAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data,
  };
};

export const likePostAction = (data) => {
  return {
    type: LIKE_POST_REQUEST,
    data,
  };
};

export const unlikePostAction = (data) => {
  return {
    type: UNLIKE_POST_REQUEST,
    data,
  };
};

const postReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostError = null;
        draft.loadPostDone = false;
        draft.hasMorePost = false;
        break;

      case LOAD_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(
          action.data
        );
        draft.loadPostLoading = false;
        draft.loadPostError = null;
        draft.loadPostDone = true;
        draft.hasMorePost = false;
        // draft.hasMorePost = draft.mainPosts.length < 50;
        break;

      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        draft.hasMorePost = true;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;

      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostError = null;
        draft.addPostDone = true;
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostError = null;
        draft.removePostDone = false;
        break;

      case REMOVE_POST_SUCCESS:
        draft.mainPosts = state.mainPosts.filter(
          (post) => parseInt(action.data.PostId) !== post.id
        );
        draft.removePostLoading = false;
        draft.removePostError = null;
        draft.removePostDone = true;
        break;

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentError = null;
        draft.addCommentDone = false;
        break;

      case ADD_COMMENT_SUCCESS: {
        // ✅ immer 사용
        // 1. post 를 찾고
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );

        // 2. 찾은 post 에 Comment 를 업데이트
        post.Comments = post.Comments.concat(action.data);
        draft.addCommentLoading = false;
        draft.addCommentError = null;
        draft.addCommentDone = true;
        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostError = null;
        draft.likePostDone = false;
        break;

      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        post.Liker.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostError = null;
        draft.likePostDone = true;
        break;
      }

      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostError = null;
        draft.unlikePostDone = false;
        break;

      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(
          (post) => post.id === action.data.PostId
        );
        post.Liker = post.Liker.filter(
          (like) => like.id !== action.data.UserId
        );
        draft.unlikePostLoading = false;
        draft.unlikePostError = null;
        draft.unlikePostDone = true;
        break;
      }

      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      default:
        return state;
    }
  });
};

export default postReducer;
