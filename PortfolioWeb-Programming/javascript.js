// -----------------------------
// MAIN DOM CONTENT LOADED
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // DARK / LIGHT THEME TOGGLE
    // -----------------------------
    const themeButton = document.getElementById("theme-button");
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        root.classList.add("dark-mode");
        themeButton.textContent = "Light Mode";
    } else {
        themeButton.textContent = "Dark Mode";
    }

    themeButton.addEventListener("click", () => {
        root.classList.toggle("dark-mode");
        const isDark = root.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
    });


    // -----------------------------
    // LANGUAGE TOGGLE (DE / EN)
    // -----------------------------
    const langBtn = document.getElementById("langBtn");
    let currentLang = localStorage.getItem("language") || "de";

    function updateLanguage() {
        document.querySelectorAll(".lang-de").forEach(el => el.style.display = currentLang === "de" ? "inline" : "none");
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = currentLang === "de" ? "none" : "inline");
        langBtn.textContent = currentLang === "de" ? "EN" : "DE";
    }

    updateLanguage();

    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "de" ? "en" : "de";
        localStorage.setItem("language", currentLang);
        updateLanguage();
    });


    // -----------------------------
    // SMOOTH SCROLL NAV LINKS
    // -----------------------------
    const navLinks = document.querySelectorAll('.NavBar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
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


    // -----------------------------
    // FORM VALIDATION
    // -----------------------------
    const form = document.getElementById("Kontakt");
    if (form) {
        const fields = [
            { id: "name", message: "Bitte geben Sie Ihren Namen ein." },
            { id: "email", message: "Bitte geben Sie Ihre E-Mail ein." },
            { id: "message", message: "Bitte geben Sie eine Nachricht ein." }
        ];

        // Create error elements if missing
        fields.forEach(f => {
            const input = document.getElementById(f.id);
            if (!input) return;

            if (!input.parentElement.querySelector(".custom-error")) {
                const errorDiv = document.createElement("div");
                errorDiv.classList.add("custom-error");
                errorDiv.style.display = "none";
                input.parentElement.appendChild(errorDiv);
            }

            input.addEventListener("input", () => hideError(input));
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            fields.forEach(f => {
                const input = document.getElementById(f.id);
                if (!input) return;

                if (input.value.trim() === "") {
                    showError(input, f.message);
                    valid = false;
                } else if (f.id === "email" && !isValidEmail(email.value.trim())) {
                    showError(email, currentLang === "de" ? "Bitte geben Sie eine gültige E-Mail ein." : "Please enter a valid email.");
                    valid = false;
                }
            });

            if (valid) {
                showToast(currentLang === "de" ? "Nachricht gesendet!" : "Message sent!", "success");
                form.reset();
            }
        });
    }
});


// -----------------------------
// TOAST NOTIFICATION
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
// CUSTOM INLINE ERROR BOX
// -----------------------------
function showError(inputElement, message) {
    const errorDiv = inputElement.parentElement.querySelector(".custom-error");
    if (!errorDiv) return;
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
}

function hideError(inputElement) {
    const errorDiv = inputElement.parentElement.querySelector(".custom-error");
    if (!errorDiv) return;
    errorDiv.style.display = "none";
}


// -----------------------------
// EMAIL VALIDATION
// -----------------------------
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
