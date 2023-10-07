import { column } from "../columnModel/columnInterface";
import { table } from "../tableModel/tableInterface";

export default class Table implements table {
      id: string;
      name: string;
      columns: Array<column>;
      orderOfColumns: string[];
      constructor(id: string, name: string = 'default'){
            this.id = id;
            this.name = name.trim();
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
}