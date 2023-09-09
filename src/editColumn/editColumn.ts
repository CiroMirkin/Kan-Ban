import { column } from "../columnModel/columnInterface";
import { table } from "../tableModel/tableInterface";

export interface editColumn {
    oldColumn: column;
    table: table
    edit(oldColumn: column, newColumn: column): any;
}

export default class EditColumn {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    edit(oldColumn: column, newColumn: column): any {
        this.table.columns = this.table.columns.map(column => {
            if(column.id = oldColumn.id) {
                return newColumn;
            }
            return column
        })
    }
} 