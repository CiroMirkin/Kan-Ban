import { column } from "../column/columnInterface";
import { table } from "./tableInterface";
import { tableView } from "./tableViewInterface";
import DefautTableView from "./tableView";

export default class DefaultTable implements table {
      name: string;
      columns: Array<column> = [];
      tableView: tableView;
      constructor(){
            this.name = 'default'
            this.tableView = new DefautTableView()
      }
      addNewColumn(newColumn: column): any {
            this.columns.push(newColumn)
      }
      deleteColumn(columnId: string): any {
            this.columns = this.columns.filter((column) => 
                  column.getColumnInformation().id !== columnId
            )
      }
      show(): any {
            this.tableView.showTable([...this.columns])
      }
}