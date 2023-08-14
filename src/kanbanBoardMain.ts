import './style.css'
import { getUserTablesInstance } from './userTables/userTables';
import { NameOfOptionsOnTasks } from './task/task';
import { table } from './tableModel/tableInterface';
import TaskMove from './moveTask/taskMove';
import AddNewTaskInTable from './addNewTaskInTable/addNewTaskInTable';
import CreateTable from './createTable/createTable';
import AddNewColumnInTable from './addNewColumnInTable/addNewColumnInTable';
import { changeStylesIfTheUserIsOnPhoneDevice } from './changeStylesIfTheUserIsOnPhoneDevice';
import { defaultTableID } from './tableModel/tableConstants';

changeStylesIfTheUserIsOnPhoneDevice();

new CreateTable().createDefaultTable();

const userTables = getUserTablesInstance();
const tableColumns = [
    { name: 'En Espera', id: '1' },
    { name: 'En proceso', id: '2' },
    { name: 'Terminadas', id: '3' }
  ];
new AddNewColumnInTable(userTables.getTableById(defaultTableID)).addColumns(tableColumns);

const getTable = (): table => userTables.getTableById(defaultTableID);
const showTable = (table: table) => table.show();
showTable(getTable());

/* --- */ 

const getTextOfInputForCreateTask = (input: HTMLTextAreaElement): string => {
  const text = (input.value).trim(); 
  if(!text) {
    throw new Error("Text in task text input is black :(");
  }
  return text
}
const formElement: HTMLFormElement = document.querySelector<HTMLFormElement>('#addNewTaskForm')!;
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  createNewTask();
});
formElement.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        createNewTask();
    }
})

const createNewTask = () => {
    const table = getTable();
    const inputElement: HTMLTextAreaElement = document.querySelector<HTMLTextAreaElement>('#newTask')!;
    const newTaskText = getTextOfInputForCreateTask(inputElement);
    new AddNewTaskInTable(table).add({ text: newTaskText });
    inputElement.value = '';
    showTable(table);
}

const tableElement: HTMLDivElement = document.querySelector<HTMLDivElement>('#tableContainer')!;
tableElement.addEventListener('click', (e: MouseEvent) => {
  if(isTask(e)) {
    const optionName = getOption<NameOfOptionsOnTasks>(e);
    const taskId = getTaskIdFromTaskElement(e);
    const columnId = getIdOfTheColumnWhereIsTheTask(e); 
    doActionOfTheOption<NameOfOptionsOnTasks>(optionName, taskId, columnId);
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
  showModalForEditTask();
  putTheTextOfTheTaskInTheInputForEditIt({ columnId, taskId });
  const editTaskModalContainer = document.getElementById('editTaskModalContainer');
  editTaskModalContainer?.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if(target.id == 'editTaskSaveBtn') {
      const textareaElement = document.getElementById('editTaskTextarea') as HTMLTextAreaElement | HTMLInputElement;
      const newTaskText = textareaElement?.value ?? '';
      changeTheTextOfTheTask({ newTaskText, taskId, columnId });
      editTaskModalContainer?.classList.replace('edit-task-modal-container--show', 'edit-task-modal-container--hide');
    }
    if(target.id == 'editTaskCloseModalBtn') {
      const editTaskModalContainer = document.getElementById('editTaskModalContainer');
      editTaskModalContainer?.classList.replace('edit-task-modal-container--show', 'edit-task-modal-container--hide');
    }
  }, false);
  
  interface changeTheTextOfTheTaskInterface { newTaskText: string, taskId: string, columnId: string }
  const changeTheTextOfTheTask = ({ newTaskText, taskId, columnId }: changeTheTextOfTheTaskInterface) => {
    if(!!newTaskText) {
      const table = getTable();
      table.getColumn(columnId).editTask(taskId, newTaskText);
      showTable(getTable()); /* no quitar, porque hay un problema de sincronia. 
        La funcion editIt tarda debido al evento y al terminar la vista de la tabla ya se actualizo, por ende no se muestran los cambios que realizo la funcion editIt.
      */
    }
  }
};
const showModalForEditTask = () => {
  const editTaskModalContainer = document.getElementById('editTaskModalContainer');
  editTaskModalContainer?.classList.replace('edit-task-modal-container--hide', 'edit-task-modal-container--show');
}
const putTheTextOfTheTaskInTheInputForEditIt = ({ columnId, taskId }: { columnId: string, taskId: string }) => {
  const textareaElement = document.getElementById('editTaskTextarea') as HTMLTextAreaElement | HTMLInputElement;
  textareaElement.value = getTable().getColumn(columnId).getTask(taskId).getTaskInformation().text;
}
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
