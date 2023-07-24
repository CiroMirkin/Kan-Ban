import { columnInformation } from "../table/columnInterface";
import { task } from "../table/taskInterface";

export interface informationForShowTheColumn extends columnInformation {
      listOfTask: Array<task>
}
export interface columnView {
      getColumnElement(columnId: string, columnName: string): HTMLElement;
      getColumnForShowIt(columnInformation: informationForShowTheColumn): HTMLElement;
}