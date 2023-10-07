import { column } from "../columnModel/columnInterface";

export interface table {
      id: string
      name: string;
      columns: Array<column>;
      orderOfColumns: string[];
      getTheNextColumnIdOfThisColumnId(columnId: string): string;
      getThePrevColumnIdOfThisColumnId(columnId: string): string;
      getFirstColumnId(): string;
      getColumn(columnId: string): column;
}