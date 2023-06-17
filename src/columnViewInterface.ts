import { task } from "./taskInterface";

interface columnColorPalette {
      backgroundColor: string;
      fontColor: string;
      borderColor: string;
}
export interface columnView {
      colorPalette: columnColorPalette;
      getColumnElement(): Object;
      getColumnForShowIt(tasks: Array<task>): Object;
}