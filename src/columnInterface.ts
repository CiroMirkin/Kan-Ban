import { columnView } from "./columnViewInterface";
import { task } from "./taskInterface";

interface columnInformation {
      id: string;
      name: string;
}

export interface column {
      name: string;
      id: string;
      listOftask: Array<task>;
      columnView: columnView;
      getColumnInformation(): columnInformation;
      addNewTask(newTask: task): any;
      deleteTask(taskId: string): any;
      getTaskForMoveIt(taskId: string): task;
      getColumnElementForShowIt(): HTMLElement;
}