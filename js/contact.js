const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("show");
});

const menuLinks = mobileMenu.querySelectorAll("a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});

// Addded Whatsapp function
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the user informations from the field
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
});
