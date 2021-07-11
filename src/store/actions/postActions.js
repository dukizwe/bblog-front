import { APPEND_POSTS_ACTION, ADD_TOP_POSTS_ACTION, ADD_POSTS_ACTION, PREPEND_POSTS_ACTION } from '../reducers/postReducer'

export const appendPostsAction = (posts) => {
          return {
                    type: APPEND_POSTS_ACTION,
                    payload: posts
          }
}

export const prependPostsAction = (posts) => {
          return {
                    type: PREPEND_POSTS_ACTION,
                    payload: posts
          }
}

export const addPostsAction = (posts) => {
          return {
                    type: ADD_POSTS_ACTION,
                    payload: posts
          }
}

export const addTopPostsAction = (posts) => {
          return {
                    type: ADD_TOP_POSTS_ACTION,
                    payload: posts
          }
}