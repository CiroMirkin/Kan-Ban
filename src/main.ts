import { addNewTaskToTheFirstColumn, getTable, showTable } from './app';
import './style.css'
import Task, { OptionNamesOfDefaultTasks } from './task/defaultTasks';
import { task } from './task/taskInterface';

document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
  <header class="header">
    <button class="header__grafics-btn">Graficos</button>
    <h1>Kan-Ban</h1>
    <form class="header__add-task" id="addNewTaskForm">
      <textarea name="newTask" id="newTask" placeholder="Nueva tarea..."></textarea>
      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#150B0E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
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
    showTable(getTable());
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
  const table = getTable();
  table.columns[0].deleteTask(taskId);
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