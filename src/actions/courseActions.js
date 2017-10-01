import * as types from './actionTypes';
import courseAPI from '../api/mock/mockCourseAPI';

const createCourse = (course) =>{
  return { type : types.CREATE_COURSE, course };
};

const loadCoursesSuccess = (courses) => {
  return {type : types.LOAD_COURSES_SUCCESS, courses }
};

const loadCourses = () => {
  return (dispatch) => {
    return courseAPI.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
};

export {
  createCourse,
  loadCourses,
  loadCoursesSuccess
};
