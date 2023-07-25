const slider = document.querySelector(".slider");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

let slideIndex = 0;
const slideWidth = 320;

arrowLeft.addEventListener("click", () => {
  slideIndex = Math.max(slideIndex - 1, 0);
  updateSliderPosition1();
});

arrowRight.addEventListener("click", () => {
  slideIndex = Math.min(slideIndex + 1, slider.childElementCount - 3);
  updateSliderPosition1();
});

function updateSliderPosition1() {
  const offset = -slideIndex * slideWidth;
  slider.style.transform = `translateX(${offset}px)`;
}

/*--------------------------------------------------------------------------------------------------------------------------------------*/

const slider2 = document.querySelector(".slider2");
const arrowLeft2 = document.querySelector(".arrow-left2");
const arrowRight2 = document.querySelector(".arrow-right2");

let slideIndex2 = 0;
const slideWidth2 = 320;

arrowLeft2.addEventListener("click", () => {
  slideIndex2 = Math.max(slideIndex2 - 1, 0);
  updateSliderPosition2();
});

arrowRight2.addEventListener("click", () => {
  slideIndex2 = Math.min(slideIndex2 + 1, slider2.childElementCount - 3);
  updateSliderPosition2();
});

function updateSliderPosition2() {
  const offset = -slideIndex2 * slideWidth2;
  slider2.style.transform = `translateX(${offset}px)`;
}

/*--------------------------------------------------------------------------------------------------------------------------------------*/

const slider3 = document.querySelector(".slider3");
const arrowLeft3 = document.querySelector(".arrow-left3");
const arrowRight3 = document.querySelector(".arrow-right3");

let slideIndex3 = 0;
const slideWidth3 = 320;

arrowLeft3.addEventListener("click", () => {
  slideIndex3 = Math.max(slideIndex3 - 1, 0);
  updateSliderPosition3();
});

arrowRight3.addEventListener("click", () => {
  slideIndex3 = Math.min(slideIndex3 + 1, slider3.childElementCount - 3);
  updateSliderPosition3();
});

function updateSliderPosition3() {
  const offset = -slideIndex3 * slideWidth3;
  slider3.style.transform = `translateX(${offset}px)`;
}