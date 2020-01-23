import React, { Component } from 'react';
import axios from 'axios';
import TodosItem from './TodosItem';
import {
	dateRightFormat,
	daysLeftCalculator
} from '../../Modules/dateRelatedFunctions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ManageMyTodos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			modal: false,
			todoModified: '',
			noteModified: '',
			deadlineModified: ''
		};
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleClickCancel = () => {
		this.toggle();
		this.setState({
			todoModified: '',
			noteModified: '',
			deadlineModified: ''
		});
	};

	handleClickDelete = async todo => {
		console.log(todo.id);
		let doneArrayLength;
		await axios.get('/done/').then(data => {
			doneArrayLength = data.data.length;
		});
		await axios.post('/done/', {
			id: doneArrayLength + 1,
			task: todo.task,
			note: todo.note,
			started: todo.starts,
			ended: dateRightFormat()
		});
		await axios.delete(`/tasks/${todo.id}`);
		await axios.get('/tasks').then(data => {
			this.setState({ data: data.data });
		});
	};

	handleConfirm = async todo => {
		console.log(todo.id);
		let endChecked;
		let todoChecked;
		let noteChecked;
		if (this.state.deadlineModified === '') {
			endChecked = todo.ends;
		} else {
			endChecked = dateRightFormat(this.state.deadlineModified);
		}

		if (this.state.todoModified === '') {
			todoChecked = todo.task;
		} else {
			todoChecked = this.state.todoModified;
		}

		if (this.state.noteModified === '') {
			noteChecked = todo.note;
		} else {
			noteChecked = this.state.noteModified;
		}
		await axios.put(`/tasks/${todo.id}`, {
			task: todoChecked,
			note: noteChecked,
			starts: todo.starts,
			ends: endChecked
		});
		this.toggle();
	};

	componentDidMount() {
		axios.get('/tasks').then(data => {
			this.setState({ data: data.data });
		});
	}

	render() {
		return (
			<div>
				<h1>Manage My Todos</h1>

				<table>
					<thead>
						<tr>
							<th>todo</th>
							<th>note</th>
							<th>starts</th>
							<th>ends</th>
							<th>days left</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(task => {
							return (
								<tr key={task.id}>
									<td>{task.task}</td>
									<td>{task.note}</td>
									<td>{task.starts}</td>
									<td>{task.ends}</td>
									<td>{daysLeftCalculator(task.ends)}</td>
									<td>
										<button onClick={() => this.handleClickDelete(task)}>
											Delete
										</button>
									</td>
									<td>
										<Button color="danger" onClick={this.toggle}>
											Modify
										</Button>

										<Modal
											isOpen={this.state.modal}
											toggle={this.toggle}
											className={this.props.className}
										>
											<ModalHeader toggle={this.toggle}>
												Modal title
											</ModalHeader>
											<ModalBody>
												<div>
													<label>Todo</label>
													<input
														type="text"
														name="todoModified"
														value={this.state.todoModified}
														onChange={this.handleInputChange}
													/>
												</div>
												<div>
													<label>Note</label>
													<input
														type="text"
														name="noteModified"
														value={this.state.noteModified}
														onChange={this.handleInputChange}
													/>
												</div>
												<div>
													<label>Ends</label>
													<input
														type="number"
														name="deadlineModified"
														value={this.state.deadlineModified}
														onChange={this.handleInputChange}
													/>
												</div>
											</ModalBody>
											<ModalFooter>
												<button color="primary" onClick={() => this.handleConfirm(task)}>
													Confirm
												</button>
												<Button color="secondary" onClick={this.handleClickCancel}>
													Cancel
												</Button>
											</ModalFooter>
										</Modal>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
