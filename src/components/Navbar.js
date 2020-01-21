import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from 'react-router-dom';
import MyTodosList from './MyTodosList';
import ManageMyTodos from './ManageMyTodos';
import TodosDone from './TodosDone';
import AddATodos from './AddATodos';

const Navbar = () => {
	return (
		<Router>
			<nav className="navbar">
				<NavLink
					className="navlink"
					exact
					to="/"
					activeStyle={{ textDecoration: 'underline' }}
				>
					{' '}
					My to do list{' '}
				</NavLink>
				<NavLink
					className="navlink"
					to="/addatodo"
					activeStyle={{ textDecoration: 'underline' }}
				>
					{' '}
					Add a todo{' '}
				</NavLink>
				<NavLink
					className="navlink"
					to="/managemytodos"
					activeStyle={{ textDecoration: 'underline' }}
				>
					{' '}
					Manage my todos{' '}
				</NavLink>
				<NavLink
					className="navlink"
					to="/todosdone"
					activeStyle={{ textDecoration: 'underline' }}
				>
					{' '}
					Todos done
				</NavLink>
			</nav>
			<Switch>
				<Route exact path="/" component={MyTodosList} />

				<Route exact path="/addatodo" component={AddATodos} />

				<Route exact path="/managemytodos" component={ManageMyTodos} />

				<Route exact path="/todosdone" component={TodosDone} />
			</Switch>
		</Router>
	);
};

export default Navbar;
