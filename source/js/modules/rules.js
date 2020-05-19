export default class Rules {
  constructor() {
    this._rulesWrap = document.querySelector(`.rules`);
    this._rulesBtn = this._rulesWrap.querySelector(`.rules__link`);
    this._rulesItems = Array.from(this._rulesWrap.querySelectorAll(`.rules__item`));
    this._lastRule = this._rulesItems[this._rulesItems.length - 1];

    this._onLastRuleAnimationEnd = this._onLastRuleAnimationEnd.bind(this);
    this._onDocumentScreenChanged = this._onDocumentScreenChanged.bind(this);
  }

  init() {
    this._addListeners();
  }

  destroy() {
    this._rulesBtn.classList.remove(`rules__link--animate`);
    this._removeListeners();
  }

  _animateRuleBtn() {
    this._rulesBtn.classList.add(`rules__link--animate`);
  }

  _onLastRuleAnimationEnd() {
    this._animateRuleBtn();
  }

  _hideRuleBtn(evt) {
    const screenName = evt.detail.screenName;

    if (screenName === `rules`) {
      this._rulesBtn.classList.remove(`rules__link--animate`);
    }
  }

  _onDocumentScreenChanged(evt) {
    this._hideRuleBtn(evt);
  }

  _addListeners() {
    this._lastRule.addEventListener(
        `animationend`,
        this._onLastRuleAnimationEnd
    );

    document.body.addEventListener(
        `screenChanged`,
        this._onDocumentScreenChanged
    );
  }

  _removeListeners() {
    this._lastRule.removeEventListener(
        `animationend`,
        this._onLastRuleAnimationEnd);

    document.body.removeEventListener(
        `screenChanged`,
        this._onDocumentScreenChanged
    );
  }
}
