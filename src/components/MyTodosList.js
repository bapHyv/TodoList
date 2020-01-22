import React, { Component } from 'react';
import axios from 'axios';

export default class MyTodosList extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		axios.get('/tasks').then(data => {
			this.setState({ data: data.data });
		});
	}
	render() {
		
		return (
			<div>
				<h1>My to do list</h1>
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
								<tr key={task.id}>
									<td>{task.task}</td>
									<td>{task.note}</td>
									<td>{task.beggining}</td>
									<td>{task.deadline}</td>
									<td>{task.timeleft}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
