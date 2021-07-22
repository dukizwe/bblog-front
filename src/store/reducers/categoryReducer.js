export const ADD_CATEGORIES = "ADD_CATEGORIES"

export function categoryReducer(state = [], action) {
          switch (action.type) {
                    case ADD_CATEGORIES:
                              return action.payload
          
                    default:
                              return state
          }
}