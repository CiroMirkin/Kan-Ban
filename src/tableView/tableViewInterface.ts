import { column } from "../addNewColumnInTable/columnInterface";

export interface tableView {
      getTableElement(): HTMLElement;
      getTableForShowIt(columns: Array<column>): HTMLElement;
      showTable(columns: Array<column>): any;
}