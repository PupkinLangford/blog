import React from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import Login from './components/Login';
import Post from './components/Post';
import UserPage from './components/UserPage';
import CommentPage from './components/CommentPage';
import PostForm from './components/PostForm';


function App() {

  const [user, setUser] = useState<string | null>(localStorage.getItem('username'));
  const [user_id, setUserId] = useState<string | null>(localStorage.getItem('userid'));
  const history = useHistory();

  const handleUser = (user: string, user_id: string) => {
    setUser(user);
    setUserId(user_id);
  }

  useEffect(() => {
    if(user === null) {
      //localStorage.removeItem('username');
      //if(!localStorage.getItem('token')) history.push("/login");
    } else {
      localStorage.setItem('username', user as string);
      localStorage.setItem('userid', user_id as string);
    }
  }, [history, user, user_id]);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} user_id={user_id} />
        <Switch>
          <Route exact path="/">
            <PostList/>
          </Route>
          <Route path="/posts/:id/comments/:comment_id">
            <CommentPage/>
          </Route>
          <Route path="/posts/:id/edit">
            <PostForm method="PUT"/>
          </Route>
          <Route exact path="/posts/new">
            <PostForm method="POST"/>
          </Route>
          <Route path="/posts/:id">
            <Post/>
          </Route>
          <Route path="/users/:id">
            <UserPage/>
          </Route>
          <Route exact path="/login">
            <Login handleUser={handleUser}/>
          </Route>
          <Route exact path="/logout" render={() => {
            localStorage.clear();
            setUser(null);
            return <Redirect to="/" />
          }}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
