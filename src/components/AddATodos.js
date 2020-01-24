import React, { Component } from 'react';
import axios from 'axios';
import { dateRightFormat, daysLeftCalculator } from '../Modules/dateRelatedFunctions';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class AddATodos extends Component {
	constructor() {
		super();
		this.state = {
			todo: '',
			note: '',
			starts: '',
			ends: new Date()
		};
	}

	handleChangeDatePicker = date => {
		this.setState({
			ends: date
		});
		console.log(this.state.ends);
	};

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
			ends: dateRightFormat(daysLeftCalculator(this.state.ends))
		});
		this.setState({
			todo: '',
			note: '',
			starts: '',
			ends: new Date()
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
						<br/>
						<DatePicker
							selected={this.state.ends}
							onChange={this.handleChangeDatePicker}
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
