import throttle from 'lodash/throttle';
import vars from "../vars";
import PageOverlay from "./page-overlay";
import {Screens} from "../vars";

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.screenTimeOut = null;
    this.dispatchEvtTimeOut = null;

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChenged.bind(this);

    this.scrollHandler = throttle(
        this.onScrollHandler,
        this.THROTTLE_TIMEOUT,
        {
          trailing: false,
        }
    );

    this.changePageDisplay = this.changePageDisplay.bind(this);

    this.pageOverlay = new PageOverlay(
        vars.pageOverlay,
        this.changePageDisplay,
    );
  }

  init() {
    document.addEventListener(`wheel`, this.scrollHandler);
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChenged();
  }

  onScroll(evt) {
    this.setCurrentScreen();
    this.reCalculateActiveScreenPosition(evt.deltaY);

    location.hash = this.screenElements[this.activeScreen].id;
  }

  onUrlHashChenged() {
    if (this.checkTransitionFromStoryToPrizes()
    ) {
      this.setPageScreenByUrl();

      this.pageOverlay.animate();
    } else {
      this.setPageScreenByUrl();
      this.changePageDisplay();
    }
  }

  checkTransitionFromStoryToPrizes() {
    const currentScreen = this.currentScreen;
    const nextScreen = location.hash.slice(1);

    return (
      currentScreen && currentScreen.id === Screens.STORY &&
      nextScreen === Screens.PRIZES
    );
  }

  checkAnimationScreenInMain() {
    if (this.screenElements[this.activeScreen].id === Screens.TOP) {
      vars.animationScreen.classList.add(`animation-screen--upper`);
    } else {
      vars.animationScreen.classList.remove(`animation-screen--upper`);
    }
  }

  setPageScreenByUrl() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;

    this.setCurrentScreen();

    this.changeActiveMenuItem();
  }

  setCurrentScreen() {
    this.currentScreen = this.screenElements[this.activeScreen];
  }

  changePageDisplay() {
    this.checkAnimationScreenInMain();
    this.changeVisibilityDisplay();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);

    clearTimeout(this.screenTimeOut);

    this.screenTimeOut = setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 0);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    clearTimeout(this.dispatchEvtTimeOut);

    this.dispatchEvtTimeOut = setTimeout(() => {
      document.body.dispatchEvent(event);
    }, 0);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
