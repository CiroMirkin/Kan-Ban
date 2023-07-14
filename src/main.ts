import { loadKanbanBoardPageContent } from './kanbanBoardPageContent';
import { getManagerOfTableInstance } from './managerOfTables';
import Column from './column/column';

const managerOfTable = getManagerOfTableInstance()

const column1 = new Column('Tareas pendientes', '1');
const column2 = new Column('Tareas en proceso', '2');
const column3 = new Column('Tareas Terminadas', '3');
const basicTable = managerOfTable.createATable({
  tableColumns: [column1, column2, column3],
  tableName: 'tabla basica'
})

async function loadKanbanBoadPage() {
  loadKanbanBoardPageContent();
  await import('./kanbanBoardPage');
}

managerOfTable.changeTableInUse(basicTable.id);
loadKanbanBoadPage();
