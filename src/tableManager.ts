import DefaultTable from "./table/table"
import { table } from "./table/tableInterface"
import Column from "./column/column";
import { column } from "./column/columnInterface";
import { getGenericId } from "./getAnID";

const tableId = `table_${getGenericId()}`
const table: table = new DefaultTable(tableId);
export function getTable (): table {
  return table
}
export const showTable = (table: table) => table.show()

const addNewColumn  = (table: table, column: column): any => table.addNewColumn(column);
addNewColumn(getTable(), new Column('Tareas pendientes', '1'));
addNewColumn(getTable(), new Column('Tareas en proceso', '2'));
addNewColumn(getTable(), new Column('Tareas Terminadas', '3'));
