/* =========================================================
   PRIMENEST PROPERTIES PAGE
   ========================================================= */

/* Use the shared property database */
const properties = window.properties || [];


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

function handleImageError(img) {
    img.onerror = null;

    img.src =
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

    img.classList.add("image-fallback");
}


/* =========================================================
   PROPERTY CARD
   ========================================================= */

function createPropertyCard(property) {

    let statusClass = "";

    if (property.status === "For Rent") {
        statusClass = "rent";
    }

    if (property.status === "Under Construction") {
        statusClass = "construction";
    }

    const mainImage =
        property.images && property.images.length > 0
            ? property.images[0]
            : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";


    return `
        <article class="property-card">

            <div class="property-image">

                <img
                    src="${mainImage}"
                    alt="${property.title}"
                    loading="lazy"
                    onerror="handleImageError(this)"
                >

                <span class="property-badge">
                    ${property.type}
                </span>

                <span class="property-status ${statusClass}">
                    ${property.status}
                </span>

            </div>


            <div class="property-content">

                <div class="property-type">
                    ${property.type}
                </div>

                <h3 class="property-title">
                    ${property.title}
                </h3>


                <div class="property-location">

                    <i class="fa-solid fa-location-dot"></i>

                    <span>
                        ${property.location}
                    </span>

                </div>


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


                    ${
                        property.parking > 0
                            ? `
                                <span>
                                    <i class="fa-solid fa-car"></i>
                                    ${property.parking} Parking
                                </span>
                            `
                            : ""
                    }


                    <span>
                        <i class="fa-solid fa-ruler-combined"></i>
                        ${property.size}
                    </span>

                </div>


                <a
                    href="property-details.html?id=${encodeURIComponent(property.id)}"
                    class="btn btn-dark"
                >
                    View Details

                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER PROPERTIES
   ========================================================= */

function renderProperties(list) {

    const grid =
        document.getElementById("propertyGrid");

    const emptyState =
        document.getElementById("emptyState");

    const propertyCount =
        document.getElementById("propertyCount");


    if (!grid) {
        return;
    }


    if (propertyCount) {
        propertyCount.textContent = list.length;
    }


    if (list.length === 0) {

        grid.innerHTML = "";

        if (emptyState) {
            emptyState.hidden = false;
        }

        return;
    }


    if (emptyState) {
        emptyState.hidden = true;
    }


    grid.innerHTML =
        list.map(createPropertyCard).join("");
}


/* =========================================================
   FILTER PROPERTIES
   ========================================================= */

function filterProperties() {

    const location =
        document
            .getElementById("filterLocation")
            ?.value
            .trim()
            .toLowerCase() || "";


    const type =
        document
            .getElementById("filterType")
            ?.value || "";


    const status =
        document
            .getElementById("filterStatus")
            ?.value || "";


    const minimumPrice =
        Number(
            document
                .getElementById("minPrice")
                ?.value
        ) || 0;


    const maximumInput =
        document
            .getElementById("maxPrice")
            ?.value;


    const maximumPrice =
        maximumInput === "" ||
        maximumInput === undefined
            ? Infinity
            : Number(maximumInput);


    const minimumBeds =
        Number(
            document
                .getElementById("filterBeds")
                ?.value
        ) || 0;


    const filtered =
        properties.filter(property => {

            const matchesLocation =
                !location ||
                property.location
                    .toLowerCase()
                    .includes(location) ||
                property.city
                    .toLowerCase()
                    .includes(location);


            const matchesType =
                !type ||
                property.type === type;


            const matchesStatus =
                !status ||
                property.status === status;


            const matchesMinimumPrice =
                property.price >= minimumPrice;


            const matchesMaximumPrice =
                property.price <= maximumPrice;


            const matchesBedrooms =
                property.beds >= minimumBeds;


            return (
                matchesLocation &&
                matchesType &&
                matchesStatus &&
                matchesMinimumPrice &&
                matchesMaximumPrice &&
                matchesBedrooms
            );

        });


    applySorting(filtered);
}


/* =========================================================
   SORT PROPERTIES
   ========================================================= */

function applySorting(list) {

    const sort =
        document
            .getElementById("sortProperties")
            ?.value || "default";


    const sortedList = [...list];


    if (sort === "price-low") {

        sortedList.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sort === "price-high") {

        sortedList.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sort === "newest") {

        sortedList.sort(
            (a, b) => b.id - a.id
        );

    }


    renderProperties(sortedList);
}


/* =========================================================
   RESET FILTERS
   ========================================================= */

function resetFilters() {

    const form =
        document.getElementById("filterForm");


    if (form) {
        form.reset();
    }


    const sort =
        document.getElementById("sortProperties");


    if (sort) {
        sort.value = "default";
    }


    renderProperties(properties);
}


/* =========================================================
   URL FILTER SUPPORT
   ========================================================= */

function readURLFilters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const location =
        params.get("location");

    const type =
        params.get("type");

    const status =
        params.get("status");


    if (location) {

        const locationInput =
            document.getElementById("filterLocation");

        if (locationInput) {
            locationInput.value = location;
        }

    }


    if (type) {

        const typeInput =
            document.getElementById("filterType");

        if (typeInput) {

            const matchingOption =
                [...typeInput.options].find(
                    option =>
                        option.value.toLowerCase() ===
                        type.toLowerCase()
                );


            if (matchingOption) {
                typeInput.value =
                    matchingOption.value;
            }

        }

    }


    if (status) {

        const statusInput =
            document.getElementById("filterStatus");

        if (statusInput) {

            const matchingOption =
                [...statusInput.options].find(
                    option =>
                        option.value.toLowerCase() ===
                        status.toLowerCase()
                );


            if (matchingOption) {
                statusInput.value =
                    matchingOption.value;
            }

        }

    }
}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function setupMobileNavigation() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navigation =
        document.querySelector(".nav-links");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.addEventListener(
        "click",
        () => {

            navigation.classList.toggle("open");

            const icon =
                menuButton.querySelector("i");


            if (!icon) {
                return;
            }


            if (
                navigation.classList.contains("open")
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
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const propertyGrid =
            document.getElementById(
                "propertyGrid"
            );


        if (!propertyGrid) {
            return;
        }


        setupMobileNavigation();

        readURLFilters();

        renderProperties(properties);


        const filterForm =
            document.getElementById(
                "filterForm"
            );


        if (filterForm) {

            filterForm.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                    filterProperties();

                }
            );

        }


        const resetButton =
            document.getElementById(
                "resetFilters"
            );


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                resetFilters
            );

        }


        const emptyReset =
            document.getElementById(
                "emptyReset"
            );


        if (emptyReset) {

            emptyReset.addEventListener(
                "click",
                resetFilters
            );

        }


        const sortSelect =
            document.getElementById(
                "sortProperties"
            );


        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                filterProperties
            );

        }


        const urlParams =
            new URLSearchParams(
                window.location.search
            );


        if (
            urlParams.has("location") ||
            urlParams.has("type") ||
            urlParams.has("status")
        ) {

            filterProperties();

        }

    }
);