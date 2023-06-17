import { column } from "./columnInterface";

export interface table {
      name: string;
      columns: Array<Object>;
      addNewColumn(newColumn: column): any;
      changeColumnToAnotherColumn(newColumn: column): any;
      showColumns(): any;
}