import { colorPalette } from "./colorPalette";
import { columnInformation } from "./columnInterface";
import { task } from "./taskInterface";

export interface informationForShowTheColumn extends columnInformation {
      listOfTask: Array<task>
}
export interface columnView {
      colorPalette: colorPalette;
      getColumnElement(columnId: string, columnName: string): HTMLElement;
      getColumnForShowIt(columnInformation: informationForShowTheColumn): HTMLElement;
}