import vars from "../vars";

export default () => {
  window.addEventListener(`load`, () => {
    vars.body.classList.add(`is-load`);
  });
};
