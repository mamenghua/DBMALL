import React from 'react';
import {BrowserRouter as Router,Route,NavLink,Redirect} from 'react-router-dom';
import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'

function App() {
  return (
    <div>
	  <Router>
		<div>
			<Redirect to="/home"/>
			<Route path="/home" component={Home}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/register" component={Register}></Route>
			
		</div>
	  </Router>
	  
    </div>
  );
}

export default App;
