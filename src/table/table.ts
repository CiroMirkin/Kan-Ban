import { column } from "../column/columnInterface";
import { table } from "./tableInterface";
import { tableView } from "./tableViewInterface";
import DefautTableView from "./tableView";

export default class DefaultTable implements table {
      id: string;
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      constructor(id: string){
            this.id = id;
            this.name = 'default'
            this.tableView = new DefautTableView()
            this.columns = [];
            this.orderOfColumns = [];
      }
      getColumn(columnId: string): column {
            const column = this.columns.filter(column => column.getColumnInformation().id == columnId)[0]
            return column
      }
      getFirstColumnId(): string {
      return [...this.columns][0].id
      }
      getTheNextColumnIdOfThisColumnId(columnId: string): string {
            let indexOfTheNextColumnId: number = [...this.orderOfColumns].indexOf(columnId) + 1;
            return this.orderOfColumns[indexOfTheNextColumnId] ?? columnId;
      }
      getThePrevColumnIdOfThisColumnId(columnId: string): string {
            let indexOfTheNextColumnId: number = [...this.orderOfColumns].indexOf(columnId) - 1;
            return this.orderOfColumns[indexOfTheNextColumnId] ?? columnId;
      }
      addNewColumn(newColumn: column): any {
            this.columns.push(newColumn)
            this.orderOfColumns.push(newColumn.getColumnInformation().id)
      }
      moveThisTaskInThisColumnToThisColumn(taskId: string, oldColumnId: string, newColumnId: string): any {
            const task = this.getColumn(oldColumnId).getTask(taskId);
            this.getColumn(oldColumnId).deleteTask(taskId);
            task.idOfColumnWheresTheTask = newColumnId;
            this.getColumn(newColumnId).addNewTask(task);
      }
      deleteColumn(columnId: string): any {
            this.columns = this.columns.filter((column) => 
                  column.getColumnInformation().id !== columnId
            )
      }
      show(): any {
            this.tableView.showTable([...this.columns])
      }
}