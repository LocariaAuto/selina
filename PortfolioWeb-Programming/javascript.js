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

// -----------------------------
// Smooth Scroll with Navbar Offset
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Get all anchor links in the navbar
    const navLinks = document.querySelectorAll('.NavBar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            
            const targetId = href.substring(1); // Remove the #
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate navbar height dynamically
                const navbar = document.querySelector('.NavBar ul');
                const navbarHeight = navbar ? navbar.offsetHeight + 20 : 80; // Add 20px extra padding
                
                // Get the target element's position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                // Calculate the scroll position with offset
                const offsetPosition = targetPosition - navbarHeight;
                
                // Smooth scroll to the calculated position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});