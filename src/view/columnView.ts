import { columnView, informationForShowTheColumn } from "../model/columnModel/columnViewInterface";
import { task } from "../entity/task/taskInterface";
import DefaultTaskView from "./taskView";

export default class ColumnView implements columnView {
      constructor() {}
      getColumnElement(columnId: string, columnName: string): HTMLElement {
            const column:HTMLElement = document.createElement('DIV')
            column.classList.add('column')
            column.setAttribute('id', columnId)
            const columnHead = document.createElement('HEADER')
            columnHead.classList.add('column__head')
            columnHead.innerText = columnName
            const listOfTask:HTMLElement = document.createElement('UL')
            listOfTask.classList.add('column__taskList')
            column.appendChild(columnHead)
            column.appendChild(listOfTask)
            return column
      }
      getColumnForShowIt(columnInformation: informationForShowTheColumn): HTMLElement {
            const columnId: string = columnInformation.id;
            const columnName: string = columnInformation.name;
            const listOfTask: Array<task> = columnInformation.listOfTask
            const column = this.getColumnElement(columnId, columnName)
            listOfTask.forEach((task: task) => {
                  const taskView = new DefaultTaskView()
                  const taskElement: HTMLElement = task.getTaskElementForShowIt(taskView)
                  column.childNodes.item(1).appendChild(taskElement)
            })
            return column
      }
}