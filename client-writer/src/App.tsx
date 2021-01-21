import React from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <PostList/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/logout" render={() => {
            localStorage.clear();
            return <Redirect to="/" />
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
