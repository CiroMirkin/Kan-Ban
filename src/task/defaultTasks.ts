import { task } from "./taskInterface";
import { taskInformation } from "./taskInterface";
import DefaultTaskView from "./defaultTasksView";
import { taskView } from "./taskViewInterface";

export type OptionNamesOfDefaultTasks = 'movePrev' | 'moveNext' | 'delete' | 'edit' | 'archive'

export default class Task implements task {
      id: string;
      text: string;
      taskView: taskView
      constructor(taskInformation: taskInformation) {
            this.text = taskInformation.text
            this.id = taskInformation.id
            this.taskView = new DefaultTaskView()
      }
      getTaskInformation(): taskInformation {
            return {
                  id: this.id,
                  text: this.text
            }
      }
      getTaskElementForShowIt(): HTMLElement {
            const task = this.taskView.getTaskElementForShowIt(this)
            return task
      }
}