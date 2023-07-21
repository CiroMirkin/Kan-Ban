import Table from "../table/table"
import { table } from "../table/tableInterface"
import { getGenericId } from "../getAnID";
import AddNewColumnInTable from "../addNewColumnInTable/addNewColumnInTable";
import { columnInformation } from "../column/columnInterface";

interface informationForCreateATable { 
  tableColumns: columnInformation[],
  tableName: string
}
export interface tableInList {
  table: table,
  name: string,
  id: string
}
export interface tableInListInformation {
  name: string, 
  id: string
}

class ManagerOfTables {
  private listOfTables: tableInList[];
  private tableInUse: table;

  constructor() {
    this.listOfTables = [];
    this.tableInUse = this.#createDefaultTable();
  }

  #createDefaultTable(): table {
    const tableColumns = [
      { name: 'En Espera', id: '1' },
      { name: 'En proceso', id: '2' },
      { name: 'Terminadas', id: '3' }
    ];
    const [ tableName, tableId ] = ['DEFAULT_TABLE', 'Tabla basica']; 
    const table = new Table(tableId, tableName);
    const addColumnInTable = new AddNewColumnInTable(table);
    tableColumns.forEach(column => addColumnInTable.add(column));
    const tableInList: tableInList = {
      table: table,
      name: tableName,
      id: tableId
    }
    this.listOfTables.push(tableInList);
    return table;
  }
  newTable({ tableColumns, tableName }: informationForCreateATable): tableInList {
    const getTableId = () => `table_${getGenericId()}`;

    const newTableId = getTableId();
    const newTable = new Table(newTableId, tableName);
    const addNewColumnInTable = new AddNewColumnInTable(newTable);
    tableColumns.forEach(column => addNewColumnInTable.add(column));
    const newTableInList: tableInList = {
      table: newTable,
      name: tableName,
      id: newTableId
    }
    this.listOfTables.push(newTableInList);
    return newTableInList;
  }
  getTableInUse(): table {
    return this.tableInUse;
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
}

const managerOfTables = new ManagerOfTables()
export function getManagerOfTableInstance() {
  return managerOfTables
}