import AddNewColumnInTable from "./addNewColumnInTable";
import { columnInformation } from "../model/columnModel/columnInterface";
import { getGenericId } from "../getAnID";
import { getUserTablesInstance } from "../entity/userTables/userTables";
import Table from "../entity/table/table";
import { defaultTableID, defaultTableName } from "../model/tableModel/tableConstants";

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
        const [ tableId, tableName ] = [defaultTableID, defaultTableName]; 
        const table = new Table(tableId, tableName);
        this.userTables.addTable(table);
        return table;
      }
      newTable({ tableColumns, tableName }: informationForCreateATable): tableId {
        const getTableId = () => `table_${getGenericId()}`;
    
        const newTableId = getTableId();
        const newTable = new Table(newTableId, tableName);
        const addNewColumnInTable = new AddNewColumnInTable(newTable);
        tableColumns.forEach(column => addNewColumnInTable.addOneColumn(column));
        this.userTables.addTable(newTable);
        return newTableId;
      }
}