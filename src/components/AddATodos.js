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
		const {todo, note, ends} = this.state
		return (
			<div>
				<h1>Add a todo</h1>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div>
						<label>todo</label>
						<input
							type="text"
							name="todo"
							value={todo}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label>note</label>
						<input type="text" name="note" value={note} onChange={this.handleChange} />
					</div>
					<div>
						<label>dead-line in days</label>
						<input type="number" name="ends" value={ends} onChange={this.handleChange} />
					</div>
				</div>
				<button onClick={this.handleClick}>Add a todo</button>
			</div>
		);
	}
}
