import React from 'react';
import ModifyModal from './ModifyModal';
import { daysLeftCalculator } from '../../Modules/dateRelatedFunctions';
import {Button} from 'reactstrap'

const TodosItem = ({ todo, handleClickDelete, triggerChange }) => {
	const { task, note, starts, ends } = todo;
	return (
		<tr>
			<td>{task}</td>
			<td>{note}</td>
			<td>{starts}</td>
			<td>{ends}</td>
			<td>{daysLeftCalculator(ends)}</td>
			<div style={{display: 'flex', justifyContent: 'space-around' }}>
				<Button color="danger" onClick={() => handleClickDelete(todo)}>Delete</Button>
				<ModifyModal
					buttonLabel="Modify"
					todo={todo}
					triggerChange={triggerChange}
				/>
			</div>
		</tr>
	);
};

export default TodosItem;
