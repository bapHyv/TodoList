import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink
} from 'react-router-dom';
import MyTodos from './manageMyTodos/MyTodos';
import TodosDone from './TodosDone';
import { Nav, NavItem } from 'reactstrap';

const Navbar = props => {
	return (
		<Router>
			<Nav className="navbar" style={{marginBottom: '10px', fontSize: '25px'}} >
				<NavItem>
					<NavLink
						className="navlink"
						exact
						to="/"
						activeStyle={{ textDecoration: 'underline' }}
						
					>
						My todos
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink
						className="navlink"
						to="/todosdone"
						activeStyle={{ textDecoration: 'underline' }}
					>
						Todos done
					</NavLink>
				</NavItem>
			</Nav>
			<Switch>
				<Route exact path="/" component={MyTodos} />

				<Route exact path="/todosdone" component={TodosDone} />
			</Switch>
		</Router>
	);
};

export default Navbar;
