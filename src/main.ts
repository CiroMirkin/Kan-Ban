import { addNewTaskToTheFirstColumn, getTable, showTable } from './app';
import './style.css'
import Task, { OptionNamesOfDefaultTasks } from './task/defaultTasks';
import { task } from './task/taskInterface';

document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
  <header class="header">
    <button>Graficos</button>
    <h1>Kan-Ban</h1>
    <form class="header__add-task" id="addNewTaskForm">
      <textarea name="newTask" id="newTask" placeholder="Nueva tarea..."></textarea>
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

const tableElement: HTMLDivElement = document.querySelector<HTMLDivElement>('#tableContainer')!;
tableElement.addEventListener('click', (e: MouseEvent) => {
  if(isTask(e)) {
    const optionName = getOption<OptionNamesOfDefaultTasks>(e);
    const taskId = getTaskIdFromTaskElement(e);
    doActionOfTheOption<OptionNamesOfDefaultTasks>(optionName, taskId);
  }
})
const isTask = (e: MouseEvent): boolean => {
  const target = e.target as HTMLElement | null;
  if (!target) {
    return false;
  }
  const containerElement = target.parentElement?.parentElement;
  return containerElement?.classList.contains('task__footer') || false;
}
function getOption<OptionNames>(e: MouseEvent): OptionNames {
  const target = e.target as HTMLElement;
  const buttonOption = target.getAttribute('option') as OptionNames;
  return buttonOption;
}
const getTaskIdFromTaskElement = (e: MouseEvent): string => {
  const target = e.target as HTMLElement;
  const element = target.parentElement?.id || 'null';
  if(element == 'null') {
    throw new Error("Task ID undefined or the system can't find it.");
  }
  return element;
}
const editIt = (taskId: string): any => {
  console.log('edit', taskId)
}
const deleteIt = (taskId: string): any => {
  console.log('delete', taskId)
}
const archiveIt = (taskId: string): any => {
  console.log('archive', taskId)
}
function doActionOfTheOption<OptionNames>(nameOfOptionUserWillDo: OptionNames, taskId: string): any {
  const actionsOfAllOptions = {
    delete: deleteIt,
    edit: editIt,
    archive: archiveIt
  }
  Object.entries(actionsOfAllOptions).forEach(([option, action]) => {
    if(option === nameOfOptionUserWillDo) action(taskId);
  })
}