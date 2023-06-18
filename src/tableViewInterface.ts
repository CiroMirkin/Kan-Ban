import { colorPalette } from "./colorPalette";
import { column } from "./columnInterface";

export interface tableView {
      colorPalette: colorPalette;
      getTableElement(): HTMLElement;
      getTableForShowIt(columns: Array<column>): HTMLElement;
}