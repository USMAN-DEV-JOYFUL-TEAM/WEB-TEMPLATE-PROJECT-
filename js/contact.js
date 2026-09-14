/* =========================================================
   PRIMENEST — CONTACT FORM (WHATSAPP HAND-OFF)
   (Mobile navigation now lives in js/nav.js.)
   ========================================================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const whatsappMessage =
    "Hello PrimeNest, %0A%0A" +
    "My name is " +
    name +
    ".%0A" +
    "Email: " +
    email +
    "%0A" +
    "Subject: " +
    subject +
    "%0A" +
    "Message: " +
    message;

  const whatsappNumber = "2349157968653";

  const whatsappURL =
    "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;

  window.open(whatsappURL, "_blank");

  const formMessage = document.getElementById("formMessage");

  if (formMessage) {
    formMessage.textContent =
      "Thanks! We're opening WhatsApp so you can send your message.";
    formMessage.classList.add("success");
  }
});

// Pre-fill the subject field when arriving via a
// "List Your Property" / "?subject=" link elsewhere on the site
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const subjectParam = params.get("subject");
  const subjectField = document.getElementById("subject");

  if (subjectParam && subjectField) {
    subjectField.value = subjectParam;
  }
});