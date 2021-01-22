import React from 'react';
import {BrowserRouter as Router, Switch, Route, useHistory, Redirect} from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import Login from './components/Login';


function App() {

  const [user, setUser] = useState<string | null>(localStorage.getItem('username'));

  const handleUser = (user: string) => setUser(user);
  useEffect(() => {
    if(user == null) {
      localStorage.removeItem('username');
    } else {
      localStorage.setItem('username', user as string);
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} />
        <Switch>
          <Route exact path="/">
            <PostList/>
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
