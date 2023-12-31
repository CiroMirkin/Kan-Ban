import './style.css'
import { getGenericId } from './getAnID';
import { getUserTablesInstance } from './entity/userTables/userTables';
import { NameOfOptionsOnTasks } from './entity/task/task';
import { table } from './model/tableModel/tableInterface';
import TaskMove from './useCase/taskMove';
import AddNewTaskInTable from './useCase/addNewTaskInTable';
import CreateTable from './useCase/createTable';
import AddNewColumnInTable from './useCase/addNewColumnInTable';
import EditColumn from './useCase/editColumn';
import DeleteColumnFromTable from './useCase/deleteColumnFromTable';
import { changeStylesIfTheUserIsOnPhoneDevice } from './changeStylesIfTheUserIsOnPhoneDevice';
import { defaultTableID } from './model/tableModel/tableConstants';
import ListOfColumnsView from './view/listOfColumnsView';
import TableController from './controller/tableController';
import MoveColumn from './useCase/moveColumn';

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
const showTable = (table: table) => new TableController(table).show();;
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
  const target = e.target as HTMLElement || null;
  if (!target) {
    return false;
  }
  if(target.classList[0] == 'icon') {
    const containerElement = target.parentElement?.parentElement?.parentElement;
    return containerElement?.classList.contains('task__footer') || false;
  }
  const containerElement = target.parentElement?.parentElement;
  return containerElement?.classList.contains('task__footer') || false;
}
function getOption<OptionNames>(e: MouseEvent): OptionNames {
  const target = e.target as HTMLElement;
  if(target.classList[0] == 'icon') {
    const buttonOption = target.parentElement?.getAttribute('option') as OptionNames;
    return buttonOption;
  }
  const buttonOption = target.getAttribute('option') as OptionNames;
  return buttonOption;
}
const getTaskIdFromTaskElement = (e: MouseEvent): string => {
  const target = e.target as HTMLElement;
  const element = target.parentElement?.id || target.parentElement?.parentElement?.id || 'null';
  if(element == 'null') {
    throw new Error("Task ID undefined or the system can't find it.");
  }
  return element;
}
const getIdOfTheColumnWhereIsTheTask = (e: MouseEvent): string => {
  const target = e.target as HTMLElement;
  if(target.classList[0] == 'icon') {
    return target.parentElement?.parentElement?.getAttribute('columnId') as string;
  }
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

const showEditColumnsModal = () => {
  const editColumnsModalElementContainer = document.getElementById('editColumnsModalContainer')!;
  editColumnsModalElementContainer.classList.replace('edit-columns-modal-container--hide', 'edit-columns-modal-container--show');
}
const hideEditColumnsModal = () => {
  const editColumnsModalElementContainer = document.getElementById('editColumnsModalContainer')!;
  editColumnsModalElementContainer.classList.replace('edit-columns-modal-container--show', 'edit-columns-modal-container--hide');
}
const editColumnsHTMLBtn = document.querySelector<HTMLButtonElement>('#editColumnsBtn')!;
editColumnsHTMLBtn.addEventListener('click', () => {
  showEditColumnsModal();  
  showColumns();
  listenForAction();
})
const showColumns = () => {
  const table = getTable();
  const columns = table.columns;
  new ListOfColumnsView(columns).show();
}
type optionsForEditColum = 'edit' | 'delete';
const listenForAction = () => {
  const editColumnsModalElementContainer = document.getElementById('editColumnsModalContainer')!;
  editColumnsModalElementContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if(target.id == 'editColumnsCloseModalBtn') {
      hideEditColumnsModal()
    }
    const isAddNewColumnBtn = target.id == 'addNewColumnBtn' || target.parentElement?.id == 'addNewColumnBtn';
    if(isAddNewColumnBtn) {
      const columnNameInputElement = document.querySelector<HTMLInputElement>('#newColumn')!;
      const columnName: string = (columnNameInputElement.value).trim();
      if(!!columnName) {
        columnNameInputElement.value = '';
        const table = getTable();
        new AddNewColumnInTable(table).addOneColumn({ name: columnName, id: getGenericId()});
        showTable(table);
        showColumns();
      }
    }
    else {
      const option = target?.getAttribute('option') as optionsForEditColum;
      const columnId = getColumnId(target);
      doActionOfthis(option, columnId);
      showTable(getTable());
      showColumns();
    }
  }, false)
}
const getColumnId = (target: HTMLElement): string  => { 
  return target.parentElement?.id || '';
}
const doActionOfthis = (optionTheUserWillDo: optionsForEditColum, columnId: string) => {
  const actionsOfAllOptions = {
    delete: deleteColumn,
    edit: editColumn,
    moveNext: moveColumnOnePlaceToRight,
    movePrev: moveColumnOnePlaceToLeft,
  }
  Object.entries(actionsOfAllOptions).forEach(([option, action]) => {
    if(option === optionTheUserWillDo) action(columnId);
  })
}
const deleteColumn = (columnId: string) => {
  const table = getTable();
  if(table.columns.length > 3) {
    new DeleteColumnFromTable(table).deleteThisColumn(columnId);
  }
}
const editColumn = (columnId: string) => {
  showEditColumnNameSection();
  const editColumnNameForm = document.querySelector<HTMLElement>('#editColumnBtn')!;
  editColumnNameForm.addEventListener('click', () => {
    const newColumnName = getNewColumnName(); 
    if(!!newColumnName) {
      clearNewColumnNameInput();
      hideEditColumnNameSection()
      const table = getTable();
      new EditColumn(table).edit(columnId, newColumnName);
    }
  }, false);
}
const showEditColumnNameSection = () => {
  const section = document.querySelector<HTMLElement>('#edit-column-section')!;
  section.classList.remove('edit-column-section--hide');
}
const hideEditColumnNameSection = () => {
  const section = document.querySelector<HTMLElement>('#edit-column-section')!;
  section.classList.add('edit-column-section--hide');
}
const getNewColumnName = (): string => {
  const editColumnInput = document.querySelector<HTMLInputElement>('#editColumnName')!;
  const newColumnName = editColumnInput.value.trim(); 
  return newColumnName;
}
const clearNewColumnNameInput = () => document.querySelector<HTMLInputElement>('#editColumnName')!.value = '';

const moveColumnOnePlaceToRight = (columnId: string) => new MoveColumn(getTable()).moveOnePlaceToRight(columnId);
const moveColumnOnePlaceToLeft = (columnId: string) => new MoveColumn(getTable()).moveOnePlaceToLeft(columnId);