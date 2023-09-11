import { columnInformation } from "./columnInterface";
import { task } from "../taskModel/taskInterface";

export interface informationForShowTheColumn extends columnInformation {
      listOfTask: Array<task>
}
export interface columnView {
      getColumnElement(columnId: string, columnName: string): HTMLElement;
      getColumnForShowIt(columnInformation: informationForShowTheColumn): HTMLElement;
}