import { ADD_CATEGORIES, SET_CATEGORY } from "../reducers/categoryReducer"

export const addCategoriesAction = (categories) => {
          return {
                    type: ADD_CATEGORIES,
                    payload: categories
          }
}

export const setCategory = (category) => {
          return {
                    type: SET_CATEGORY,
                    payload: category
          }
}