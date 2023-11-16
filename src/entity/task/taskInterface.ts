import { taskView } from "../../view/taskViewInterface";

export interface taskInformation {
      id: string,
      text: string,
      idOfColumnWheresTheTask: string
}
export interface task {
      id: string;
      text: string;
      idOfColumnWheresTheTask: string;
      changeColumn(columnId: string): any;
      changeText(newText: string): any;
      getTaskInformation(): taskInformation;
      getTaskElementForShowIt(taskViewModel: taskView): HTMLElement;
}