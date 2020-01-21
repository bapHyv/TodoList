import React, { Component } from 'react';
import axios from 'axios'

export default class AddATodos extends Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '',
			task: ''
		};
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	componentDidMount() {
		axios.get('/tasks').then(data => console.log(data));
	}

	handleClick = () => {
		const firstDate = new Date();
		axios.post('/tasks', {
			task: this.state.task,
			date: firstDate,
			'dead-line': new Date(firstDate.getTime() + 7 * 24 * 60 * 60 * 1000)
		});
	};
	render() {
		return (
			<div>
				<h1>To do list</h1>
				<input
					type="text"
					name="task"
					value={this.state.task}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}>new task</button>
			</div>
		);
	}
}
