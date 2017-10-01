import * as types from '../actions/actionTypes';
import initialState from './initialState';

const authorReducer = (state = initialState.authors, action) => {
  switch (action.type){
    case types.LOAD_AUTHOR_SUCCESS:
      return action.courses;
    default:
      return state;
  }
};

export default authorReducer;
