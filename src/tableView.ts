import { column } from "./column/columnInterface";
import { colorPalette } from "./colorPalette";
import { tableView } from "./tableViewInterface"

export default class DefautTableView implements tableView {
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
      getTableElement(): HTMLElement {
            const table = document.createElement('DIV')
            table.classList.add('table')
            table.setAttribute('id', 'table')
            return table
      }
      getTableForShowIt(columns: Array<column>): HTMLElement {
            const table = this.getTableElement()
            columns.forEach((column: column) => {
                  table.appendChild(column.getColumnElementForShowIt())
            })
            return table
      }
      showTable(columns: Array<column>): any {
            const table = this.getTableForShowIt(columns);
            const tableContainer: HTMLElement = document.querySelector<HTMLDivElement>('#tableContainer')!
            tableContainer.innerHTML = '';
            tableContainer.appendChild(table);
      }
}