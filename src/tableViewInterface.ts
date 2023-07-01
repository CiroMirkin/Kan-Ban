import { colorPalette } from "./colorPalette";
import { column } from "./column/columnInterface";

export interface tableView {
      colorPalette: colorPalette;
      getTableElement(): HTMLElement;
      getTableForShowIt(columns: Array<column>): HTMLElement;
      showTable(columns: Array<column>): any;
}