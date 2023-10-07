import Column from "../entity/column/column";
import { column } from "../model/columnModel/columnInterface";
import { table } from "../model/tableModel/tableInterface";

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
    edit(oldColumnId: string, newColumnName: string): any {
        this.table.columns = this.table.columns.map(column => {
            if(column.id == oldColumnId) {
                const newColumn = new Column(newColumnName, column.id);
                newColumn.listOftask = column.listOftask;
                return newColumn;
            }
            return column
        })
    }
} 