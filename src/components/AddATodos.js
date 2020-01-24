import React, { Component } from 'react';
import axios from 'axios';
import { dateRightFormat } from '../Modules/dateRelatedFunctions';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export default class AddATodos extends Component {
	constructor() {
		super();
		this.state = {
			todo: '',
			note: '',
			starts: '',
			ends: ''
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
		});
	};
	render() {
		const { todo, note, ends } = this.state;
		return (
			<div>
				<h1>Add a todo</h1>
				<Form>
					<FormGroup>
						<label>Todo</label>
						<Input
							placeholder="add a todo..."
							type="text"
							name="todo"
							value={todo}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Note</label>
						<Input
							placeholder="add a note..."
							type="textarea"
							name="note"
							value={note}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup>
						<label>Deadline</label>
						<Input
							type="number"
							name="ends"
							value={ends}
							onChange={this.handleChange}
						/>
					</FormGroup>
				</Form>
				<Button color="success" onClick={this.handleClick}>
					Add a todo
				</Button>
			</div>
		);
	}
}
