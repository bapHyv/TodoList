import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
	daysLeftCalculator,
	dateRightFormat
} from '../../Modules/dateRelatedFunctions';
import axios from 'axios';

const ModifyModal = props => {
	const { buttonLabel, className, todo, triggerChange } = props;

	const [modal, setModal] = useState(false);
	const [todoModified, setTodoModified] = useState(todo.task);
	const [noteModified, setNoteModified] = useState(todo.note);
	const [deadlineModified, setDeadlineModified] = useState('');

	const toggle = () => {
		setModal(!modal);
	};

	const handleCancel = () => {
		toggle()
		setTodoModified(todo.task)
		setNoteModified(todo.note)
	}

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
		let endChecked
		let todoChecked
		let noteChecked

		if (deadlineModified === '') {
			endChecked = todo.ends
		} else {
			endChecked = dateRightFormat(deadlineModified)
		}

		if (todoModified === '') {
			todoChecked = todo.task
		} else {
			todoChecked = todoModified
		}

		if (noteModified === '') {
			noteChecked = todo.note
		} else {
			noteChecked = noteModified
		}
		await axios
			.put(`/tasks/${todo.id}`, {
				task: todoChecked,
				note: noteChecked,
				starts: todo.starts,
				ends: endChecked
			})
			.then(toggle)
			.then(triggerChange())
	};


	return (
		<div>
			<Button color="danger" onClick={() => toggle(todo)}>
				{buttonLabel}
			</Button>

			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Modal title</ModalHeader>

				<ModalBody>
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
					<Button color="secondary" onClick={handleCancel}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ModifyModal;
