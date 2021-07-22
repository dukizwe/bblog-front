import { createStore, combineReducers, applyMiddleware } from "redux";
import { postReducer } from "./reducers/postReducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import { appReducer } from "./reducers/appReducer";
import { categoryReducer } from "./reducers/categoryReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
          combineReducers({
                    app: appReducer,
                    post: postReducer,
                    user: userReducer,
                    category: categoryReducer
          }),
          composedEnhancer
)