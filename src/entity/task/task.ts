import { taskView } from "../../view/taskViewInterface";
import { task } from "./taskInterface";
import { taskInformation } from "./taskInterface";

export type NameOfOptionsOnTasks = 'movePrev' | 'moveNext' | 'delete' | 'edit' | 'archive'

export default class Task implements task {
      id: string;
      text: string;
      idOfColumnWheresTheTask: string;
      constructor({ text, id, idOfColumnWheresTheTask }: taskInformation) {
            this.text = text
            this.id = id
            this.idOfColumnWheresTheTask = idOfColumnWheresTheTask
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
      getTaskElementForShowIt(taskView: taskView): HTMLElement {
            const task = taskView.getTaskElementForShowIt(this)
            return task
      }
}