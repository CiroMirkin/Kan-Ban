import { colorPalette } from "./colorPalette";
import { task } from "./taskInterface";

export interface taskView {
      colorPalette: colorPalette;
      getTaskElement(): HTMLElement;
      getOptionsTaskElement(): HTMLElement;
      getTaskElementForShowIt(task: task): HTMLElement;
}