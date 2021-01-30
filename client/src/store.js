import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { usersReducer } from './reducers/usersReducer';
import { categoriesReducer } from './reducers/categoriesReducer';
import { solutionsReducer } from './reducers/solutionsReducer';
import { asyncReducer } from './reducers/asyncReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  users: usersReducer,
  categories: categoriesReducer,
  solutions: solutionsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  auth: { user: userInfoFromStorage },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
