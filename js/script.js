const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("#sidebar");

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
let currentSlide = 0;

// Function for showing a slide
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

// Previous Button slide
prevButton.addEventListener("click", () => {
  let previousslide = currentSlide - 1;

  if (previousslide < 0) {
    previousslide = slides.length - 1;
  }

  showSlide(previousslide);
});

// To make the dot active
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Open sidebar
menuBtn.addEventListener("click", () => {
  sidebar.style.right = "0";
});

// close sidebar
closeBtn.addEventListener("click", () => {
  sidebar.style.right = "-300px";
});

// Close sidebar when a link is clicked
const sidebarlinks = document.querySelectorAll(".sidebar a");

sidebarlinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.style.right = "-300px";
  });
});
