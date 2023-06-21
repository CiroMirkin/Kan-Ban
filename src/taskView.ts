import { taskView } from "./taskViewInterface";
import { colorPalette } from "./colorPalette";
import { task } from "./taskInterface";

export default class TaskView implements taskView {
      colorPalette: colorPalette;
      constructor() {
            this.colorPalette = {
                  primary: '#B13126',
                  secondary: 'EDE2C6',
                  ternary:'#150B0E',
                  fontColor: '#150B0E',
                  borderColor: '#150B0E',
            }
      }
      getTaskElement(taskId: string): HTMLElement {
            const task = document.createElement('LI')
            task.setAttribute('id', taskId)
            task.classList.add('task')
            return task
      }
      getOptionsTaskElement(taskId: string): HTMLElement {
            const options = document.createElement('FOOTER')
            options.classList.add('task__footer')
            options.innerHTML = `
                  <button class="task__move-task-btn">
                        <span> --> </span><span class="color"></span>
                  </button>
                  <div class="task__options" id="${taskId}">
                        <button>Editar</button>
                        <button>Eliminar</button>
                  </div>
            `
            return options 
      }
      getTaskElementForShowIt(task: task): HTMLElement {
            const taskId = task.getTaskInformation().id
            const taskElement = this.getTaskElement(taskId)
            const taskHeader = document.createElement('HEADER')
            taskHeader.classList.add('task__header')
            const taskText = document.createElement('P')
            taskText.innerText = task.getTaskInformation().text
            taskText.classList.add('task__text')
            const taskOptionsElement = this.getOptionsTaskElement(taskId)
            taskElement.appendChild(taskHeader)
            taskElement.appendChild(taskText)
            taskElement.appendChild(taskOptionsElement)
            return taskElement
      }
}