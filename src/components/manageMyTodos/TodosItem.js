import React from 'react';
import ModifyModal from './ModifyModal'
import {daysLeftCalculator} from '../../Modules/dateRelatedFunctions'

const TodosItem = ({ todo, handleClickDelete, triggerChange }) => {
	const {
		task,
		note,
		starts,
		ends
	} = todo;
	return (
		<tr>
			<td>{task}</td>
			<td>{note}</td>
			<td>{starts}</td>
			<td>{ends}</td>
			<td>{daysLeftCalculator(ends)}</td>
			<td>
				<button onClick={() => handleClickDelete(todo)}>Delete</button>
			</td>
			<td>
				<ModifyModal buttonLabel='Modify' todo={todo} triggerChange={triggerChange} />
			</td>
		</tr>
	);
};

export default TodosItem;
