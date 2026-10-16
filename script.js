
// Theme toggle: remember the user's choice.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

// Restore the saved theme or use the device preference.
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("portfolio-theme");
} catch {
  // Continue without saved preferences if storage is unavailable.
}

const prefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

updateTheme(savedTheme ? savedTheme === "dark" : prefersDark);

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  updateTheme(isDark);

  try {
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  } catch {
    // The theme still works for the current page.
  }
});

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close the menu after selecting a section.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Validate the contact form in the browser.
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name.length < 2 || message.length < 10) {
    formNote.textContent =
      "Please enter a valid name and a message of at least 10 characters.";
    return;
  }

  // The browser checks email syntax through type="email".
  if (!email) {
    formNote.textContent = "Please enter your email address.";
    return;
  }

  alert(`Thanks, ${name}! Your form passed validation.`);

  formNote.textContent =
    "Validation successful. This demo has not sent or saved your message.";

  contactForm.reset();
});
