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
					exact
					to="/"
					activeStyle={{ textDecoration: 'underline' }}
					style={{ color: 'black', textDecoration: 'none' }}
				>
					{' '}
					My to do list{' '}
				</NavLink>
				<NavLink
					to="/addatodo"
					activeStyle={{ textDecoration: 'underline' }}
					style={{ color: 'black', textDecoration: 'none' }}
				>
					{' '}
					Add a todo{' '}
				</NavLink>
				<NavLink
					to="/managemytodos"
					activeStyle={{ textDecoration: 'underline' }}
					style={{ color: 'black', textDecoration: 'none' }}
				>
					{' '}
					Manage my todos{' '}
				</NavLink>
				<NavLink
					to="/todosdone"
					activeStyle={{ textDecoration: 'underline' }}
					style={{ color: 'black', textDecoration: 'none' }}
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
