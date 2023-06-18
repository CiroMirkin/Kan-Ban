import { colorPalette } from "./colorPalette";
import { task } from "./taskInterface";

export interface columnView {
      colorPalette: colorPalette;
      getColumnElement(): HTMLElement;
      getColumnForShowIt(tasks: Array<task>): HTMLElement;
}