import { column, columnInformation } from "./columnInterface";
import { columnView, informationForShowTheColumn } from "./columnViewInterface";
import { task } from "../task/taskInterface";
import ColumnView from "./columnView";


export default class Column implements column {
      name: string;
      id: string;
      listOftask: Array<task>;
      columnView: columnView;
      constructor(name: string, id: string) {
            this.name = name;
            this.id = id
            this.listOftask = []
            this.columnView = new ColumnView()
      }
      getColumnInformation(): columnInformation {
            return {
                  id: this.id,
                  name: this.name
            }
      }
      addNewTask(newTask: task): any {
            this.listOftask.push(newTask)
      }
      deleteTask(taskId: string): any {
            this.listOftask = this.listOftask.filter((task: task) => 
                  task.getTaskInformation().id !== taskId
            )
      }
      getTaskForMoveIt(taskId: string): task {
            const task = this.listOftask.filter((task: task) => 
                  task.getTaskInformation().id == taskId
            )[0]
            return task

      }
      getColumnElementForShowIt(): HTMLElement {
            const columnInformation: informationForShowTheColumn = {
                  ...this.getColumnInformation(),
                  listOfTask: [...this.listOftask] 
            }
            const column = this.columnView.getColumnForShowIt(columnInformation)
            return column
      }
}