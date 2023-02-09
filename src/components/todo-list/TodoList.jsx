import { useState } from 'react';

const getTimeStamp = () => Date.now();

const TodoForm = () => {
	const [allTasks, setAllTasks] = useState([]);
	const [allTasksRender, setAllTasksRender] = useState([]);
	console.log(allTasks);

	return (
		<>
			<form onSubmit={ev => handleSubmit(ev, allTasks, setAllTasks)}>
				<label htmlFor=''></label>
				<input type='text' name='todo' placeholder='Create a new todo...' />
			</form>
			{allTasks.map(task => (
				<div key={task.id}>
					<label htmlFor={task.id}>{task.task}</label>
					<input
						id={task.id}
						type='checkbox'
						onChange={() => checkTask(task.id, allTasks, setAllTasks)}
					/>
					<img
						src='public/icon-cross.svg'
						alt='Imagen de cruz'
						onClick={ev => removeTask(task.id, allTasks, setAllTasks)}
					/>
				</div>
			))}
			<div>
				<button onClick={() => allTasksFilter(allTasks, setAllTasks)}>
					ALL
				</button>
				<button onClick={() => completeTasksFilter(allTasks, setAllTasks)}>
					COMPLETED
				</button>
				<button onClick={() => activeTasksFilter(allTasks, setAllTasks)}>
					ACTIVE
				</button>
			</div>
		</>
	);
};

const handleSubmit = (ev, allTasks, setAllTasks) => {
	ev.preventDefault();
	createObj(ev.target.todo.value, allTasks, setAllTasks);
	ev.target.todo.value = '';
};

const createObj = (text, allTasks, setAllTasks) => {
	const timeStamp = getTimeStamp();
	const newObj = {};
	newObj.task = text;
	newObj.id = timeStamp;
	newObj.checked = false;
	setAllTasks([...allTasks, newObj]);
};
const removeTask = (id, allTasks, setAllTasks) => {
	const newTasks = allTasks.filter(task => task.id !== id);
	setAllTasks(newTasks);
};

const checkTask = (id, allTasks, setAllTasks) => {
	const newTasks = allTasks.map(task => {
		if (id === task.id) {
			task.checked = !task.checked;
		}
		return task;
	});
	setAllTasks(newTasks);
};

const allTasksFilter = (allTasks, setAllTasks) => {
	setAllTasks(allTasks);
};

const completeTasksFilter = (allTasks, setAllTasks) => {
	const newTasks = allTasks.filter(task => task.checked);
	setAllTasks(newTasks);
};

const activeTasksFilter = (allTasks, setAllTasks) => {
	const newTasks = allTasks.filter(task => !task.checked);
	setAllTasks(newTasks);
};

export default TodoForm;
