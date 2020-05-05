export default class PageOverlay {
  constructor(overlayItem, callback) {
    this.overlayItem = overlayItem;
    this.callback = callback;

    this.onOverlayTransitionEnd = this.onPageOverlayTransitionEnd.bind(this);

    this.init();
  }

  init() {
    this.addListeners();
  }

  destroy() {
    this.removeListeners();
    this.overlayItem.classList.remove(`page-overlay--animate`);
  }

  animate() {
    this.overlayItem.classList.add(`page-overlay--animate`);
  }

  addListeners() {
    this.overlayItem.addEventListener(
        `animationend`,
        this.onOverlayTransitionEnd
    );
  }

  removeListeners() {
    this.overlayItem.removeEventListener(
        `animationend`,
        this.onOverlayTransitionEnd);
  }

  onPageOverlayTransitionEnd() {
    const isVisible = this.overlayItem.classList.contains(`page-overlay--animate`);

    if (typeof this.callback === `function` && isVisible) {
      this.callback();
    }

    this.overlayItem.classList.remove(`page-overlay--animate`);
  }
}
