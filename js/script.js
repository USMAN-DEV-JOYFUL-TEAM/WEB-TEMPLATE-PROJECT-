/* =========================================================
   PRIMENEST — HOME PAGE HERO SLIDER
   (Mobile navigation now lives in js/nav.js, shared with
   contact-us.html — see index.html script order.)
   ========================================================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
let currentSlide = 0;

// Show a given slide by index
function showSlide(index) {
  if (index < 0 || index >= slides.length) {
    return;
  }

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");
  dots[index].classList.add("active");

  currentSlide = index;
}

// Next button listener
nextButton.addEventListener("click", () => {
  let nextslide = currentSlide + 1;

  if (nextslide >= slides.length) {
    nextslide = 0;
  }
  showSlide(nextslide);
});

// Previous button listener
prevButton.addEventListener("click", () => {
  let previousslide = currentSlide - 1;

  if (previousslide < 0) {
    previousslide = slides.length - 1;
  }

  showSlide(previousslide);
});

// Dots clickable
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Auto-advance the slider, matching TemplateMo's auto-rotating banner
setInterval(() => {
  let nextslide = currentSlide + 1;

  if (nextslide >= slides.length) {
    nextslide = 0;
  }

  showSlide(nextslide);
}, 6000);