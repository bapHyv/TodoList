import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

export default class TodosDone extends Component {
	constructor() {
		super();
		this.state = {
			todosDone: []
		};
	}

	componentWillMount() {
		axios.get('/done/').then(data => {
			this.setState({
				todosDone: data.data
			});
		});
	}

	handleClickErase = async () => {
		let stringId = ''
		
		this.state.todosDone.map(e => {
		return stringId += e.id + ','
		})
		let stringIdComaLess = stringId.substring(0, stringId.length - 1)
		await axios.delete(`/done/${stringIdComaLess}`).catch(err => console.error(err))
		await axios.get('/done/').then(data => {
			this.setState({
				todosDone: data.data
			});
		});
	}
	
	render() {
		const {todosDone} = this.state
		return (
			<div>
				<div>
					<h1>Todos done</h1>
					<Button color="danger" onClick={this.handleClickErase}>Erase everything</Button>
				</div>
				<table>
					<thead>
						<tr>
							<th>todo</th>
							<th>note</th>
							<th>started</th>
							<th>ended</th>
						</tr>
					</thead>
					<tbody>
						{todosDone.map(task => {
							return (
								<tr key={task.id}>
									<td>{task.task}</td>
									<td>{task.note}</td>
									<td>{task.started}</td>
									<td>{task.ended}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
