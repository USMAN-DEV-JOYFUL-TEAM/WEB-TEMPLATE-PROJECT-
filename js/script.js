/* =========================================================
   PRIMENEST HOME PAGE JAVASCRIPT
   ========================================================= */

/* =========================================================
   HERO SLIDER
   ========================================================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

let currentSlide = 0;

/* Show selected slide */
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

/* Next slide */
if (nextButton) {
  nextButton.addEventListener("click", () => {
    let nextSlide = currentSlide + 1;

    if (nextSlide >= slides.length) {
      nextSlide = 0;
    }

    showSlide(nextSlide);
  });
}

/* Previous slide */
if (prevButton) {
  prevButton.addEventListener("click", () => {
    let previousSlide = currentSlide - 1;

    if (previousSlide < 0) {
      previousSlide = slides.length - 1;
    }

    showSlide(previousSlide);
  });
}

/* Slider dots */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

/* =========================================================
   FEATURED PROPERTIES
   Pulls directly from property-data.js
   ========================================================= */

const featuredContainer = document.querySelector("#featured-properties");

/*
  Create one property card.
*/
function createFeaturedPropertyCard(property) {
  const card = document.createElement("article");

  card.className = "featured-property-card";

  /*
    We use the first image from the existing
    property-data.js object.
  */
  const image = property.images[0];

  card.innerHTML = `
    <div class="featured-property-image">


      <img
        src="${image}"
        alt="${property.title}"
      />


      <span class="property-status">
        ${property.status}
      </span>


    </div>




    <div class="featured-property-content">


      <span class="property-type">
        ${property.type}
      </span>


      <h3>
        ${property.title}
      </h3>


      <p class="property-location">
        <i class="fa-solid fa-location-dot"></i>
        ${property.location}
      </p>


      <div class="property-price">
        ${property.priceText}
      </div>




      <div class="property-meta">


        ${
          property.beds > 0
            ? `
              <span>
                <i class="fa-solid fa-bed"></i>
                ${property.beds} Beds
              </span>
            `
            : ""
        }


        ${
          property.baths > 0
            ? `
              <span>
                <i class="fa-solid fa-bath"></i>
                ${property.baths} Baths
              </span>
            `
            : ""
        }


        <span>
          <i class="fa-solid fa-ruler-combined"></i>
          ${property.size}
        </span>


      </div>




      <!--
        For the Home page, View Details takes the user
        to the main Properties page as requested.
      -->
      <a
        href="properties.html"
        class="property-details-button"
      >
        View Details
      </a>


    </div>
  `;

  return card;
}

/*
  Display the first six properties from the
  teammate's existing property database.
*/
function renderFeaturedProperties() {
  if (!featuredContainer) {
    return;
  }

  if (!window.properties || !Array.isArray(window.properties)) {
    console.error("PrimeNest property database was not found.");
    return;
  }

  const featuredProperties = window.properties.slice(0, 6);

  featuredContainer.innerHTML = "";

  featuredProperties.forEach((property) => {
    const card = createFeaturedPropertyCard(property);

    featuredContainer.appendChild(card);
  });
}

/* Render featured properties */
renderFeaturedProperties();

/* =========================================================
   VIDEO BUTTON
   ========================================================= */

/*
  At this stage the button is only the visual play button.


  When we get the actual video file/link, we can connect
  this button to the video player.
*/

const videoPlayButton = document.querySelector(".video-play");

if (videoPlayButton) {
  videoPlayButton.addEventListener("click", () => {
    console.log("PrimeNest video button clicked.");
  });
}
