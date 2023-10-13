
import { table } from "../model/tableModel/tableInterface";

interface moveColumn {
    table: table;
    moveOnePlaceToRight(columnId: string): void;
    moveOnePlaceToLeft(columnId: string): void;
}
export default class MoveColumn implements moveColumn {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    moveOnePlaceToRight(columnId: string): void {
        const table = this.table;
        const indexOfTheColumn = [...table.orderOfColumns].indexOf(columnId);
        const indexOfTheNextColumn = (indexOfTheColumn + 1);
        if(indexOfTheNextColumn < table.columns.length) {
            this.move({ table, indexOfTheColumn, indexOfTheNextColumn });
        }
    }
    moveOnePlaceToLeft(columnId: string): void {
        const table = this.table;
        const indexOfTheColumn = [...table.orderOfColumns].indexOf(columnId);
        const indexOfTheNextColumn = (indexOfTheColumn - 1);
        const negativeIndex = -1;
        if(indexOfTheNextColumn > negativeIndex) {
            this.move({ table, indexOfTheColumn, indexOfTheNextColumn });
        }
    }
    private move({ table, indexOfTheNextColumn, indexOfTheColumn }: { table: table, indexOfTheNextColumn: number, indexOfTheColumn: number }) {
        const nextColumn = table.columns[indexOfTheNextColumn];
        const column = table.columns[indexOfTheColumn];
        table.columns[indexOfTheNextColumn] = column;
        table.columns[indexOfTheColumn] = nextColumn;
        const orderOfTheNextColumn = table.orderOfColumns[indexOfTheNextColumn];
        table.orderOfColumns[indexOfTheNextColumn] = table.orderOfColumns[indexOfTheColumn];
        table.orderOfColumns[indexOfTheColumn] = orderOfTheNextColumn;
    }
}