import { ADD_CATEGORIES } from "../reducers/categoryReducer"

export const addCategoriesAction = (categories) => {
          return {
                    type: ADD_CATEGORIES,
                    payload: categories
          }
}