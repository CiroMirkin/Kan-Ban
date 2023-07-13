import { task } from "./taskInterface";

export interface taskView {
      getTaskElement(taskId: string): HTMLElement;
      getOptionsTaskElement(task: task): HTMLElement;
      getTaskElementForShowIt(task: task): HTMLElement;
}