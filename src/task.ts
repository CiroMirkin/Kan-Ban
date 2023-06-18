import { task } from "./taskInterface";
import { taskInformation } from "./taskInterface";
import TaskView from "./taskView";
import { taskView } from "./taskViewInterface";

export default class Task implements task {
      id: string;
      text: string;
      taskView: taskView
      constructor(text: string, id: string) {
            this.text = text
            this.id = id
            this.taskView = new TaskView()

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