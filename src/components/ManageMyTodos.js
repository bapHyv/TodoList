import React, { Component } from 'react';
import axios from 'axios';
import TodosItem from './TodosItem';

export default class ManageMyTodos extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}

	handleClickDelete = id => {
		axios.delete(`/tasks/${id}`);
		console.log(id);
		axios.get('/tasks').then(data => {
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
							<th>beggining</th>
							<th>dead line</th>
							<th>time left</th>
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
