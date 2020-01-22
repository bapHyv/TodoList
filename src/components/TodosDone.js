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
			console.log(data.data);
			this.setState({
				todosDone: data.data
			});
		});
	}

	handleClickErase = async () => {
		let stringId = ''
		
		this.state.todosDone.map(e => {
		stringId += e.id + ','
		})
		let stringIdComaLess = stringId.substring(0, stringId.length - 1)
		console.log(stringIdComaLess)

		await axios.delete(`/done/${stringIdComaLess}`).catch(err => console.error(err))
		await axios.get('/done/').then(data => {
			console.log(data.data);
			this.setState({
				todosDone: data.data
			});
		});
	}
	
	render() {
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
						{this.state.todosDone.map(task => {
							return (
								<tr key={task.id}>
									<td>{task.task}</td>
									<td>{task.note}</td>
									<td>{task.starts}</td>
									<td>{task.ends}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
