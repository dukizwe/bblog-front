export const ADD_CATEGORIES = "ADD_CATEGORIES"
export const SET_CATEGORY = "SET_CATEGORY"

const initial = {
          categories:  [],
          selected: null
}

export function categoryReducer(state = initial, action) {
          switch (action.type) {
                    case ADD_CATEGORIES:
                              return {...state, categories: action.payload}

                    case SET_CATEGORY:
                              return {...state, selected: action.payload}
                    default:
                              return state
          }
}