import { getGenericId } from "../getAnID";
import { table } from "../createTable/tableInterface";
import Task from "../task/task";

export default class AddNewTaskInTable {
    table: table;
    constructor(table: table) {
        this.table = table;
    }
    add({ text }: { text: string }) {
        const table = this.table;
        const newTask = new Task({
            id: `task_${getGenericId()}`,
            text: text.trim(),
            idOfColumnWheresTheTask: table.getFirstColumnId()
        }); 
        const firstColumnId = newTask.idOfColumnWheresTheTask;
        const column = table.getColumn(firstColumnId);
        column.addNewTask(newTask);
    }
}