import { table } from "../tableModel/tableInterface";

interface taskMoveInterface {
    table: table;
    moveThisTaskInThisColumnToThisColumn(taskId: string, oldColumnId: string, newColumnId: string): any;
}

export default class TaskMove implements taskMoveInterface {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    moveThisTaskInThisColumnToThisColumn(taskId: string, oldColumnId: string, newColumnId: string): any {
        const table = this.table;
        const task = table.getColumn(oldColumnId).getTask(taskId);
        table.getColumn(oldColumnId).deleteTask(taskId);
        task.idOfColumnWheresTheTask = newColumnId;
        table.getColumn(newColumnId).addNewTask(task);
  }
}