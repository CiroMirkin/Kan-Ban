import { column } from "./columnInterface";
import { tableView } from "../tableView/tableViewInterface";

export interface table {
      id: string
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      getTheNextColumnIdOfThisColumnId(columnId: string): string;
      getThePrevColumnIdOfThisColumnId(columnId: string): string;
      getFirstColumnId(): string;
      getColumn(columnId: string): column;
      show(): any;
}