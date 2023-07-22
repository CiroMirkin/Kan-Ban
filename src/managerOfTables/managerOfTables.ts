import { table } from "../table/tableInterface"

export interface tableInListInformation {
  name: string, 
  id: string
}

class ManagerOfTables {
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
  getListOfTableInformation(): tableInListInformation[] {
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

const managerOfTables = new ManagerOfTables()
export function getManagerOfTableInstance() {
  return managerOfTables
}