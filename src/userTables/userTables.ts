import { table } from "../table/tableInterface"

export interface InformationOfTables {
  name: string, 
  id: string
}

class UserTables {
  private listOfTables: table[];

  constructor() {
    this.listOfTables = [];
  }

  addTable(newTable: table): any {
    this.listOfTables.push(newTable);
  }
  getListOfTableNames(): string[] {
    return [...this.listOfTables].map(table => table.name);
  }
  getListOfTablesInformation(): InformationOfTables[] {
    return [...this.listOfTables].map(table => {
      return {
        name: table.name,
        id: table.id
      }
    });
  }
  getTableById(id: string): table {
    return this.listOfTables.filter(table => table.id == id)[0];
  }
}

const userTables = new UserTables()
export function getUserTablesInstance() {
  return userTables
}