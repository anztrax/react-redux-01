import * as types from './actionTypes';
import courseAPI from '../api/mock/mockCourseAPI';
import { beginAjaxCall } from './ajaxStatusActions';

const createCourse = (course) =>{
  return { type : types.CREATE_COURSE, course };
};

const loadCoursesSuccess = (courses) => {
  return {type : types.LOAD_COURSES_SUCCESS, courses }
};

const updateCourseSuccess = (course) => {
  return { type : types.UPDATE_COURSES_SUCCESS, course }
};

const createCourseSuccess = (course) => {
  return { type : types.CREATE_COURSES_SUCCESS, course }
};

const loadCourses = () => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseAPI.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
};

const saveCourse = (course) => {
  //getState() for getting redux state somewhere
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return courseAPI.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse))
    }).catch(error => {
      throw(error);
    });
  };
};

export {
  createCourse,
  loadCourses,
  saveCourse,
  loadCoursesSuccess
};
