export function loadKanbanBoardPageContent() {
    document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
      <header class="header">
      <button id="btnForGoToHome" class="header__btn" title="El inicio aun no esta disponible.">Inicio</button>
      <h1>Kan-Ban</h1>
      <form class="header__add-task" id="addNewTaskForm">
      <textarea name="newTask" id="newTask" placeholder="Nueva tarea..."></textarea>
      <button type="submit" title="Crear tarea."><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#150B0E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
      </form>
      </header>
    `;
    document.querySelector<HTMLDivElement>('#pageContent')!.innerHTML = `
      <div id="editTaskModalContainer" class="edit-task-modal-container edit-task-modal-container--hide">
      <div class="edit-task-modal">
      <div class="color"><span></span><button>X</button></div>
      <div class="edit-task-modal__content">
      <textarea id="editTaskTextarea" cols="30" rows="10" class="edit-task-modal__textarea"></textarea>
      <button id="editTaskSaveBtn">Cambiar</button>
      </div>
      </div>
      </div>
    `;
  }
  