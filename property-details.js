/* =========================================================
   PRIMENEST - PROPERTY DETAILS
   ========================================================= */


/* =========================================================
   GET PROPERTY ID
   ========================================================= */

const propertyParams =
    new URLSearchParams(
        window.location.search
    );


const propertyId =
    Number(
        propertyParams.get("id")
    ) || 1;


/* =========================================================
   FIND PROPERTY
   ========================================================= */

const selectedProperty =
    properties.find(
        property => property.id === propertyId
    ) || properties[0];


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const titleElement =
    document.getElementById("title");

const breadcrumbTitle =
    document.getElementById(
        "breadcrumbTitle"
    );

const propertyTypeElement =
    document.getElementById(
        "propertyType"
    );

const statusElement =
    document.getElementById("status");

const locationElement =
    document.getElementById("location");

const priceElement =
    document.getElementById("price");

const bedsElement =
    document.getElementById("beds");

const bathsElement =
    document.getElementById("baths");

const parkingElement =
    document.getElementById("parking");

const sizeElement =
    document.getElementById("size");

const descriptionElement =
    document.getElementById(
        "description"
    );

const featuresElement =
    document.getElementById(
        "features"
    );

const mainImage =
    document.getElementById(
        "mainImage"
    );

const thumbnailsContainer =
    document.getElementById(
        "thumbs"
    );


/* =========================================================
   UPDATE PAGE TITLE
   ========================================================= */

document.title =
    `${selectedProperty.title} | PrimeNest`;


/* =========================================================
   LOAD PROPERTY INFORMATION
   ========================================================= */

function loadPropertyDetails() {

    if (!selectedProperty) {
        return;
    }


    /* Title */

    if (titleElement) {

        titleElement.textContent =
            selectedProperty.title;

    }


    /* Breadcrumb */

    if (breadcrumbTitle) {

        breadcrumbTitle.textContent =
            selectedProperty.title;

    }


    /* Property Type */

    if (propertyTypeElement) {

        propertyTypeElement.textContent =
            selectedProperty.type;

    }


    /* Status */

    if (statusElement) {

        statusElement.textContent =
            selectedProperty.status;


        statusElement.classList.remove(
            "rent",
            "construction"
        );


        if (
            selectedProperty.status ===
            "For Rent"
        ) {

            statusElement.classList.add(
                "rent"
            );

        }


        if (
            selectedProperty.status ===
            "Under Construction"
        ) {

            statusElement.classList.add(
                "construction"
            );

        }

    }


    /* Location */

    if (locationElement) {

        locationElement.innerHTML = `

            <i class="fa-solid fa-location-dot"></i>

            <span>
                ${selectedProperty.location},
                Nigeria
            </span>

        `;

    }


    /* Price */

    if (priceElement) {

        priceElement.textContent =
            selectedProperty.priceText;

    }


    /* Bedrooms */

    if (bedsElement) {

        bedsElement.textContent =
            selectedProperty.beds > 0
                ? selectedProperty.beds
                : "—";

    }


    /* Bathrooms */

    if (bathsElement) {

        bathsElement.textContent =
            selectedProperty.baths > 0
                ? selectedProperty.baths
                : "—";

    }


    /* Parking */

    if (parkingElement) {

        parkingElement.textContent =
            selectedProperty.parking > 0
                ? selectedProperty.parking
                : "—";

    }


    /* Size */

    if (sizeElement) {

        sizeElement.textContent =
            selectedProperty.size;

    }


    /* Description */

    if (descriptionElement) {

        descriptionElement.textContent =
            selectedProperty.description;

    }


    /* Features */

    renderFeatures();


    /* Gallery */

    renderGallery();

}


/* =========================================================
   RENDER FEATURES
   ========================================================= */

function renderFeatures() {

    if (!featuresElement) {
        return;
    }


    featuresElement.innerHTML =
        selectedProperty.features
            .map(
                feature => `

                    <div class="detail-feature">

                        <i class="fa-solid fa-circle-check"></i>

                        <span>
                            ${feature}
                        </span>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   GALLERY STATE
   ========================================================= */

let currentImageIndex = 0;


/* =========================================================
   RENDER GALLERY
   ========================================================= */

function renderGallery() {

    if (
        !mainImage ||
        !thumbnailsContainer
    ) {
        return;
    }


    const images =
        selectedProperty.images;


    if (!images || images.length === 0) {
        return;
    }


    currentImageIndex = 0;


    mainImage.src =
        images[0];

    mainImage.alt =
        selectedProperty.title;


    thumbnailsContainer.innerHTML =
        images
            .map(
                (image, index) => `

                    <button
                        type="button"
                        class="gallery-thumb ${
                            index === 0
                                ? "active"
                                : ""
                        }"
                        data-index="${index}"
                        aria-label="View image ${index + 1}"
                    >

                        <img
                            src="${image}"
                            alt="${selectedProperty.title} image ${index + 1}"
                            loading="lazy"
                        >

                    </button>

                `
            )
            .join("");


    thumbnailsContainer
        .querySelectorAll(".gallery-thumb")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    showImage(index);

                }
            );

        });

}


/* =========================================================
   SHOW IMAGE
   ========================================================= */

function showImage(index) {

    const images =
        selectedProperty.images;


    if (!images || images.length === 0) {
        return;
    }


    currentImageIndex =
        (
            index + images.length
        ) % images.length;


    mainImage.src =
        images[currentImageIndex];


    mainImage.alt =
        `${selectedProperty.title} image ${currentImageIndex + 1}`;


    thumbnailsContainer
        .querySelectorAll(".gallery-thumb")
        .forEach(
            (button, buttonIndex) => {

                button.classList.toggle(
                    "active",
                    buttonIndex ===
                    currentImageIndex
                );

            }
        );


    updateLightboxImage();

}


/* =========================================================
   LIGHTBOX
   ========================================================= */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImg"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );

const openLightbox =
    document.getElementById(
        "openLightbox"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );

const previousButton =
    document.getElementById(
        "prev"
    );

const nextButton =
    document.getElementById(
        "next"
    );


/* =========================================================
   UPDATE LIGHTBOX
   ========================================================= */

function updateLightboxImage() {

    if (!lightboxImage) {
        return;
    }


    const images =
        selectedProperty.images;


    lightboxImage.src =
        images[currentImageIndex];


    lightboxImage.alt =
        `${selectedProperty.title} image ${currentImageIndex + 1}`;


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentImageIndex + 1} / ${images.length}`;

    }

}


/* =========================================================
   OPEN LIGHTBOX
   ========================================================= */

function openGallery() {

    if (!lightbox) {
        return;
    }


    updateLightboxImage();


    lightbox.classList.add(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE LIGHTBOX
   ========================================================= */

function closeGallery() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* =========================================================
   NEXT IMAGE
   ========================================================= */

function nextImage() {

    showImage(
        currentImageIndex + 1
    );

}


/* =========================================================
   PREVIOUS IMAGE
   ========================================================= */

function previousImage() {

    showImage(
        currentImageIndex - 1
    );

}


/* =========================================================
   LIGHTBOX EVENTS
   ========================================================= */

if (openLightbox) {

    openLightbox.addEventListener(
        "click",
        openGallery
    );

}


if (closeLightbox) {

    closeLightbox.addEventListener(
        "click",
        closeGallery
    );

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextImage
    );

}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousImage
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeGallery();

            }

        }
    );

}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList.contains(
                "open"
            )
        ) {
            return;
        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGallery();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousImage();

        }

    }
);


/* =========================================================
   SHARE PROPERTY
   ========================================================= */

const shareButton =
    document.getElementById(
        "shareProperty"
    );

const shareMessage =
    document.getElementById(
        "shareMessage"
    );


if (shareButton) {

    shareButton.addEventListener(
        "click",
        async () => {

            const shareData = {

                title:
                    selectedProperty.title,

                text:
                    `Check out this property on PrimeNest: ${selectedProperty.title}`,

                url:
                    window.location.href

            };


            try {

                if (
                    navigator.share
                ) {

                    await navigator.share(
                        shareData
                    );

                    if (shareMessage) {

                        shareMessage.textContent =
                            "Property shared successfully.";

                    }

                } else {

                    await navigator.clipboard.writeText(
                        window.location.href
                    );


                    if (shareMessage) {

                        shareMessage.textContent =
                            "Property link copied to clipboard.";

                    }

                }

            } catch (error) {

                if (
                    error.name !==
                    "AbortError"
                ) {

                    if (shareMessage) {

                        shareMessage.textContent =
                            "Unable to share this property.";

                    }

                }

            }


            setTimeout(
                () => {

                    if (shareMessage) {
                        shareMessage.textContent =
                            "";
                    }

                },
                3500
            );

        }
    );

}


/* =========================================================
   PROPERTY MAP
   ========================================================= */

function initializeMap() {

    const mapElement =
        document.getElementById(
            "propertyMap"
        );


    if (
        !mapElement ||
        typeof L === "undefined"
    ) {
        return;
    }


    const latitude =
        selectedProperty.lat;

    const longitude =
        selectedProperty.lng;


    const map =
        L.map(
            mapElement
        ).setView(
            [
                latitude,
                longitude
            ],
            14
        );


    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                "&copy; OpenStreetMap contributors",

            maxZoom: 19
        }
    ).addTo(map);


    const marker =
        L.marker(
            [
                latitude,
                longitude
            ]
        ).addTo(map);


    marker.bindPopup(`

        <div style="min-width:180px">

            <strong>
                ${selectedProperty.title}
            </strong>

            <br>

            <span>
                ${selectedProperty.location}
            </span>

        </div>

    `);


    marker.openPopup();


    /*
     * Leaflet sometimes calculates the map size
     * incorrectly when loaded inside a responsive
     * layout. invalidateSize() fixes that.
     */

    setTimeout(
        () => {
            map.invalidateSize();
        },
        300
    );

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {

    const menuButton =
        document.querySelector(
            ".menu-toggle"
        );

    const navigation =
        document.querySelector(
            ".nav-links"
        );


    if (
        !menuButton ||
        !navigation
    ) {
        return;
    }


    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle(
                "open"
            );


            const icon =
                menuButton.querySelector(
                    "i"
                );


            if (
                navigation.classList.contains(
                    "open"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   INITIALIZE PAGE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPropertyDetails();

        setupMobileNavigation();

        initializeMap();

    }
);