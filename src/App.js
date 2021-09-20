import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Download from './components/Download';
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Upload from './components/Upload';


// components import


function App() {
  return (
    <Router>
    <div className="App">
      
       <Switch>
         
             <Route exact path='/'>
               <Home />
             </Route>
             <Route path='/download'>
               <Download />
             </Route>

             <Route path='/profile'>
               <Profile />
             </Route>

             <Route path='/posts'>
               <Post />
             </Route>

             <Route path='/login'>
               <Login />
             </Route>

             <Route path='/signin'>
               <Signin />
             </Route>

             <Route path='/upload'>
               <Upload />
             </Route>
            </Switch>
       </div>
    </Router>
  );
}

export default App;
