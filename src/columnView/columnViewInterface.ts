import { columnInformation } from "../column/columnInterface";
import { task } from "../task/taskInterface";

export interface informationForShowTheColumn extends columnInformation {
      listOfTask: Array<task>
}
export interface columnView {
      getColumnElement(columnId: string, columnName: string): HTMLElement;
      getColumnForShowIt(columnInformation: informationForShowTheColumn): HTMLElement;
}