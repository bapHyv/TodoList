import React, { Component } from 'react';
import axios from 'axios';
import {dateRightFormat} from '../Modules/dateRelatedFunctions'

export default class AddATodos extends Component {
	constructor() {
		super();
		this.state = {
			todo: '',
			note: '',
			starts: '',
			ends: '',
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
		axios.post('/tasks', {
			task: this.state.todo,
			note: this.state.note,
			starts: dateRightFormat(),
			ends: dateRightFormat(this.state.ends)
		});
		this.setState({
			todo: '',
			note: '',
			starts: '',
			ends: ''
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
						<input type="number" name="ends" value={this.state.ends} onChange={this.handleChange} />
					</div>
				</div>
				<button onClick={this.handleClick}>Add a todo</button>
			</div>
		);
	}
}
