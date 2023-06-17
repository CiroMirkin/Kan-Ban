interface taskInformation {
      id: string;
      text: string;
}
export interface task {
      information: taskInformation;
      getTaskInformation(taskId: string): taskInformation;
}