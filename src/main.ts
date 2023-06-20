import Column from "./column";
import { column } from "./columnInterface";
import DefaultTable from "./table"
import { table } from "./tableInterface"
import Task from "./task";
import { task } from "./taskInterface";


const table: table = new DefaultTable();

const addNewColumn  = (table: table, column: column): any => table.addNewColumn(column);

addNewColumn(table, new Column('Tareas pendientes', '1'));
addNewColumn(table, new Column('Tareas en proceso', '2'));
addNewColumn(table, new Column('Tareas Terminadas', '3'));

interface newTask {
  table: table, 
  columnId: string, 
  task: task
}

const addNewTask = (newTask: newTask) => {
  const columnId: number = Number(newTask.columnId);
  const column: column = newTask.table.columns[columnId];
  column.addNewTask(newTask.task);
};

addNewTask({
  table, 
  columnId: '0',
  task: new Task({
    id: '1',
    text: 'hacer un cafe'
  })
});

const showTable = (table: table) => table.show()

showTable(table)