import DefaultTable from "../table/table"
import { table } from "../table/tableInterface"
import { column } from "../column/columnInterface";
import { getGenericId } from "../getAnID";

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
  tableInUse: table;
  createATable({ tableColumns, tableName }: createATableInformation): tableInList;
  changeTableInUse(tableId: string): any;
  getListOfTableNames(): string[];
  getListOfTableInformation(): tableInListInformation[];
  getTableById(id: string): table;
  updateViewOfATable(table: table): any;
}
export interface tableInListInformation {
  name: string, 
  id: string
}

export class ManagerOfTAbles implements managerOfTablesInterface {
  listOfTables: tableInList[];
  tableInUse: table;
  constructor() {
    this.listOfTables = [];
    this.tableInUse = new DefaultTable('1');
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
  changeTableInUse(tableId: string) {
    this.tableInUse = this.getTableById(tableId);
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

const managerOfTables = new ManagerOfTAbles()
export function getManagerOfTableInstance(): managerOfTablesInterface {
  return managerOfTables
}