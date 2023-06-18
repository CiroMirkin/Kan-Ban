import { column } from "./columnInterface";
import { colorPalette } from "./colorPalette";
import { tableView } from "./tableViewInterface"

export default class DefautTableView implements tableView {
      colorPalette: colorPalette;
      constructor() {
            this.colorPalette = {
                  backgroundColor: '',
                  fontColor: '#150B0E',
                  borderColor: '#150B0E',
            }
      }
      getTableElement(): HTMLElement {
            const table = document.createElement('UL')
            return table
      }
      getTableForShowIt(columns: Array<column>): HTMLElement {
            const table = this.getTableElement()
            columns.forEach((column: column) => {
                  table.appendChild(column.getColumnElementForShowIt())
            })
            return table
      }
}