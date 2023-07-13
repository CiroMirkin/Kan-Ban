import { column } from "../column/columnInterface";
import { tableView } from "./tableViewInterface";

export interface table {
      id: string
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      getFirstColumnId(): string;
      getColumn(columnId: string): column;
      getTheNextColumnIdOfThisColumnId(columnId: string): string;
      getThePrevColumnIdOfThisColumnId(columnId: string): string;
      moveThisTaskInThisColumnToThisColumn(taskId: string, oldColumnId: string, newColumnId: string): any;
      addNewColumn(newColumn: column): any;
      deleteColumn(columnId: string): any;
      show(): any;
}