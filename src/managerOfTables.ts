import DefaultTable from "./table/table"
import { table } from "./table/tableInterface"
import { column } from "./column/columnInterface";
import { getGenericId } from "./getAnID";

interface createATableInformation { 
  tableColumns: column[],
  tableName: string
}
export interface tableInList {
  table: table,
  name: string,
  id: string
}
interface managerOfTablesInterface {
  listOfTables: tableInList[];
  createATable({ tableColumns, tableName }: createATableInformation): tableInList;
  getListOfTableNames(): string[];
  getListOfTableInformation(): tableInListInformation[];
  getTableById(id: string): table;
  updateViewOfATable(table: table): any;
}
interface tableInListInformation {
  name: string, 
  id: string
}

export class ManagerOfTAbles implements managerOfTablesInterface {
  listOfTables: tableInList[];
  constructor() {
    this.listOfTables = [];
  }
  createATable({ tableColumns, tableName }: createATableInformation): tableInList {
    const getTableId = () => `table_${getGenericId()}`;
    const tableId = getTableId();
    const newTable: table = new DefaultTable(tableId, tableName);
    tableColumns.forEach(column => newTable.addNewColumn(column));
    const newTableInList: tableInList = {
      table: newTable,
      name: tableName,
      id: tableId
    }
    this.listOfTables.push(newTableInList);
    return newTableInList;
  }
  getListOfTableNames(): string[] {
    return [...this.listOfTables].map(table => table.name);
  }
  getListOfTableInformation(): tableInListInformation[] {
    return [...this.listOfTables].map(table => {
      return {
        name: table.name,
        id: table.id
      }
    });
  }
  getTableById(id: string): table {
    return this.listOfTables.filter(table => table.id == id)[0].table;
  }
  updateViewOfATable(table: table): any {
    table.show();
  }
}
