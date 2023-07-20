import Column from "../column/column";
import { table } from "../table/tableInterface";

interface addNewColumnInTableInterface {
    table: table;
    add({ title, id }: { title: string, id: string }): any;
}

export default class AddNewColumnInTable implements addNewColumnInTableInterface {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    add({ title, id }: { title: string, id: string }): any {
        const newColumn = new Column(title, id);
        const table = this.table;
        table.columns.push(newColumn)
        table.orderOfColumns.push(newColumn.getColumnInformation().id)
  }
}