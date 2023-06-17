interface taskInformation {
      id: string;
      text: string;
}
export interface task {
      information: taskInformation;
      getTaskElementForShowIt(): Object;
}