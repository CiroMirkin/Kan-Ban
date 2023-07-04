import { colorPalette } from "../colorPalette";
import { task } from "./taskInterface";

export interface taskView {
      colorPalette: colorPalette;
      getTaskElement(taskId: string): HTMLElement;
      getOptionsTaskElement(task: task): HTMLElement;
      getTaskElementForShowIt(task: task): HTMLElement;
}