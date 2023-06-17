import { column } from "./columnInterface";
import { tableView } from "./tableViewInterface";

export interface table {
      name: string;
      columns: Array<Object>;
      tableView: tableView;
      addNewColumn(newColumn: column): any;
      deleteColumn(columnId: string): any;
      show(): any;
}