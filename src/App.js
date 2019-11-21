import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Home from './views/Home'
import Book from './views/Book'
import Phone from './views/Phone'
import Flower from './views/Flower'
import Eat from './views/Eat'
import Dress from './views/Dress'
import Jewelry from './views/Jewelry'
import Detail from './views/Detail'
import Login from './views/Login'
import Search from './views/Search'
import LoginSuccess from './views/LoginSuccess'
import Register from './views/Register'

function App() {
  return (
    <div>
	  <Router>
		<div>
			<Switch>
			<Route path="/home" component={Home}></Route>
			<Route path="/book" component={Book}></Route>
			<Route path="/phone" component={Phone}></Route>
			<Route path="/flower" component={Flower}></Route>
			<Route path="/dress" component={Dress}></Route>
			<Route path="/eat" component={Eat}></Route>
			<Route path="/jewelry" component={Jewelry}></Route>
			<Route path="/detail/:id" component={Detail}></Route>
			<Route path="/detail" component={Detail}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/search" component={Search}></Route>
			<Route path="/loginsuccess" component={LoginSuccess}></Route>
			<Route path="/register" component={Register}></Route>
			{/*<Redirect from='/*' to="/home"/>*/}
			</Switch>

		</div>
	  </Router>
    </div>
  );
}

export default App;
