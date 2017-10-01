import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as coursesAction from '../../actions/courseActions';

class CoursesPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      course : {
        title : null
      }
    }
  }

  onClickSave = () => {
    this.props.createCourse(this.state.course);
  };

  onTitleChange = (event) => {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({
      course : course
    });
  };

  renderCourseRow = (course, index) => {
    return <div key={index}>{course.title}</div>
  };

  render(){
    return (
      <div>
        <h1>Courses</h1>
        {
          this.props.courses.map(this.renderCourseRow)
        }
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}
        />
        <input
          type="button"
          value="save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}
CoursesPage.propTypes = {
  courses : PropTypes.array.isRequired,
  createCourse : PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    courses : state.courses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourse : course => dispatch(coursesAction.createCourse(course))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
