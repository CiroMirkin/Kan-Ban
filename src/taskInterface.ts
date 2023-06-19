import { taskView } from "./taskViewInterface";

export interface taskInformation {
      id: string,
      text: string
}
export interface task {
      id: string;
      text: string;
      taskView: taskView;
      getTaskInformation(): taskInformation;
      getTaskElementForShowIt(): HTMLElement;
}