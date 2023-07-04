import { column } from "../column/columnInterface";
import { tableView } from "./tableViewInterface";

export interface table {
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      getColumn(columnId: string): column;
      getTheNextColumnIdOfThisColumnId(columnId: string): string;
      moveThisTaskInThisColumn(taskId: string, columnId: string): any;
      addNewColumn(newColumn: column): any;
      deleteColumn(columnId: string): any;
      show(): any;
}