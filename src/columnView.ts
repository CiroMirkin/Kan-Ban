import { colorPalette } from "./colorPalette";
import { columnView } from "./columnViewInterface";
import { task } from "./taskInterface";

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
      getColumnElement(): HTMLElement {
            const column = document.createElement('UL')
            return column
      }
      getColumnForShowIt(tasks: task[]): HTMLElement {
            const column = this.getColumnElement()
            tasks.forEach((task: task) => {
                  column.appendChild(task.getTaskElementForShowIt())
            })
            return column
      }
}