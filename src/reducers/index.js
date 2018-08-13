import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form' // name "reducer" is too generic.
import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
