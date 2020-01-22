import React from 'react';
import ModifyModal from './ModifyModal'

const TodosItem = ({ todo, handleClickDelete }) => {
	const {
		id,
		task,
		note,
		starts,
		ends,
		timeleft
	} = todo;
	return (
		<tr>
			<td>{task}</td>
			<td>{note}</td>
			<td>{starts}</td>
			<td>{ends}</td>
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
