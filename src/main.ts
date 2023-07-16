import { loadKanbanBoardPageContent } from './kanbanBoardPageContent';
import { getManagerOfTableInstance, tableInListInformation } from './managerOfTables';
import Column from './column/column';
import { loadHomePageContent } from './homePageContent';
import './style.css'

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

const getTableOfListHTMLElement = (tableOfList: tableInListInformation[]): HTMLElement => {
  const tableOfListContainer = document.createElement('UL');
  tableOfListContainer.classList.add('tableList');
  tableOfListContainer.setAttribute('id', 'tableList');
  const tableElementList = tableOfList.map(table => `
    <li id="${table.id}" class="table"><h2 class="table__title">${table.name}</h2></li>
  `).join('');
  tableOfListContainer.innerHTML = tableElementList;
  return tableOfListContainer;
}
const showTableOfList = () => {
  const tableOfListHTMLElement = getTableOfListHTMLElement(managerOfTable.getListOfTableInformation());
  document.querySelector<HTMLDivElement>('#pageContent')!.appendChild(tableOfListHTMLElement);
}
showTableOfList()

const tableOfListElement = document.querySelector<HTMLDivElement>('#tableList')!;
tableOfListElement.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList[0] == 'table') {
    const tableId = target.id;
    managerOfTable.changeTableInUse(tableId);
    loadKanbanBoadPage()
  }
  else if (target.parentElement?.classList[0] == 'table') {
    const tableId = target.parentElement?.id;
    managerOfTable.changeTableInUse(tableId);
    loadKanbanBoadPage()
  }
});

async function loadKanbanBoadPage() {
  loadKanbanBoardPageContent();
  await import('./kanbanBoardPage');
}
