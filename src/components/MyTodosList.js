import React, { Component } from 'react';
import axios from 'axios';
import {daysLeftCalculator} from '../Modules/dateRelatedFunctions'

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
							<th>starts (mm/dd/yyyy)</th>
							<th>ends (mm/dd/yyyy)</th>
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
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
