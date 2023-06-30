import { addNewTaskToTheFirstColumn, getTable, showTable } from './app';
import './style.css'
import TaskInFirstColumn, { OptionNamesOfDefaultTasks } from './defaultTasks';
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
  return new TaskInFirstColumn({
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
    const taskId: string = getTaskIdFromTaskElement(e);
    doActionOfTheOption<OptionNamesOfDefaultTasks>(optionName, taskId);
  }
})
const isTask = (e: MouseEvent): boolean => {
  const itIsTheMoveButton: string = e.target.parentElement.classList[0]
  const itIsAnOptionButton: string = e.target.parentElement.parentElement.classList[0]
  return itIsAnOptionButton == 'task__footer' || itIsTheMoveButton == 'task__footer' 
}
function getOption<OptionNames>(e: MouseEvent): OptionNames {
  const target = e.target as HTMLElement
  const buttonOption = target.attributes['option'].nodeValue;
  return buttonOption;
}
const getTaskIdFromTaskElement = (e: MouseEvent): string => {
  const element = e.target as HTMLElement;
  const option1 = element.parentElement.id;
  const option2 = element.parentElement.parentElement.id;
  return (!option1) ? option2 : option1;
}
const moveNext = (taskId: string): any => {
  console.log('next')
}
const movePrev = (taskId: string): any => {
  console.log('prev')
}
const editIt = (taskId: string): any => {
  console.log('edit')
}
const deleteIt = (taskId: string): any => {
  console.log('delete')
}
const archiveIt = (taskId: string): any => {
  console.log('archive')
}
function doActionOfTheOption<OptionNames>(nameOfOptionUserWillDo: OptionNames, taskId: string): any {
  const actionsOfAllOptions = {
    moveNext,
    movePrev,
    delete: deleteIt,
    edit: editIt,
    archive: archiveIt
  }
  Object.entries(actionsOfAllOptions).forEach(([option, action]) => {
    if(option === nameOfOptionUserWillDo) action(taskId);
  })
}