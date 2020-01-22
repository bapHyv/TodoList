import React, { Component } from 'react'
import axios from 'axios'

export default class TodosDone extends Component {
    constructor() {
        super()
        this.state = {
            todosDone : []
        }
    }

    componentWillMount() {
        axios.get('/done/').then(data => {
            console.log(data.data)
            this.setState({
                todosDone: data.data
            })
        })
    }

    render() {
        return (
            <div>
				<h1>Todos done</h1>
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
						{this.state.todosDone.map(task => {
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
        )
    }
}
