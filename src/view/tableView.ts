import { column } from "../model/columnModel/columnInterface";
import { tableView } from "../model/tableModel/tableViewInterface"

export default class TableView implements tableView {
      constructor() {}
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