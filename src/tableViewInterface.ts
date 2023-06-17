import { colorPalette } from "./colorPalette";
import { column } from "./columnInterface";

export interface tableView {
      colorPalette: colorPalette;
      getTableElement(): Object;
      getTableForShowIt(columns: Array<column>): Object;
}