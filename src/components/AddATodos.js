import React, { Component } from 'react';
import axios from 'axios';

export default class AddATodos extends Component {
	constructor() {
		super();
		this.state = {
			todo: '',
			note: '',
			beggining: '',
			deadline: '',
			timeleft: ''
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
		const now = new Date();
		const deadlineCalculated = new Date(now.getTime() + this.state.deadline * 24 * 60 * 60 * 1000)
		const diffTime = Math.abs(deadlineCalculated - now);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 
		axios.post('/tasks', {
			task: this.state.todo,
			note: this.state.note,
			beggining: now,
			deadline: deadlineCalculated,
			timeleft: diffDays
		});
		this.setState({
			todo: '',
			note: '',
			beggining: '',
			deadline: '',
			timeleft: ''
		})
	};
	render() {
		return (
			<div>
				<h1>Add a todo</h1>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>
						<label>todo</label>
						<input
							type="text"
							name="todo"
							value={this.state.todo}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label>note</label>
						<input type="text" name="note" value={this.state.note} onChange={this.handleChange} />
					</div>
					<div>
						<label>dead-line in days</label>
						<input type="number" name="deadline" value={this.state.deadline} onChange={this.handleChange} />
					</div>
				</div>
				<button onClick={this.handleClick}>Add a todo</button>
			</div>
		);
	}
}
