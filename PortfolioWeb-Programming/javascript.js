// Theme Toggle (Light / Dark)  
const themeBtn = document.getElementById('themeBtn');
const root = document.documentElement;

// Load saved theme from localStorage (if any)
let currentTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-bs-theme', currentTheme);
updateThemeButton();

// Function to toggle theme
themeBtn.addEventListener('click', () => {
  currentTheme = (root.getAttribute('data-bs-theme') === 'light') ? 'dark' : 'light';
  root.setAttribute('data-bs-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeButton();
});

function updateThemeButton() {
  if (root.getAttribute('data-bs-theme') === 'dark') {
    themeBtn.textContent = 'Light Mode';
    themeBtn.classList.remove('btn-outline-dark');
    themeBtn.classList.add('btn-outline-light');
  } else {
    themeBtn.textContent = 'Dark Mode';
    themeBtn.classList.remove('btn-outline-light');
    themeBtn.classList.add('btn-outline-dark');
  }
}

// -----------------------------
// Toast-Benachrichtigung
// -----------------------------
function showToast(message, type) {
    const toast = document.getElementById('notificationToast');
    const messageSpan = document.getElementById('toastMessage');

    messageSpan.innerText = message;
    toast.className = 'notification-toast show ' + type;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.className = 'notification-toast';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 500);
    }, 4000);
}

// -----------------------------
// Custom Inline Error Box
// -----------------------------
function showError(inputElement, message) {
    const box = document.getElementById("customError");
    box.innerText = message;

    const containerRect = document.querySelector(".form-container").getBoundingClientRect();
    const inputRect = inputElement.getBoundingClientRect();

    // Align error box under the input inside the centered form container
    box.style.left = (inputRect.left - containerRect.left) + "px";
    box.style.top = (inputRect.bottom - containerRect.top + 8) + "px";

    box.style.display = "block";
}

// -----------------------------
// Email Validation Helper
// -----------------------------
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// -----------------------------
// Main Form Validation
// -----------------------------
function validateForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const errorBox = document.getElementById("customError");

    
    errorBox.style.display = "none";

    // Namensfeld-Kontrolle
    if (name.value.trim() === "") {
        showError(name, "Bitte füllen Sie das Namensfeld aus.");
        return false;
    }

    // Emailfeld-Kontrolle
    if (email.value.trim() === "") {
        showError(email, "Bitte geben Sie eine gültige Email ein.");
        return false;
    }

    // Emailformat-Kontrolle
    if (!isValidEmail(email.value.trim())) {
        showError(email, "Die eingegebene E-Mail-Adresse ist ungültig!");
        return false;
    }

    // Nachrichtenfeld-Kontrolle
    if (message.value.trim() === "") {
        showError(message, "Bitte geben Sie eine Nachricht ein.");
        return false;
    }

    // Toast zum Erfolg
    showToast("Anfrage erfolgreich gesendet. (Demo)", "success");

    // Reset-Funktion
    document.getElementById("Kontakt").reset();

    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const fields = [
        { id: "name", message: "Bitte geben Sie Ihren Namen ein." },
        { id: "email", message: "Bitte geben Sie Ihre E-Mail ein." },
        { id: "message", message: "Bitte geben Sie eine Nachricht ein." }
    ];

    // Create error elements dynamically if missing
    fields.forEach(f => {
        const input = document.getElementById(f.id);
        if (!input) return;

        // Check if error div already exists
        if (!input.parentElement.querySelector(".custom-error")) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("custom-error");
            errorDiv.textContent = f.message;
            input.parentElement.appendChild(errorDiv);
        }

        // Hide error when typing
        input.addEventListener("input", () => {
            hideError(input);
        });
    });

    // Handle form submit
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Always prevent default to handle everything in JavaScript
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            let valid = true;

            // Hide previous errors
            fields.forEach(f => {
                const input = document.getElementById(f.id);
                if (input) {
                    hideError(input);
                }
            });

            // Validate name
            if (!name || name.value.trim() === "") {
                const nameError = name.parentElement.querySelector(".custom-error");
                if (nameError) {
                    nameError.textContent = "Bitte geben Sie Ihren Namen ein.";
                    showError(name);
                }
                valid = false;
            }

            // Validate email (empty check)
            if (!email || email.value.trim() === "") {
                const emailError = email.parentElement.querySelector(".custom-error");
                if (emailError) {
                    emailError.textContent = "Bitte geben Sie Ihre E-Mail ein.";
                    showError(email);
                }
                valid = false;
            } 
            // Validate email format
            else if (!isValidEmail(email.value.trim())) {
                const emailError = email.parentElement.querySelector(".custom-error");
                if (emailError) {
                    emailError.textContent = "Die eingegebene E-Mail-Adresse ist ungültig!";
                    showError(email);
                }
                valid = false;
            }

            // Validate message
            if (!message || message.value.trim() === "") {
                const messageError = message.parentElement.querySelector(".custom-error");
                if (messageError) {
                    messageError.textContent = "Bitte geben Sie eine Nachricht ein.";
                    showError(message);
                }
                valid = false;
            }

            // If all valid, show success toast and reset form
            if (valid) {
                showToast("Anfrage erfolgreich gesendet. (Demo)", "success");
                form.reset();
            }
        });
    }
});


// --- Helper: Show and hide error messages ---

function showError(input) {
    const errorDiv = input.parentElement.querySelector(".custom-error");
    if (!errorDiv) return;

    errorDiv.style.display = "block";
}

function hideError(input) {
    const errorDiv = input.parentElement.querySelector(".custom-error");
    if (!errorDiv) return;

    errorDiv.style.display = "none";
}


console.log("script.js loaded successfully");

const langBtn = document.getElementById("langBtn");
let currentLang = "de"; // default language

langBtn.addEventListener("click", () => {
    if (currentLang === "de") {
        document.querySelectorAll(".lang-de").forEach(el => el.style.display = "none");
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "inline");
        langBtn.textContent = "DE";
        currentLang = "en";
    } else {
        document.querySelectorAll(".lang-de").forEach(el => el.style.display = "inline");
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
        langBtn.textContent = "EN";
        currentLang = "de";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("langBtn");
    let currentLang = "de";
    langBtn.addEventListener("click", () => {
        if (currentLang === "de") {
            document.querySelectorAll(".lang-de").forEach(el => el.style.display = "none");
            document.querySelectorAll(".lang-en").forEach(el => el.style.display = "inline");
            langBtn.textContent = "DE";
            currentLang = "en";
        } else {
            document.querySelectorAll(".lang-de").forEach(el => el.style.display = "inline");
            document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
            langBtn.textContent = "EN";
            currentLang = "de";
        }
    });
});
// --- Working Smooth Scroll ---
const navLinks = document.querySelectorAll('.NavBar a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navbarHeight = document.querySelector('.NavBar ul').offsetHeight + 20;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});


const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
    // Toggle the dark-mode class on <html> or <body>
    document.documentElement.classList.toggle('dark-mode');

    // Change the button text accordingly
    if (document.documentElement.classList.contains('dark-mode')) {
    themeButton.textContent = 'Light Mode';
    } else {
    themeButton.textContent = 'Dark Mode';
    }
});
