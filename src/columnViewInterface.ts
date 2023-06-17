import { colorPalette } from "./colorPalette";
import { task } from "./taskInterface";

export interface columnView {
      colorPalette: colorPalette;
      getColumnElement(): Object;
      getColumnForShowIt(tasks: Array<task>): Object;
}