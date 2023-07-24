import Column from "../table/column";
import { columnInformation } from "../table/columnInterface";
import { table } from "../table/tableInterface";

interface addNewColumnInTableInterface {
    table: table;
    add({ name, id }: columnInformation): any;
}

export default class AddNewColumnInTable implements addNewColumnInTableInterface {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    add({ name, id }: columnInformation): any {
        const newColumn = new Column(name, id);
        const table = this.table;
        table.columns.push(newColumn)
        table.orderOfColumns.push(newColumn.getColumnInformation().id)
  }
}