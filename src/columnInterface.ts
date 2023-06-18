import { columnView } from "./columnViewInterface";
import { task } from "./taskInterface";

export interface column {
      name: string;
      id: string;
      listOftask: Array<task>;
      columnView: columnView;
      addNewTask(newTask: task): any;
      deleteTask(taskId: string): any;
      getTaskForMoveIt(taskId: string): task;
      getColumnElementForShowIt(): Object;
}