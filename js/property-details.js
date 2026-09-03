/* =========================================================
   PRIMENEST PROPERTY DETAILS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("PrimeNest Property Details JS loaded");


    /* =====================================================
       GET PROPERTY DATABASE
       ===================================================== */

    const properties = window.properties || [];


    console.log("Properties loaded:", properties);


    /* =====================================================
       GET PROPERTY ID FROM URL
       ===================================================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    const propertyId =
        Number(urlParams.get("id"));


    console.log("Property ID:", propertyId);


    /* =====================================================
       FIND PROPERTY
       ===================================================== */

    const property =
        properties.find(function (item) {
            return Number(item.id) === propertyId;
        });


    /* =====================================================
       CHECK PROPERTY
       ===================================================== */

    if (!property) {

        console.error(
            "PrimeNest: Property not found.",
            propertyId
        );


        const title =
            document.getElementById("title");

        if (title) {
            title.textContent =
                "Property Not Found";
        }


        const description =
            document.getElementById("description");

        if (description) {
            description.textContent =
                "Sorry, the property you are looking for could not be found.";
        }


        return;
    }


    console.log(
        "PrimeNest: Property found:",
        property
    );


    /* =====================================================
       PROPERTY INFORMATION
       ===================================================== */

    const title =
        document.getElementById("title");

    const location =
        document.getElementById("location");

    const price =
        document.getElementById("price");

    const type =
        document.getElementById("propertyType");

    const status =
        document.getElementById("status");

    const beds =
        document.getElementById("beds");

    const baths =
        document.getElementById("baths");

    const parking =
        document.getElementById("parking");

    const size =
        document.getElementById("size");

    const description =
        document.getElementById("description");

    const breadcrumbTitle =
        document.getElementById("breadcrumbTitle");


    /* =====================================================
       INSERT PROPERTY DATA
       ===================================================== */

    if (title) {
        title.textContent =
            property.title;
    }


    if (breadcrumbTitle) {
        breadcrumbTitle.textContent =
            property.title;
    }


    if (location) {

        location.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            ${property.location}
        `;

    }


    if (price) {
        price.textContent =
            property.priceText;
    }


    if (type) {
        type.textContent =
            property.type;
    }


    if (status) {

        status.textContent =
            property.status;

        status.className =
            "details-status";

        if (property.status === "For Rent") {
            status.classList.add("rent");
        }

        if (property.status === "Under Construction") {
            status.classList.add("construction");
        }

    }


    if (beds) {

        beds.textContent =
            property.beds > 0
                ? property.beds
                : "N/A";

    }


    if (baths) {

        baths.textContent =
            property.baths > 0
                ? property.baths
                : "N/A";

    }


    if (parking) {

        parking.textContent =
            property.parking > 0
                ? property.parking
                : "N/A";

    }


    if (size) {
        size.textContent =
            property.size;
    }


    if (description) {
        description.textContent =
            property.description;
    }


    /* =====================================================
       MAIN PROPERTY IMAGE
       ===================================================== */

    const mainImage =
        document.getElementById("mainImage");


    if (mainImage) {

        if (
            property.images &&
            property.images.length > 0
        ) {

            mainImage.src =
                property.images[0];

            mainImage.alt =
                property.title;

        }

        mainImage.onerror =
            function () {

                console.error(
                    "Image failed to load:",
                    this.src
                );

                this.onerror = null;

                this.src =
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85";

            };

    }


    /* =====================================================
       GALLERY THUMBNAILS
       ===================================================== */

    const thumbs =
        document.getElementById("thumbs");


    if (thumbs) {

        thumbs.innerHTML = "";


        if (
            property.images &&
            property.images.length > 0
        ) {

            property.images.forEach(
                function (image, index) {

                    const thumbnail =
                        document.createElement("img");


                    thumbnail.src =
                        image;


                    thumbnail.alt =
                        `${property.title} - Image ${index + 1}`;


                    thumbnail.loading =
                        "lazy";


                    thumbnail.classList.add(
                        "gallery-thumbnail"
                    );


                    if (index === 0) {

                        thumbnail.classList.add(
                            "active"
                        );

                    }


                    thumbnail.onerror =
                        function () {

                            this.onerror = null;

                            this.src =
                                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

                        };


                    thumbnail.addEventListener(
                        "click",
                        function () {

                            if (mainImage) {

                                mainImage.src =
                                    image;

                                mainImage.alt =
                                    `${property.title} - Image ${index + 1}`;

                            }


                            thumbs
                                .querySelectorAll(
                                    ".gallery-thumbnail"
                                )
                                .forEach(
                                    function (item) {

                                        item.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            thumbnail.classList.add(
                                "active"
                            );

                        }
                    );


                    thumbs.appendChild(
                        thumbnail
                    );

                }
            );

        }

    }


    /* =====================================================
       PROPERTY FEATURES
       ===================================================== */

    const features =
        document.getElementById("features");


    if (features) {

        features.innerHTML = "";


        if (
            property.features &&
            property.features.length > 0
        ) {

            property.features.forEach(
                function (feature) {

                    const featureItem =
                        document.createElement("div");


                    featureItem.className =
                        "feature-item";


                    featureItem.innerHTML = `
                        <i class="fa-solid fa-check"></i>
                        <span>${feature}</span>
                    `;


                    features.appendChild(
                        featureItem
                    );

                }
            );

        }

    }


    /* =====================================================
       LIGHTBOX
       ===================================================== */

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightboxImg");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    const openLightbox =
        document.getElementById("openLightbox");

    const closeLightbox =
        document.getElementById("closeLightbox");

    const previousButton =
        document.getElementById("prev");

    const nextButton =
        document.getElementById("next");


    let currentImageIndex = 0;


    function updateLightbox() {

        if (
            !property.images ||
            property.images.length === 0
        ) {
            return;
        }


        const image =
            property.images[currentImageIndex];


        if (lightboxImg) {

            lightboxImg.src =
                image;

            lightboxImg.alt =
                `${property.title} - Image ${currentImageIndex + 1}`;

        }


        if (lightboxCounter) {

            lightboxCounter.textContent =
                `${currentImageIndex + 1} / ${property.images.length}`;

        }

    }


    function showLightbox() {

        if (!lightbox) {
            return;
        }


        updateLightbox();


        lightbox.classList.add("active");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function hideLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (openLightbox) {

        openLightbox.addEventListener(
            "click",
            function () {

                currentImageIndex = 0;

                showLightbox();

            }
        );

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            hideLightbox
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                if (!property.images.length) {
                    return;
                }


                currentImageIndex--;

                if (
                    currentImageIndex < 0
                ) {

                    currentImageIndex =
                        property.images.length - 1;

                }


                updateLightbox();

            }
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                if (!property.images.length) {
                    return;
                }


                currentImageIndex++;

                if (
                    currentImageIndex >=
                    property.images.length
                ) {

                    currentImageIndex = 0;

                }


                updateLightbox();

            }
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    hideLightbox();

                }

            }
        );

    }


    /* =====================================================
       KEYBOARD LIGHTBOX CONTROLS
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                hideLightbox();

            }


            if (event.key === "ArrowLeft") {

                if (!property.images.length) {
                    return;
                }


                currentImageIndex--;


                if (
                    currentImageIndex < 0
                ) {

                    currentImageIndex =
                        property.images.length - 1;

                }


                updateLightbox();

            }


            if (event.key === "ArrowRight") {

                if (!property.images.length) {
                    return;
                }


                currentImageIndex++;


                if (
                    currentImageIndex >=
                    property.images.length
                ) {

                    currentImageIndex = 0;

                }


                updateLightbox();

            }

        }
    );


    /* =====================================================
       SHARE PROPERTY
       ===================================================== */

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
            async function () {

                const shareData = {

                    title:
                        property.title,

                    text:
                        `${property.title} - ${property.location}`,

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

                    } else {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );


                        if (shareMessage) {

                            shareMessage.textContent =
                                "Property link copied!";

                            setTimeout(
                                function () {

                                    shareMessage.textContent =
                                        "";

                                },
                                3000
                            );

                        }

                    }

                } catch (error) {

                    console.log(
                        "Share cancelled."
                    );

                }

            }
        );

    }


    /* =====================================================
       LEAFLET MAP
       ===================================================== */

    const mapElement =
        document.getElementById(
            "propertyMap"
        );


    if (
        mapElement &&
        typeof L !== "undefined" &&
        property.lat &&
        property.lng
    ) {

        const map =
            L.map(
                mapElement
            ).setView(
                [
                    property.lat,
                    property.lng
                ],
                13
            );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(map);


        L.marker([
            property.lat,
            property.lng
        ])
            .addTo(map)
            .bindPopup(
                `<strong>${property.title}</strong><br>${property.location}`
            )
            .openPopup();

    }


    console.log(
        "PrimeNest property details successfully rendered."
    );

});