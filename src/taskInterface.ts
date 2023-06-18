export interface taskInformation {
      id: string;
      text: string
}
export interface task {
      id: string;
      text: string;
      getTaskInformation(): taskInformation;
      getTaskElementForShowIt(): HTMLElement;
}