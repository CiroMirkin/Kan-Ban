import { table } from "../model/tableModel/tableInterface";

interface deleteColumnFromTable {
    table: table;
    deleteThisColumn(columnId: string): any;
}

export default class DeleteColumnFromTable implements deleteColumnFromTable {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    deleteThisColumn(columnId: string): any {
        const table = this.table;
        table.columns = table.columns.filter((column) => 
              column.getColumnInformation().id !== columnId
        )
        table.orderOfColumns = table.orderOfColumns.filter(columnID => columnID != columnId) 
  }
}