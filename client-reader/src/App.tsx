import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import Post from './components/Post';
import UserPage from './components/UserPage';


function App() {


  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <PostList/>
          </Route>
          <Route path="/posts/:id">
            <Post/>
          </Route>
          <Route path="/users/:id">
            <UserPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
