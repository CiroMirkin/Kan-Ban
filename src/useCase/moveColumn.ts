import { column } from "../model/columnModel/columnInterface";
import { table } from "../model/tableModel/tableInterface";
import DeleteColumnFromTable from "./deleteColumnFromTable";

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
        console.log(columnId)
    }
    moveOnePlaceToLeft(columnId: string): void {
        console.log(columnId)
    }
}