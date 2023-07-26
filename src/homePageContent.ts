export function loadHomePageContent() {
    document.querySelector<HTMLDivElement>('#header')!.innerHTML = `
      <header class="header">
      <h1>Kan-Ban</h1>
      <button class="header__btn">Crear tablero</button>
      </header>
    `;
    document.querySelector<HTMLDivElement>('#pageContent')!.innerHTML = ``;
    document.querySelector<HTMLDivElement>('#tableContainer')!.innerHTML = ``;
}

export function changeStylesIfTheUserIsOnPhoneDevice() {
  const IstheUserDeviceAPhone = window.matchMedia("(max-width: 480px)");
  if (IstheUserDeviceAPhone.matches) {
    document.body.style.width = '300vw';
    document.body.scroll({
      top: 10,
      left: 100,
      behavior: "smooth",
    });
  }
}