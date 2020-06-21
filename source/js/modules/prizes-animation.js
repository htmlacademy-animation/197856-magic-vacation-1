import {Screens} from "../vars";
import utils from "../utils";

class PrizesAnimation {
  constructor() {
    this.prizesList = document.querySelector(`.prizes__list`);
    this.svgIcons = Array.from(this.prizesList.querySelectorAll(`.prizes__icon img`));

    this._onDocumentScreenChanged = this._onDocumentScreenChanged.bind(this);
  }

  init() {
    this._addListeners();
  }

  destroy() {
    this._removeListeners();
    this.prizesList.classList.remove(`prizes__list--active`);
  }

  startAnimation() {
    if (!this.prizesList.classList.contains(`prizes__list--active`)) {
      this.prizesList.classList.add(`prizes__list--active`);

      this.svgIcons.forEach((svgIcon) => {
        if (utils.isDesktop()) {
          utils.updateImageVersion(svgIcon);
        }
      });
    }
  }

  _checkPage(params) {
    if (params.screenName === Screens.PRIZES) {
      this.startAnimation();
    }
  }

  _onDocumentScreenChanged(evt) {
    this._checkPage(evt.detail);
  }

  _addListeners() {
    document.body.addEventListener(
        `screenChanged`,
        this._onDocumentScreenChanged
    );
  }

  _removeListeners() {
    document.body.removeEventListener(
        `screenChanged`,
        this._onDocumentScreenChanged
    );
  }
}

const prizesAnimation = new PrizesAnimation();
prizesAnimation.init();
