import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { dateRightFormat, daysLeftCalculator } from '../../Modules/dateRelatedFunctions';
import axios from 'axios';
import DatePicker from 'react-datepicker';


const ModifyModal = props => {
	const { buttonLabel, className, todo, triggerChange } = props;

	const [modal, setModal] = useState(false);
	const [todoModified, setTodoModified] = useState(todo.task);
	const [noteModified, setNoteModified] = useState(todo.note);
	const [deadlineModified, setDeadlineModified] = useState(new Date());

	const toggle = () => {
		setModal(!modal);
	};

	const handleChangeDatePicker = date => {
		setDeadlineModified(date)
	};

	const handleCancel = () => {
		toggle();
		setTodoModified(todo.task);
		setNoteModified(todo.note);
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
		let endChecked;
		let todoChecked;
		let noteChecked;

		if (deadlineModified === '') {
			endChecked = todo.ends;
		} else {
			endChecked = deadlineModified
		}

		if (todoModified === '') {
			todoChecked = todo.task;
		} else {
			todoChecked = todoModified;
		}

		if (noteModified === '') {
			noteChecked = todo.note;
		} else {
			noteChecked = noteModified;
		}
		await axios
			.put(`/tasks/${todo.id}`, {
				task: todoChecked,
				note: noteChecked,
				starts: todo.starts,
				ends: dateRightFormat(daysLeftCalculator(endChecked))
			})
			.then(toggle)
			.then(triggerChange());
	};

	return (
		<div>
			<Button color="primary" onClick={() => toggle(todo)}>
				{buttonLabel}
			</Button>

			<Modal isOpen={modal} toggle={toggle} className={className}>
				<ModalHeader toggle={toggle}>Modify</ModalHeader>

				<ModalBody>
					<div>
						<label>Todo</label>
						<Input
							type="text"
							name="todoModified"
							value={todoModified}
							onChange={handleChangeInput}
						/>
					</div>
					<div style={{paddingTop: '16px'}}>
						<label>Note</label>
						<Input
							type="text"
							name="noteModified"
							value={noteModified}
							onChange={handleChangeInput}
						/>
					</div>
					<div style={{paddingTop: '16px'}}>
						<label>Deadline</label>
						<DatePicker
							selected={deadlineModified}
							onChange={handleChangeDatePicker}
						/>
					</div>
				</ModalBody>

				<ModalFooter>
					<Button color="success" onClick={() => handleConfirm(todo)}>
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
