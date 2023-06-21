import { addNewTaskToTheFirstColumn, getTable, showTable } from './app';
import './style.css'
import Task from './task';
import { task } from './taskInterface';

document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
  <header class="header">
    <button>Graficos</button>
    <h1>Kan-Ban</h1>
    <form class="header__add-task" id="addNewTaskForm">
      <textarea name="newTask" id="newTask" cols="26" rows="1" placeholder="Nueva tarea..."></textarea>
      <button type="submit">+</button>
    </form>
  </header>
`

const getNewTask = (input: HTMLTextAreaElement): task => {
  return new Task({
    id: '1',
    text: (input.value).trim()
  }); 
}
const formElement: HTMLFormElement = document.querySelector<HTMLFormElement>('#addNewTaskForm')!;
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputElement: HTMLTextAreaElement = document.querySelector<HTMLTextAreaElement>('#newTask')!;
  const newTask = getNewTask(inputElement);
  const table = getTable()
  addNewTaskToTheFirstColumn({
    table, 
    columnId: '0',
    task: newTask
  });
  inputElement.value = '';
  showTable(table);
});