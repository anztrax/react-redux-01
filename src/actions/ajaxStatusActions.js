import * as types from './actionTypes';

const beginAjaxCall = () => {
  return {
    type : types.BEGIN_AJAX_CALL
  }
};

export {
  beginAjaxCall
}
