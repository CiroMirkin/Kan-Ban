import { taskView } from "./taskViewInterface";
import { colorPalette } from "../colorPalette";
import { task } from "./taskInterface";

export default class DefaultTaskView implements taskView {
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
            
            task.style.borderColor = this.colorPalette.ternary

            return task
      }
      getOptionsTaskElement(task: task): HTMLElement {
            const options = document.createElement('FOOTER')
            options.classList.add('task__footer')
            options.innerHTML = `
                  <div class="task__options" id="${task.id}" columnId="${task.idOfColumnWheresTheTask}">
                        <button option="movePrev"><-</button>
                        <button option="moveNext">-></button>
                  </div>
                  <div class="task__options" id="${task.id}" columnId="${task.idOfColumnWheresTheTask}">
                        <button option="edit">Editar</button>
                        <button option="delete">Eliminar</button>
                  </div>
            `
            return options 
      }
      getTaskElementForShowIt(task: task): HTMLElement {
            const taskId = task.getTaskInformation().id
            const taskElement = this.getTaskElement(taskId)
            const taskHeader = document.createElement('HEADER')
            taskHeader.classList.add('task__header')
            taskHeader.style.backgroundColor = this.colorPalette.primary
            const taskText = document.createElement('P')
            taskText.innerText = task.getTaskInformation().text
            taskText.classList.add('task__text')
            const taskOptionsElement = this.getOptionsTaskElement(task)
            taskElement.appendChild(taskHeader)
            taskElement.appendChild(taskText)
            taskElement.appendChild(taskOptionsElement)
            return taskElement
      }
}