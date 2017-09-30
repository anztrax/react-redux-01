import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component{
  render(){
    return (
      <div className="jumbotron">
        <h1>Hello Home page</h1>
        <p>Learn Redux, React, React Router and many more !!</p>
        <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
      </div>
    );
  }
}

export default HomePage;
