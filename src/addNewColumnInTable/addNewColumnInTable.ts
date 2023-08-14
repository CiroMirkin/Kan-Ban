import Column from "../column/column";
import { columnInformation } from "../columnModel/columnInterface";
import { table } from "../tableModel/tableInterface";

interface addNewColumnInTableInterface {
    table: table;
    addOneColumn({ name, id }: columnInformation): any;
    addColumns(columns: columnInformation[]): any;
}

export default class AddNewColumnInTable implements addNewColumnInTableInterface {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    addOneColumn({ name, id }: columnInformation): any {
        const newColumn = new Column(name, id);
        const table = this.table;
        table.columns.push(newColumn)
        table.orderOfColumns.push(newColumn.getColumnInformation().id)
    }
    addColumns(columns: columnInformation[]): any {
        columns.forEach(column => this.addOneColumn(column));
    }
}