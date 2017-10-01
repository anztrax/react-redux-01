import authorAPI from '../api/mock/mockAuthorAPI';
import * as types from './actionTypes';

const loadAuthorSuccess = (courses) => {
  return {type : types.LOAD_AUTHOR_SUCCESS, courses };
};

const loadAuthors = () => {
  return (dispatch) => {
    return authorAPI.getAllAuthors().then(authors => {
      dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
};

export {
  loadAuthors,
  loadAuthorSuccess
};
