import React, { PropTypes } from 'react';

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
    alert(`Saving ${this.state.course.title}`);
  };

  onTitleChange = (event) => {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({
      course : course
    });
  };

  render(){
    return (
      <div>
        <h1>Courses</h1>
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

export default CoursesPage;
