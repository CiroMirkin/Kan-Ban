import { column } from "../column/columnInterface";
import { tableView } from "./tableViewInterface";

export interface table {
      name: string;
      columns: Array<column>;
      tableView: tableView;
      getColumn(columnId: string): column;
      addNewColumn(newColumn: column): any;
      deleteColumn(columnId: string): any;
      show(): any;
}