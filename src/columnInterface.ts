import { task } from "./taskInterface";

export interface column {
      name: string;
      listOftask: Array<Object>;
      addNewTask(newTask: task): any;
      deleteATask(taskId: string): any;
      getATask(taskId: string): task;
      showTasks(): any;
}