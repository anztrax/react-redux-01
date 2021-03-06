import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import SandBoxPage from './components/sandbox/SandBoxPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="courses" components={CoursesPage} />
    <Route path="course/:id" components={ManageCoursePage} />
    <Route path="sandbox" components={SandBoxPage} />
  </Route>
);
