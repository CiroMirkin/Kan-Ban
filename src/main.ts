import { loadKanbanBoardPageContent } from './kanbanBoardPageContent';

async function loadKanbanBoadPage() {
  loadKanbanBoardPageContent();
  await import('./kanbanBoardPage');
}

loadKanbanBoadPage()