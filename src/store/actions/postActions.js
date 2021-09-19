import { APPEND_POSTS_ACTION, APPEND_TOP_POSTS_ACTION, ADD_POSTS_ACTION, PREPEND_POSTS_ACTION, SET_IN_DETAIL_POST } from '../reducers/postReducer'

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

export const appendTopPostsAction = (posts, category) => {
          const categoryKey = category ? category._id : 'all'
          const postsWithCategory = {
                    [categoryKey]: posts
          }
          return {
                    type: APPEND_TOP_POSTS_ACTION,
                    payload: postsWithCategory
          }
}

export const setInDetailPost = (post) => {
          return {
                    type: SET_IN_DETAIL_POST,
                    payload: post
          }
}