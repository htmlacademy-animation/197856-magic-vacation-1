export default class LetterAnimation {
  constructor({
    elementSelector,
    duration,
    interval,
    letterDelay,
    activeClass,
    transitionProperty
  }) {
    this._letterDelay = letterDelay;

    this._elementSelector = elementSelector;
    this._duration = duration;
    this._interval = interval;
    this._activeClass = activeClass;
    this._property = transitionProperty;
    this._element = document.querySelector(this._elementSelector);
    this._acc = [0, 2, 1];

    this.isInit = false;

    this.init();
  }

  init() {
    if (!this._element || this.isInit) {
      return;
    }

    this._element.classList.add(`text-anim`);

    this.splitText();

    this.isInit = true;
  }

  createElement(letter, delay) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._duration}ms ease ${delay}ms`;

    return span;
  }

  getWordElement(word, wordNum) {
    const wordDelay = this._interval * wordNum;

    return Array.from(word).reduce((fragment, latter, index) => {
      const delay = this._acc[index % this._acc.length] * this._letterDelay + wordDelay;

      fragment.appendChild(this.createElement(latter, delay));
      return fragment;
    }, document.createDocumentFragment());
  }

  getFullContent() {
    const self = this;

    const words = this._element.textContent.trim().split(` `).filter((latter) => latter !== ``);

    return words.reduce((fragmentParent, word, wordNum) => {
      const wordElementItem = self.getWordElement(word, wordNum);

      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text-anim__word`);
      wordContainer.appendChild(wordElementItem);

      fragmentParent.appendChild(wordContainer);

      return fragmentParent;
    }, document.createDocumentFragment());
  }

  splitText() {
    if (!this._element) {
      return;
    }

    const content = this.getFullContent();

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }

    this._element.classList.add(this._activeClass);
  }

  destroyAnimation() {
    this._element.classList.remove(this._activeClass);
  }
}
