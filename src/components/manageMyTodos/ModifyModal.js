import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
	daysLeftCalculator,
	dateRightFormat
} from '../../Modules/dateRelatedFunctions';
import axios from 'axios';

const ModifyModal = props => {
	const { buttonLabel, className, todo } = props;

	const [modal, setModal] = useState(false);
	const [todoModified, setTodoModified] = useState('');
	const [noteModified, setNoteModified] = useState('');
	const [deadlineModified, setDeadlineModified] = useState('');

	const toggle = () => {
		setModal(!modal);
	};

	const handleChangeInput = event => {
		return event.target.name === 'todoModified'
			? setTodoModified(event.target.value)
			: event.target.name === 'noteModified'
			? setNoteModified(event.target.value)
			: event.target.name === 'deadlineModified'
			? setDeadlineModified(event.target.value)
			: null;
	};

	const handleConfirm = async todo => {
		await axios.put(`/tasks/${todo.id}`, {
				task: todoModified,
				note: noteModified,
				starts: todo.starts,
				ends: dateRightFormat(deadlineModified)
			})
			.then(toggle);
	};


	return (
		<div>
			<Button color="danger" onClick={() => toggle(todo)}>
				{buttonLabel}
			</Button>

			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>

				<ModalBody>
					<table>
						<thead>
							<tr>
								<th>todo</th>
								<th>note</th>
								<th>starts</th>
								<th>ends</th>
								<th>days left</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{todo.task}</td>
								<td>{todo.note}</td>
								<td>{todo.starts}</td>
								<td>{todo.ends}</td>
								<td>{daysLeftCalculator(todo.ends)}</td>
							</tr>
						</tbody>
					</table>
					<div>
						<label>todo</label>
						<input
							type="text"
							name="todoModified"
							value={todoModified}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label>note</label>
						<input
							type="text"
							name="noteModified"
							value={noteModified}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<label>ends</label>
						<input
							type="number"
							name="deadlineModified"
							value={deadlineModified}
							onChange={handleChangeInput}
						/>
					</div>
				</ModalBody>

				<ModalFooter>
					<Button color="primary" onClick={() => handleConfirm(todo)}>
						Confirm
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ModifyModal;
