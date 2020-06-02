export const Screens = {
  TOP: `top`,
  PRIZES: `prizes`,
  STORY: `story`,
  RULES: `rules`,
  GAME: `game`,
};

const vars = {};

vars.body = document.body;
vars.html = document.documentElement;
vars.pageOverlay = document.querySelector(`.page-overlay`);
vars.animationScreen = document.querySelector(`.animation-screen`);

export default vars;
