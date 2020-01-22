import React from 'react';
import ModifyModal from './ModifyModal'

const TodosItem = ({ todo, handleClickDelete }) => {
	const {
		id,
		task,
		note,
		beggining,
		deadline,
		timeleft
	} = todo;
	return (
		<tr>
			<td>{task}</td>
			<td>{note}</td>
			<td>{beggining}</td>
			<td>{deadline}</td>
			<td>{timeleft}</td>
			<td>
				<button onClick={() => handleClickDelete(todo)}>Delete</button>
			</td>
			<td>
				<ModifyModal buttonLabel='Modify' todo={todo} />
			</td>
		</tr>
	);
};

export default TodosItem;
