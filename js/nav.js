/* =========================================================
   PRIMENEST — SHARED MOBILE NAVIGATION
   Used on index.html and contact-us.html.
   (properties.html and property-details.html already run an
   identical copy of this logic inside properties.js /
   property-details.js, so this file is NOT included there —
   including it twice would bind the toggle handler twice.)
   ========================================================= */

function setupMobileNavigation() {

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        navigation.classList.toggle("open");

        const icon = menuButton.querySelector("i");

        if (!icon) {
            return;
        }

        if (navigation.classList.contains("open")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
        });
    });
}

document.addEventListener("DOMContentLoaded", setupMobileNavigation);