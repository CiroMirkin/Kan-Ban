export function loadHomePageContent() {
    document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
      <header class="header">
      <h1>Kan-Ban</h1>
      <button class="header__btn">Crear tablero</button>
      </header>
    `;
    // document.querySelector<HTMLDivElement>('#pageContent')!.innerHTML = ``;
  }