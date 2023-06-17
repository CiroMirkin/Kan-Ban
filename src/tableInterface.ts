import { column } from "./columnInterface";

export interface table {
      name: string;
      columns: Array<Object>;
      addNewColumn(newColumn: column): any;
      deleteColumn(columnId: string): any;
      showColumns(): any;
}