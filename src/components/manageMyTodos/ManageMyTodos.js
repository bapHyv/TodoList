import React, { Component } from 'react';
import axios from 'axios';
import TodosItem from './TodosItem';
import {dateRightFormat} from '../../Modules/dateRelatedFunctions'

export default class ManageMyTodos extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			todoModified: '',
			noteModified: '',
			deadlineModified: ''
		};
	}

	

	handleClickDelete = async todo => {
		let doneArrayLength
		await axios.get('/done/').then(data => {
			doneArrayLength = data.data.length
			console.log(doneArrayLength)
		})
		console.log(todo)
		await axios.post('/done/', {
			id:doneArrayLength + 1,
			task: todo.task,
			note: todo.note,
			started: todo.starts,
			ended: dateRightFormat()
		})
		await axios.delete(`/tasks/${todo.id}`);
		await axios.get('/tasks').then(data => {
			this.setState({ data: data.data });
		});
	};

	handleConfirm = async todo => {
		console.log(todo.ends)
		let endChecked
		let todoChecked
		let noteChecked

		if (this.deadlineModified === '') {
			endChecked = todo.ends
		} else {
			endChecked = dateRightFormat(this.deadlineModified)
		}

		if (this.todoModified === '') {
			todoChecked = todo.task
		} else {
			todoChecked = this.todoModified
		}

		if (this.noteModified === '') {
			noteChecked = todo.note
		} else {
			noteChecked = this.noteModified
		}
		console.log(endChecked)
		await axios
			.put(`/tasks/${todo.id}`, {
				task: todoChecked,
				note: noteChecked,
				starts: todo.starts,
				ends: endChecked
			})
	};

	componentDidMount() {
		axios.get('/tasks').then(data => {
			this.setState({ data: data.data });
		});
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps)
		console.log(prevState)
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
								<TodosItem
									key={task.id}
									todo={task}
									handleClickDelete={this.handleClickDelete}
									handleConfirm={this.handleConfirm}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
