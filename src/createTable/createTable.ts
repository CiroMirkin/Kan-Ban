import AddNewColumnInTable from "../addNewColumnInTable/addNewColumnInTable";
import { columnInformation } from "../column/columnInterface";
import { getGenericId } from "../getAnID";
import { getUserTablesInstance } from "../userTables/userTables";
import Table from "../table/table";

interface informationForCreateATable { 
    tableColumns: columnInformation[],
    tableName: string
}

type tableId = string;

export default class CreateTable {
    userTables;
    constructor() {
        this.userTables = getUserTablesInstance();
    }
    createDefaultTable() {
        const tableColumns = [
          { name: 'En Espera', id: '1' },
          { name: 'En proceso', id: '2' },
          { name: 'Terminadas', id: '3' }
        ];
        const [ tableId, tableName ] = ['DEFAULT_TABLE', 'Tabla basica']; 
        const table = new Table(tableId, tableName);
        const addColumnInTable = new AddNewColumnInTable(table);
        tableColumns.forEach(column => addColumnInTable.add(column));
        this.userTables.addTable(table);
        return table;
      }
      newTable({ tableColumns, tableName }: informationForCreateATable): tableId {
        const getTableId = () => `table_${getGenericId()}`;
    
        const newTableId = getTableId();
        const newTable = new Table(newTableId, tableName);
        const addNewColumnInTable = new AddNewColumnInTable(newTable);
        tableColumns.forEach(column => addNewColumnInTable.add(column));
        this.userTables.addTable(newTable);
        return newTableId;
      }
}