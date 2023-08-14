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