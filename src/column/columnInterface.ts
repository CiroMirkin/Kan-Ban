import { columnView } from "../tableView/columnViewInterface";
import { task } from "../task/taskInterface";

export interface columnInformation {
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
      editTask(taskId: string, newTaskText: string): any;
      getTask(taskId: string): task;
      getColumnElementForShowIt(): HTMLElement;
}