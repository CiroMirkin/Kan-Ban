import { colorPalette } from "./colorPalette";
import { columnView } from "./columnViewInterface";
import { task } from "./taskInterface";

export default class ColumnView implements columnView {
      colorPalette: colorPalette;
      constructor() {
            this.colorPalette = {
                  backgroundColor: '',
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