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
    this.overlayItem.classList.remove(`page-overlay--visible`);
  }

  animate() {
    this.overlayItem.classList.add(`page-overlay--visible`);
  }

  addListeners() {
    this.overlayItem.addEventListener(
        `transitionend`,
        this.onOverlayTransitionEnd
    );
  }

  removeListeners() {
    this.overlayItem.removeEventListener(
        `transitionend`,
        this.onOverlayTransitionEnd);
  }

  onPageOverlayTransitionEnd() {
    const isVisible = this.overlayItem.classList.contains(`page-overlay--visible`);

    if (typeof this.callback === `function` && isVisible) {
      this.callback();
    }

    this.overlayItem.classList.remove(`page-overlay--visible`);
  }
}
