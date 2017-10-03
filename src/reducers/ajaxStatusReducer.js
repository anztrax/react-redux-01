import * as types from '../actions/actionTypes';
import initialState from './initialState';

const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) === '_SUCCESS';
};

const ajaxStatusReducer = (state = initialState.ajaxCallInProgress, action) => {
  if(action.type === types.BEGIN_AJAX_CALL){
    return state + 1;
  }else if(actionTypeEndsInSuccess(action.type)){
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;