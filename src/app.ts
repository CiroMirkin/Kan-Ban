import DefaultTable from "./table/table"
import { table } from "./table/tableInterface"
import Column from "./column/column";
import { column } from "./column/columnInterface";

const table: table = new DefaultTable();

export function getTable () {
  return table
}

const addNewColumn  = (table: table, column: column): any => table.addNewColumn(column);

addNewColumn(table, new Column('Tareas pendientes', '1'));
addNewColumn(table, new Column('Tareas en proceso', '2'));
addNewColumn(table, new Column('Tareas Terminadas', '3'));

export const showTable = (table: table) => table.show()
