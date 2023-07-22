import { getUserTablesInstance, InformationOfTables } from './userTables/userTables';
import { loadHomePageContent } from './homePageContent';
import './style.css'

const managerOfTable = getUserTablesInstance()

loadHomePageContent()

const getTableOfListHTMLElement = (tableOfList: InformationOfTables[]): HTMLElement => {
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
  const tableOfListHTMLElement = getTableOfListHTMLElement(managerOfTable.getListOfTablesInformation());
  document.querySelector<HTMLDivElement>('#pageContent')!.appendChild(tableOfListHTMLElement);
}
showTableOfList()

const tableOfListElement = document.querySelector<HTMLDivElement>('#tableList')!;
tableOfListElement.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList[0] == 'table') {
    // const tableId = target.id;
    loadKanbanBoadPage()
  }
  else if (target.parentElement?.classList[0] == 'table') {
    // const tableId = target.parentElement?.id;
    loadKanbanBoadPage()
  }
});

function loadKanbanBoadPage() {}
