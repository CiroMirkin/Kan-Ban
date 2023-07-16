import { loadKanbanBoardPageContent } from './kanbanBoardPageContent';
import { getManagerOfTableInstance } from './managerOfTables';
import Column from './column/column';
import { loadHomePageContent } from './homePageContent';

const managerOfTable = getManagerOfTableInstance()

const createBasicTable = () => {
  const column1 = new Column('En Espera', '1');
  const column2 = new Column('En proceso', '2');
  const column3 = new Column('Terminadas', '3');
  const basicTable = managerOfTable.createATable({
    tableColumns: [column1, column2, column3],
    tableName: 'tabla basica'
  })
  return basicTable
}
const basicTable = createBasicTable()
managerOfTable.changeTableInUse(basicTable.id);
loadHomePageContent()

async function loadKanbanBoadPage() {
  loadKanbanBoardPageContent();
  await import('./kanbanBoardPage');
}
// loadKanbanBoadPage();
