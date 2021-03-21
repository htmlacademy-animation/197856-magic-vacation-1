import {Screens} from "../vars";
import utils from "../utils";
import PrizeAmountCountdown from "../helpers/prize-amount-countdown";
import ResizeToPx from "../helpers/resize-to-px";

class PrizesAnimation {
  constructor() {
    this.prizesList = document.querySelector(`.prizes__list`);
    this.prizesItems = Array.from(this.prizesList.querySelectorAll(`.prizes__item`));

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

      this.prizesItems.forEach((prizesItem) => {
        const svgIcon = prizesItem.querySelector(`.prizes__icon img`);
        const prizesAmount = prizesItem.querySelector(`.prizes__desc b`);
        const duration = parseFloat(prizesItem.getAttribute(`data-duration`));
        const endAmount = parseInt(prizesAmount.textContent, 10);

        // Чтобы блоки не прыгали при анимации
        const resizePrizesAmount = new ResizeToPx(prizesAmount);
        resizePrizesAmount.init();
        prizesAmount.textContent = ``;

        if (utils.isDesktop()) {
          utils.updateImageVersion(svgIcon);

          setTimeout(() => {
            this.startPrizesAmountAnimation(prizesAmount, endAmount);
          }, duration * 1000);
        }
      });
    }
  }

  startPrizesAmountAnimation(element, endAmount) {
    if (!element || !endAmount) {
      return;
    }

    const prizesAmountCountdown = new PrizeAmountCountdown({
      element,
      endAmount,
    });

    prizesAmountCountdown.startCountdown();
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
