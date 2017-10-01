import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course : Object.assign({}, this.props.course),
      errors : {}
    }
  }

  updateCourseState = (event) => {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course : course })
  };

  saveCourse = (event) => {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    this.context.router.push('/courses');
  };

  render() {
    return (
      <div>
        <h1>Manage Course</h1>
        <CourseForm
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
          course={this.state.course}
          allAuthors={this.props.authors}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors : PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id;
  let course = {
    id: "",
    title: "",
    watchHref: "",
    authorId: "",
    length: "",
    category: ""
  };

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      key : author.id,
      value : author.id,
      text: `${author.firstName} ${author.lastName}`
    }
  });

  return {
    course: course,
    authors : authorsFormattedForDropdown
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
