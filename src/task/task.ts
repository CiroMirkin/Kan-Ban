import { task } from "./taskInterface";
import { taskInformation } from "./taskInterface";
import DefaultTaskView from "../taskView/taskView";
import { taskView } from "../taskView/taskViewInterface";

export type NameOfOptionsOnTasks = 'movePrev' | 'moveNext' | 'delete' | 'edit' | 'archive'

export default class Task implements task {
      id: string;
      text: string;
      taskView: taskView
      idOfColumnWheresTheTask: string;
      constructor({ text, id, idOfColumnWheresTheTask }: taskInformation) {
            this.text = text
            this.id = id
            this.idOfColumnWheresTheTask = idOfColumnWheresTheTask
            this.taskView = new DefaultTaskView()
      }
      changeColumn(columnId: string): any {
            this.idOfColumnWheresTheTask = columnId;
      }
      changeText(newText: string): any {
            this.text = newText ?? ''
      }
      getTaskInformation(): taskInformation {
            return {
                  id: this.id,
                  text: this.text,
                  idOfColumnWheresTheTask: this.idOfColumnWheresTheTask
            }
      }
      getTaskElementForShowIt(): HTMLElement {
            const task = this.taskView.getTaskElementForShowIt(this)
            return task
      }
}