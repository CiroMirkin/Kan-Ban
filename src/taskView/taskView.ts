import { taskView } from "./taskViewInterface";
import { task } from "../task/taskInterface";

export default class DefaultTaskView implements taskView {
      constructor() {}
      getTaskElement(taskId: string): HTMLElement {
            const task = document.createElement('LI')
            task.setAttribute('id', taskId)
            task.classList.add('task')
            return task
      }
      getOptionsTaskElement(task: task): HTMLElement {
            const options = document.createElement('FOOTER')
            options.classList.add('task__footer')
            options.innerHTML = `
                  <div class="task__options task__options--movement" id="${task.id}" columnId="${task.idOfColumnWheresTheTask}">
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