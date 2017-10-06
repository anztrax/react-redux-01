import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course : Object.assign({}, this.props.course),
      errors : {},
      isSaving : false
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      //Necessary to populate form when existing course is loaded directly
      this.setState({
        course : Object.assign({}, nextProps.course)
      });
    }
  };

  updateCourseState = (event) => {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course : course })
  };

  redirect = () => {
    this.setState({ isSaving : false });
    toastr.success('Course saved !');
    this.context.router.push('/courses');
  };

  saveCourse = (event) => {
    event.preventDefault();
    this.setState({ isSaving : true });
    this.props.actions.saveCourse(this.state.course).then(() => {
      this.redirect();
    }).catch(error => {
      toastr.error(error);
      this.setState({ isSaving : false });
    });
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
          isSaving={this.state.isSaving}
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

const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id === id);
  if(course) return courses[0];
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id;
  let course = { id: "", title: "", watchHref: "", authorId: "", length: "", category: "" };

  //need to validate if courses is already loaded (because there's a latency in server around 1000ms (mock data))
  if(courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

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
