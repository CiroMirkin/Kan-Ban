import { getManagerOfTableInstance } from './managerOfTables/managerOfTables';
import Task, { OptionNamesOfDefaultTasks } from './task/defaultTasks';
import { task } from './task/taskInterface';
import { getGenericId } from './getAnID';
import { table } from './table/tableInterface';
import './style.css'
import TaskMove from './taskMove/taskMove';

const tableManager = getManagerOfTableInstance();

const getTable = (): table => tableManager.tableInUse;
const showTable = (table: table) => table.show();
showTable(getTable());

/* --- */ 

const getNewTask = (input: HTMLTextAreaElement): task => {
  return new Task({
    id: `task_${getGenericId()}`,
    text: (input.value).trim(),
    idOfColumnWheresTheTask: getTable().getFirstColumnId()
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
    table.getColumn(columnId).editTask(taskId, newTaskText);
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
  const taskMove = new TaskMove(table);
  taskMove.moveThisTaskInThisColumnToThisColumn(taskId, columnId, prevColumnId);
}
const moveNext = (taskId: string, columnId: string): any => {
  const table = getTable();
  const nextColumnId = table.getTheNextColumnIdOfThisColumnId(columnId)
  const taskMove = new TaskMove(table);
  taskMove.moveThisTaskInThisColumnToThisColumn(taskId, columnId, nextColumnId);
}
