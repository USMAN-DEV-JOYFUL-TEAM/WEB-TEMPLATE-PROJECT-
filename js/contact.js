/* =========================================================
   CONTACT FORM AND MAP
   ========================================================= */

const officeLat = 9.0579;
const officeLng = 7.4951;
const mapElement = document.getElementById("contactMap");

if (mapElement && window.L) {
  const map = L.map("contactMap").setView([officeLat, officeLng], 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const officeMarker = L.marker([officeLat, officeLng]).addTo(map);

  officeMarker
    .bindPopup(
      "<div><strong>PrimeNest</strong><br>Abuja, Nigeria<br><small>PrimeNest Office</small></div>",
    )
    .openPopup();

  const locateBtn = document.getElementById("locateBtn");

  if (locateBtn) {
    locateBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      locateBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Finding location...';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          map.setView([userLat, userLng], 13);

          L.circleMarker([userLat, userLng], { radius: 8 })
            .addTo(map)
            .bindPopup("Your current location")
            .openPopup();

          locateBtn.innerHTML =
            '<i class="fa-solid fa-location-crosshairs"></i> My Location';
        },
        () => {
          alert(
            "Unable to access your location. Please allow location access and try again.",
          );
          locateBtn.innerHTML =
            '<i class="fa-solid fa-location-crosshairs"></i> Find My Location';
        },
      );
    });
  }
}

const contactForm = document.querySelector(".contact-form form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const whatsappMessage = [
      "Hello PrimeNest,",
      "",
      `My name is ${name}.`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      `Message: ${message}`,
    ].join("\n");

    const whatsappURL =
      "https://wa.me/2349157968653?text=" + encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");
  });
}
