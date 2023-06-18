import { taskView } from "./taskViewInterface";
import { colorPalette } from "./colorPalette";
import { task } from "./taskInterface";

export default class TaskView implements taskView {
      colorPalette: colorPalette;
      constructor() {
            this.colorPalette = {
                  backgroundColor: '',
                  fontColor: '#150B0E',
                  borderColor: '#150B0E',
            }
      }
      getTaskElement(): HTMLElement {
            const task = document.createElement('LI')
            return task
      }
      getOptionsTaskElement(): HTMLElement {
            const options = document.createElement('FOOTER')
            return options 
      }
      getTaskElementForShowIt(task: task): HTMLElement {
            const taskText = document.createElement('P')
            taskText.innerText = task.getTaskInformation().text
            const taskOptionsElement = this.getOptionsTaskElement()
            const taskElement = this.getTaskElement()
            taskElement.appendChild(taskOptionsElement)
            taskElement.appendChild(taskText)
            return taskElement
      }
}