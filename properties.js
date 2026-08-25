
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}



const properties = [
    {
        name: "Luxury Apartment in Maitama",
        type: "Apartment",
        location: "Maitama, Abuja",
        city: "abuja",
        status: "available",
        price: "₦185,000,000",
        lat: 9.0830,
        lng: 7.4951
    },

    {
        name: "Modern Apartment in Lekki",
        type: "Apartment",
        location: "Lekki Phase 1, Lagos",
        city: "lagos",
        status: "available",
        price: "₦220,000,000",
        lat: 6.4474,
        lng: 3.4722
    },

    {
        name: "Luxury Hotel in Wuse",
        type: "Hotel",
        location: "Wuse 2, Abuja",
        city: "abuja",
        status: "available",
        price: "₦850,000,000",
        lat: 9.0750,
        lng: 7.4898
    },

    {
        name: "Residential Land in Lugbe",
        type: "Land",
        location: "Lugbe, Abuja",
        city: "abuja",
        status: "available",
        price: "₦45,000,000",
        lat: 8.9940,
        lng: 7.3697
    },

    {
        name: "Greenview Residential Estate",
        type: "Estate",
        location: "Sangotedo, Lagos",
        city: "lagos",
        status: "construction",
        price: "₦95,000,000",
        lat: 6.4698,
        lng: 3.5910
    },

    {
        name: "Premium Apartment",
        type: "Apartment",
        location: "GRA Phase 2, Port Harcourt",
        city: "port-harcourt",
        status: "available",
        price: "₦7,500,000/year",
        lat: 4.8242,
        lng: 7.0336
    },

    {
        name: "Residential Land",
        type: "Land",
        location: "Ibadan, Oyo State",
        city: "ibadan",
        status: "available",
        price: "₦18,000,000",
        lat: 7.3775,
        lng: 3.9470
    },

    {
        name: "Royal Gardens Estate",
        type: "Estate",
        location: "Enugu, Enugu State",
        city: "enugu",
        status: "construction",
        price: "₦75,000,000",
        lat: 6.5244,
        lng: 7.5100
    }
];

const map = L.map("propertyMap").setView(
    [9.0820, 8.6753],
    6
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }
).addTo(map);


const markers = [];


properties.forEach((property, index) => {

    const marker = L.marker([
        property.lat,
        property.lng
    ]).addTo(map);


    marker.bindPopup(`
        <div class="map-popup">

            <h4>${property.name}</h4>

            <p>
                <i class="fa-solid fa-location-dot"></i>
                ${property.location}
            </p>

            <p>
                Property Type: ${property.type}
            </p>

            <div class="popup-price">
                ${property.price}
            </div>

        </div>
    `);


    markers.push({
        marker: marker,
        property: property
    });

});


const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const statusFilter = document.getElementById("statusFilter");

const propertyCards =
    document.querySelectorAll(".property-card");

const propertyCount =
    document.getElementById("propertyCount");


function filterProperties() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedLocation =
        locationFilter.value;

    const selectedType =
        typeFilter.value;

    const selectedStatus =
        statusFilter.value;


    let visibleCount = 0;


    propertyCards.forEach((card, index) => {

        const name =
            card.dataset.name.toLowerCase();

        const type =
            card.dataset.type;

        const location =
            card.dataset.location;

        const status =
            card.dataset.status;


        const matchesSearch =
            name.includes(searchValue);

        const matchesLocation =
            selectedLocation === "all" ||
            location === selectedLocation;

        const matchesType =
            selectedType === "all" ||
            type === selectedType;

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        const matches =
            matchesSearch &&
            matchesLocation &&
            matchesType &&
            matchesStatus;


        if (matches) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    propertyCount.textContent =
        visibleCount;


    updateMap(
        searchValue,
        selectedLocation,
        selectedType,
        selectedStatus
    );


    showNoResults(visibleCount);

}


function updateMap(
    searchValue,
    selectedLocation,
    selectedType,
    selectedStatus
) {

    markers.forEach(item => {

        const property =
            item.property;


        const matchesSearch =
            property.name
                .toLowerCase()
                .includes(searchValue);


        const matchesLocation =
            selectedLocation === "all" ||
            property.city === selectedLocation;


        const matchesType =
            selectedType === "all" ||
            property.type.toLowerCase() === selectedType;


        const matchesStatus =
            selectedStatus === "all" ||
            property.status === selectedStatus;


        const matches =
            matchesSearch &&
            matchesLocation &&
            matchesType &&
            matchesStatus;


        if (matches) {

            item.marker.addTo(map);

        } else {

            map.removeLayer(item.marker);

        }

    });

}



function showNoResults(count) {

    const existing =
        document.querySelector(".no-results");

    if (existing) {
        existing.remove();
    }


    if (count === 0) {

        const message =
            document.createElement("div");

        message.className =
            "no-results";

        message.innerHTML = `
            <i class="fa-solid fa-house-circle-xmark"></i>

            <h3>No Properties Found</h3>

            <p>
                Try changing your search or filter options.
            </p>
        `;

        document
            .getElementById("propertyGrid")
            .appendChild(message);

    }

}


searchInput.addEventListener(
    "input",
    filterProperties
);

locationFilter.addEventListener(
    "change",
    filterProperties
);

typeFilter.addEventListener(
    "change",
    filterProperties
);

statusFilter.addEventListener(
    "change",
    filterProperties
);


document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        filterProperties
    );


document
    .querySelectorAll(".favorite-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                this.classList.toggle("active");

                const icon =
                    this.querySelector("i");


                if (
                    this.classList.contains("active")
                ) {

                    icon.classList.remove(
                        "fa-regular"
                    );

                    icon.classList.add(
                        "fa-solid"
                    );

                } else {

                    icon.classList.remove(
                        "fa-solid"
                    );

                    icon.classList.add(
                        "fa-regular"
                    );

                }

            }
        );

    });


const locateBtn =
    document.getElementById("locateBtn");


locateBtn.addEventListener(
    "click",
    () => {

        if (!navigator.geolocation) {

            alert(
                "Geolocation is not supported by your browser."
            );

            return;
        }


        navigator.geolocation.getCurrentPosition(
            position => {

                const lat =
                    position.coords.latitude;

                const lng =
                    position.coords.longitude;


                map.setView(
                    [lat, lng],
                    12
                );


                L.circleMarker(
                    [lat, lng],
                    {
                        radius: 8
                    }
                )
                .addTo(map)
                .bindPopup(
                    "You are here"
                )
                .openPopup();

            },

            () => {

                alert(
                    "Unable to access your location."
                );

            }

        );

    }
);


propertyCards.forEach(
    (card, index) => {

        card.addEventListener(
            "mouseenter",
            () => {

                const property =
                    properties[index];


                map.setView(
                    [
                        property.lat,
                        property.lng
                    ],
                    13,
                    {
                        animate: true
                    }
                );


                markers[index]
                    .marker
                    .openPopup();

            }
        );

    }
);


propertyCount.textContent =
    properties.length;