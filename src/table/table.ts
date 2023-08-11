import { column } from "../addNewColumnInTable/columnInterface";
import { table } from "../tableModel/tableInterface";
import { tableView } from "../tableModel/tableViewInterface";
import TableView from "../tableView/tableView";

export default class Table implements table {
      id: string;
      name: string;
      columns: Array<column>;
      tableView: tableView;
      orderOfColumns: string[];
      constructor(id: string, name: string = 'default'){
            this.id = id;
            this.name = name.trim();
            this.tableView = new TableView()
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
      show(): any {
            this.tableView.showTable([...this.columns])
      }
}