import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coursesAction from '../../actions/courseActions';

import CourseList from './CourseList';

class CoursesPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { courses } = this.props;
    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
}
CoursesPage.propTypes = {
  courses : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired,
  createCourse : PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    courses : state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(coursesAction, dispatch),
    createCourse : bindActionCreators(coursesAction.createCourse, dispatch)
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
