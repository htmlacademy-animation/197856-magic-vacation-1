import {DEFAULT_TIMER_SEC} from "../const";
import {Screens} from "../vars";

class Timer {
  constructor(time = DEFAULT_TIMER_SEC) {
    this.localTime = time;
    this.defaultTime = time;
    this.interval = 1000;
    this.now = null;
    this.thenTime = Date.now();
    this.elapsed = null;
    this.requestId = null;

    this._onDocumentScreenChanged = this._onDocumentScreenChanged.bind(this);
    this._tick = this._tick.bind(this);
  }

  init() {
    this._addListeners();
  }

  destroy() {
    this._removeListeners();
    this._resetAnimation();
  }

  _resetAnimation() {
    cancelAnimationFrame(this.requestId);

    this.localTime = this.defaultTime;
    this.now = null;
    this.thenTime = Date.now();
    this.elapsed = null;
  }

  _startAnimation() {
    this._draw();
    requestAnimationFrame(this._tick);
  }

  _draw() {
    const seconds = parseInt(this.localTime % 60, 10).toString();
    const minutes = parseInt(this.localTime / 60 % 60, 10).toString();

    const [minuteContent, secondContent] = document.querySelectorAll(`.game__counter span`);

    minuteContent.textContent = minutes.length === 2 ? minutes : `0${minutes}`;
    secondContent.textContent = seconds.length === 2 ? seconds : `0${seconds}`;
  }

  _tick() {
    this.requestId = requestAnimationFrame(this._tick);

    this.now = Date.now();
    this.elapsed = this.now - this.thenTime;

    if (this.elapsed >= this.interval) {
      this.thenTime = this.now - (this.elapsed % this.interval);

      --this.localTime;

      if (this.localTime <= 0) {
        cancelAnimationFrame(this.requestId);
      }

      this._draw();
    }
  }

  _checkPage(params) {
    if (params.screenName === Screens.GAME) {
      this._startAnimation();
    } else {
      this._resetAnimation();
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

const gameTimer = new Timer();
gameTimer.init();
