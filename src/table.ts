import { column } from "./columnInterface";
import { table } from "./tableInterface";
import { tableView } from "./tableViewInterface";

export default class DefaultTable implements table {
      name: string;
      #columns: Array<column> = [];
      #tableView: tableView = new TableView();
      constructor(){
            this.name = 'default'
      }
      addNewColumn(newColumn: column): any {
            this.#columns.push(newColumn)
      }
      deleteColumn(columnId: string): any {
            this.#columns.filter((column) => 
                  column.getColumnInformation().id !== columnId
            )
      }
      show(): any {
            const table = this.#tableView.getTableForShowIt()
            const tableContainer = document.getElementById('tableContainer')
            tableContainer?.appendChild(table)
      }
}