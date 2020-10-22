const POINTS = 3;

const ANIMATION_DELAY = 0.08;

const getStrokeAnimateTag = (path, pathLength, dur = 1) => {
  const animateTag = document.createElementNS(`http://www.w3.org/2000/svg`, `animate`);

  const diffLength = pathLength / POINTS;

  const roundedDiffLength = Math.ceil(diffLength);

  path.setAttribute(`stroke-dasharray`, `0 ${roundedDiffLength}`);
  animateTag.setAttribute(`attributeName`, `stroke-dasharray`);
  animateTag.setAttribute(`from`, `0 ${roundedDiffLength}`);
  animateTag.setAttribute(`to`, `${roundedDiffLength} 0`);
  animateTag.setAttribute(`dur`, `${dur}s`);
  animateTag.setAttribute(`fill`, `freeze`);

  return animateTag;
};

const animateResultSvg = () => {
  const resultTitleItem = document.querySelector(`.screen--show .result__title`);
  const resultSvgItem = resultTitleItem.querySelector(`.result__svg-anim`);

  if (!resultSvgItem) {
    return;
  }

  const clonedSvgItem = resultSvgItem.cloneNode(true);

  resultSvgItem.remove();

  const pathItems = [].slice.call(clonedSvgItem.querySelectorAll(`path`));

  const isLoseSvg = clonedSvgItem.classList.contains(`result__svg-anim--lose`);

  let animationDelay = 0;

  for (const pathItem of pathItems) {
    const pathLength = pathItem.getTotalLength();

    if (isLoseSvg) {
      pathItem.style.animationDelay = `${animationDelay}s`;
      animationDelay += ANIMATION_DELAY;
    }

    pathItem.appendChild(getStrokeAnimateTag(pathItem, pathLength));
  }

  resultTitleItem.appendChild(clonedSvgItem);
};

export default animateResultSvg;
