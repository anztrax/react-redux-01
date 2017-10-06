import * as types from './actionTypes';

const beginAjaxCall = () => {
  return {
    type : types.BEGIN_AJAX_CALL
  }
};

const ajaxCallError = (error) => {
  return {
    type : types.AJAX_CALL_ERROR,
    error
  }
};

export {
  beginAjaxCall,
  ajaxCallError
}
