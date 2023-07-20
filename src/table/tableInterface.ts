import { column } from "../column/columnInterface";
import { tableView } from "./tableViewInterface";

export interface table {
      id: string
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      getTheNextColumnIdOfThisColumnId(columnId: string): string;
      getThePrevColumnIdOfThisColumnId(columnId: string): string;
      deleteColumn(columnId: string): any;
      getFirstColumnId(): string;
      getColumn(columnId: string): column;
      show(): any;
}