import { getTable, showTable } from './table/tableManager';
import './style.css'
import Task, { OptionNamesOfDefaultTasks } from './task/defaultTasks';
import { task } from './task/taskInterface';

showTable(getTable());

document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
  <header class="header">
    <button class="header__grafics-btn">Ver metricas</button>
    <h1>Kan-Ban</h1>
    <form class="header__add-task" id="addNewTaskForm">
      <textarea name="newTask" id="newTask" placeholder="Nueva tarea..."></textarea>
      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#150B0E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
    </form>
  </header>
`

const getNewTask = (input: HTMLTextAreaElement): task => {
  return new Task({
    id: 'task_1',
    text: (input.value).trim(),
    idOfColumnWheresTheTask: '1'
  }); 
}
const formElement: HTMLFormElement = document.querySelector<HTMLFormElement>('#addNewTaskForm')!;
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputElement: HTMLTextAreaElement = document.querySelector<HTMLTextAreaElement>('#newTask')!;
  const newTask = getNewTask(inputElement);
  const columnId = newTask.idOfColumnWheresTheTask;
  const table = getTable()
  const column = table.getColumn(columnId);
  column.addNewTask(newTask);
  inputElement.value = '';
  showTable(table);
});

const tableElement: HTMLDivElement = document.querySelector<HTMLDivElement>('#tableContainer')!;
tableElement.addEventListener('click', (e: MouseEvent) => {
  if(isTask(e)) {
    const optionName = getOption<OptionNamesOfDefaultTasks>(e);
    const taskId = getTaskIdFromTaskElement(e);
    const columnId = getIdOfTheColumnWhereIsTheTask(e); 
    doActionOfTheOption<OptionNamesOfDefaultTasks>(optionName, taskId, columnId);
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
const getIdOfTheColumnWhereIsTheTask = (e: MouseEvent): string => {
  const target = e.target as HTMLElement;
  return target.parentElement?.getAttribute('columnId') as string;
}
function doActionOfTheOption<OptionNames>(nameOfOptionUserWillDo: OptionNames, taskId: string, columnId: string): any {
  const actionsOfAllOptions = {
    movePrev,
    moveNext,
    delete: deleteIt,
    edit: editIt,
    archive: archiveIt
  }
  Object.entries(actionsOfAllOptions).forEach(([option, action]) => {
    if(option === nameOfOptionUserWillDo) action(taskId, columnId);
  })
}

/* --- Actions ---- */

const editIt = (taskId: string, columnId: string): any => {
  const editTaskModalContainer = document.getElementById('editTaskModalContainer');
  editTaskModalContainer?.classList.replace('edit-task-modal-container--hide', 'edit-task-modal-container--show');
  const textareaElement = document.getElementById('editTaskTextarea') as HTMLTextAreaElement | HTMLInputElement;
  textareaElement.value = getTable().getColumn(columnId).getTask(taskId).getTaskInformation().text;

  editTaskModalContainer?.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if(target.id == 'editTaskSaveBtn') {
      const textareaElement = document.getElementById('editTaskTextarea') as HTMLTextAreaElement | HTMLInputElement;
      const newTaskText = textareaElement?.value ?? '';
      changeTask({ newTaskText, taskId, columnId });
      editTaskModalContainer?.classList.replace('edit-task-modal-container--show', 'edit-task-modal-container--hide');
    }
  }, false);
  
  interface changeTaskInterface { newTaskText: string, taskId: string, columnId: string }
  const changeTask = ({ newTaskText, taskId, columnId }: changeTaskInterface) => {
    const table = getTable();
    const column = table.getColumn(columnId);
    const task = column.getTask(taskId);
    task.changeText(newTaskText.trim());
    showTable(getTable()); /* no quitar, porque hay un problema de sincronia. 
      La funcion tarda y al terminar las vista de la tabla ya se actualizo, por ende no se muestran los cambios que realizo la funcion.
    */
  }
};
const deleteIt = (taskId: string, columnId: string): any => {
  const table = getTable();
  table.getColumn(columnId).deleteTask(taskId);
}
const archiveIt = (taskId: string, columnId: string): any => {
  console.log('archive', taskId, columnId)
}
const movePrev = (taskId: string, columnId: string): any => {
  const table = getTable();
  const prevColumnId = table.getThePrevColumnIdOfThisColumnId(columnId)
  table.moveThisTaskInThisColumnToThisColumn(taskId, columnId, prevColumnId);
}
const moveNext = (taskId: string, columnId: string): any => {
  const table = getTable();
  const nextColumnId = table.getTheNextColumnIdOfThisColumnId(columnId)
  table.moveThisTaskInThisColumnToThisColumn(taskId, columnId, nextColumnId);
}
