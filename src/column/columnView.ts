import { colorPalette } from "../colorPalette";
import { columnView, informationForShowTheColumn } from "./columnViewInterface";
import { task } from "../task/taskInterface";

export default class ColumnView implements columnView {
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
                  const taskElement: HTMLElement = task.getTaskElementForShowIt()
                  column.childNodes.item(1).appendChild(taskElement)
            })
            return column
      }
}