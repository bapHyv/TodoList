import React, { Component } from 'react';
import axios from 'axios';
import TodosItem from './TodosItem';
import {dateRightFormat} from '../../Modules/dateRelatedFunctions'

export default class ManageMyTodos extends Component {
	constructor() {
		super();
		this.state = {
			data: []
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
								<TodosItem
									key={task.id}
									todo={task}
									handleClickDelete={this.handleClickDelete}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
