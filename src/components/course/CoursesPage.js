import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as coursesAction from '../../actions/courseActions';

class CoursesPage extends React.Component{
  constructor(props){
    super(props);
  }

  renderCourseRow = (course, index) => {
    return <div key={index}>{course.title}</div>
  };

  render(){
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.renderCourseRow)}
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
