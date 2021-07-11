export const ADD_POSTS_ACTION = 'ADD_POSTS_ACTION'
export const APPEND_POSTS_ACTION = 'APPEND_POSTS_ACTION'
export const PREPEND_POSTS_ACTION = 'PREPEND_POSTS_ACTION'
export const ADD_TOP_POSTS_ACTION = 'ADD_TOP_POSTS_ACTION'

const initials = {
          posts: [],
          topPosts: [],
          resistException: false
}
export function postReducer(state = initials, action) {
          switch (action.type) {
                    case ADD_POSTS_ACTION:
                              return {...state, posts: action.payload}
                    case APPEND_POSTS_ACTION:
                              return {...state, posts: [...state.posts, ...action.payload]}
                    case PREPEND_POSTS_ACTION:
                              return {...state, posts: [action.payload, ...state.posts]}
                    case ADD_TOP_POSTS_ACTION:
                              return {...state, topPosts: [...state.topPosts, ...action.payload]}
                    default:
                              return state
          }
}