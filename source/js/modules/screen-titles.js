import LetterAnimation from "./letter-animation";
import {Screens} from "../vars";
import utils from "../utils";
import {
  mainTitleData,
  introDateData,
  storyTitleData,
  prizesTitleData,
  rulesTitleData,
  gameTitleData,
} from "./titles-data";

class ScreenTitles {
  constructor() {
    this._mainTitleAnim = new LetterAnimation(mainTitleData);
    this._introDateAnim = new LetterAnimation(introDateData);
    this._storyTitleAnim = new LetterAnimation(storyTitleData);
    this._prizesTitleAnim = new LetterAnimation(prizesTitleData);
    this._rulesTitleAnim = new LetterAnimation(rulesTitleData);
    this._gameTitleAnim = new LetterAnimation(gameTitleData);

    this._onDocumentScreenChanged = this._onDocumentScreenChanged.bind(this);
  }

  init() {
    this._addListeners();
  }

  destroy() {
    this._removeListeners();
    this.disableMainScreenTitles();
    this.disableStoryScreenTitle();
    this.disablePrizesScreenTitle();
    this.disableRulesScreenTitle();
    this.disableGameScreenTitle();
  }

  _checkPage(params) {
    switch (params.screenName) {
      case Screens.TOP:
        this.animateMainScreenTitles();
        break;
      case Screens.STORY:
        this.animateStoryScreenTitle();
        break;
      case Screens.PRIZES:
        this.animatePrizesScreenTitle();
        break;
      case Screens.RULES:
        this.animateRulesScreenTitle();
        break;
      case Screens.GAME:
        this.animateGameScreenTitle();
        break;
      default: break;
    }
  }

  animateMainScreenTitles() {
    utils.delay(100).then(() => this._mainTitleAnim.runAnimation());

    utils.delay(500).then(() => this._introDateAnim.runAnimation());
  }

  disableMainScreenTitles() {
    this._mainTitleAnim.destroyAnimation();
    this._introDateAnim.destroyAnimation();
  }

  animateStoryScreenTitle() {
    utils.delay(100).then(() => this._storyTitleAnim.runAnimation());
  }

  disableStoryScreenTitle() {
    this._storyTitleAnim.destroyAnimation();
  }

  animatePrizesScreenTitle() {
    utils.delay(100).then(() => this._prizesTitleAnim.runAnimation());
  }

  disablePrizesScreenTitle() {
    this._prizesTitleAnim.destroyAnimation();
  }

  animateRulesScreenTitle() {
    utils.delay(100).then(() => this._rulesTitleAnim.runAnimation());
  }

  disableRulesScreenTitle() {
    this._rulesTitleAnim.destroyAnimation();
  }

  animateGameScreenTitle() {
    utils.delay(100).then(() => this._gameTitleAnim.runAnimation());
  }

  disableGameScreenTitle() {
    this._gameTitleAnim.destroyAnimation();
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

const screenTitles = new ScreenTitles();
screenTitles.init();
