// WARTEN, BIS DAS DOM VOLLSTÄNDIG GELADEN IST
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE HAMBURGER MENU TOGGLE
    function initNavbar() {
        const navBar = document.querySelector('.NavBar');
        if (!navBar) return;

        const navMenu = navBar.querySelector('ul');
        if (!navMenu) return;

        // Check if hamburger already exists (avoid duplicates)
        if (document.getElementById('hamburger-menu')) return;

        // Add ID to nav menu if it doesn't have one
        if (!navMenu.id) {
            navMenu.id = 'nav-menu';
        }

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.id = 'hamburger-menu';
        hamburger.setAttribute('aria-label', 'Menu');
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        // Insert hamburger before the ul
        navBar.insertBefore(hamburger, navMenu);

        // Initialize hamburger menu functionality
        initHamburgerMenu(hamburger, navMenu);
    }

    // Initialize hamburger menu toggle functionality
    function initHamburgerMenu(hamburger, navMenu) {
        // Toggle menu on hamburger click
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("mobile-menu-active");
        });

        // Close menu when clicking on nav links (mobile)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("mobile-menu-active");
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                const isClickInsideNav = navMenu.contains(e.target);
                const isClickOnHamburger = hamburger.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains("mobile-menu-active")) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("mobile-menu-active");
                }
            }
        });

        // Close menu on window resize if switching to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("mobile-menu-active");
            }
        });
    }

    // Initialize navbar
    initNavbar();

    // DARK / LIGHT THEME TOGGLE
    const themeButton = document.getElementById("theme-button"); // Button für Dark/Light Mode
    const root = document.documentElement; // <html>-Element für Klassenzuweisungen

    // Prüfen, ob ein Theme im Local Storage gespeichert ist, Standard "light"
    const savedTheme = localStorage.getItem("theme") || "light"; // Gespeichertes Theme laden
    if (savedTheme === "dark") {
        root.classList.add("dark-mode"); // Dark Mode aktivieren
        themeButton.textContent = "Light Mode"; // Button-Text anpassen
    } else {
        themeButton.textContent = "Dark Mode"; // Button-Text für Light Mode
    }

    // Klick-Event für Theme-Button
    themeButton.addEventListener("click", () => {
        root.classList.toggle("dark-mode"); // Dark Mode ein-/ausschalten
        const isDark = root.classList.contains("dark-mode"); // Prüfen, ob Dark Mode aktiv ist
        localStorage.setItem("theme", isDark ? "dark" : "light"); // Theme speichern
        themeButton.textContent = isDark ? "Light Mode" : "Dark Mode"; // Button-Text aktualisieren
    });

    // Umschaltfunktion des Sprachbuttons
    const langBtn = document.getElementById("langBtn"); // Button zum Umschalten der Sprache
    let currentLang = localStorage.getItem("language") || "de"; // Gespeicherte Sprache, Standard "de"

    // Funktion zum Aktualisieren der angezeigten Sprache
    function updateLanguage() {
        document.querySelectorAll(".lang-de").forEach(el => el.style.display = currentLang === "de" ? "inline" : "none"); // Deutsche Elemente ein-/ausblenden
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = currentLang === "de" ? "none" : "inline"); // Englische Elemente ein-/ausblenden
        langBtn.textContent = currentLang === "de" ? "EN" : "DE"; // Button-Text anpassen
    }

    updateLanguage(); // Sprache beim Laden der Seite aktualisieren

    // Klick-Event für Sprachwechsel
    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "de" ? "en" : "de"; // Sprache wechseln
        localStorage.setItem("language", currentLang); // Neue Sprache speichern
        updateLanguage(); // Anzeige aktualisieren
    });

    // SANFTES SCROLLEN ZU DEN SEKTIONEN DER NAVLINKS
    const navLinks = document.querySelectorAll('.NavBar a[href^="#"]'); // Alle internen Links in der Navbar

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href'); // Zielanker auslesen
            if (!href || href === "#") return; // Keine Aktion, wenn kein gültiger Anker

            const target = document.querySelector(href); // Ziel-Element suchen
            if (!target) return; // Keine Aktion, wenn Ziel nicht existiert

            e.preventDefault(); // Standard-Verhalten verhindern
            const navbarHeight = document.querySelector('.NavBar ul').offsetHeight + 20; // Höhe der Navbar + Abstand
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Zielposition
            const offsetPosition = targetPosition - navbarHeight; // Position anpassen

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth' // sanftes Scrollen
            });
        });
    });

    // FORMULAR-VALIDIERUNG
    const form = document.getElementById("Kontakt"); // Formular-Container
    if (form) {
        const fields = [
            { id: "name", message: "Bitte geben Sie Ihren Namen ein." }, // Name-Feld
            { id: "email", message: "Bitte geben Sie Ihre E-Mail ein." }, // E-Mail-Feld
            { id: "message", message: "Bitte geben Sie eine Nachricht ein." } // Nachricht-Feld
        ];

        // Fehler-Elemente erstellen, falls sie noch nicht existieren
        fields.forEach(f => {
            const input = document.getElementById(f.id); // Eingabefeld auslesen
            if (!input) return;

            if (!input.parentElement.querySelector(".custom-error")) {
                const errorDiv = document.createElement("div"); // Fehler-Div erzeugen
                errorDiv.classList.add("custom-error"); // Klasse für Fehler
                errorDiv.style.display = "none"; // Standardmäßig unsichtbar
                input.parentElement.appendChild(errorDiv); // Fehler-Element anhängen
            }

            // Fehler beim Tippen ausblenden
            input.addEventListener("input", () => hideError(input)); // Event für Eingabe
        });

        // Formular absenden
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Standard-Verhalten verhindern
            let valid = true;

            const name = document.getElementById("name"); // Name-Feld
            const email = document.getElementById("email"); // E-Mail-Feld
            const message = document.getElementById("message"); // Nachricht-Feld

            // Felder prüfen
            fields.forEach(f => {
                const input = document.getElementById(f.id);
                if (!input) return;

                if (input.value.trim() === "") { // Prüfen auf leere Eingabe
                    showError(input, f.message); // Fehlermeldung anzeigen
                    valid = false;
                } else if (f.id === "email" && !isValidEmail(email.value.trim())) { // E-Mail prüfen
                    showError(email, currentLang === "de" ? "Bitte geben Sie eine gültige E-Mail ein." : "Please enter a valid email."); // Fehlermeldung
                    valid = false;
                }
            });

            if (valid) {
                showToast(currentLang === "de" ? "Nachricht gesendet!" : "Message sent!", "success"); // Erfolgsmeldung
                form.reset(); // Formular zurücksetzen
            }
        });
    }
});

// TOAST-BENACHRICHTIGUNG
function showToast(message, type) {
    const toast = document.getElementById('notificationToast'); // Toast-Container
    const messageSpan = document.getElementById('toastMessage'); // Text im Toast

    messageSpan.innerText = message; // Nachricht einfügen
    toast.className = 'notification-toast show ' + type; // Klassen setzen
    toast.style.display = 'block'; // sichtbar machen

    // Nach 4 Sekunden wieder ausblenden
    setTimeout(() => {
        toast.className = 'notification-toast'; // Klassen zurücksetzen
        setTimeout(() => {
            toast.style.display = 'none'; // Toast ausblenden
        }, 500);
    }, 4000);
}

// CUSTOM INLINE ERROR BOX
function showError(inputElement, message) {
    const errorDiv = inputElement.parentElement.querySelector(".custom-error"); // Fehler-Element suchen
    if (!errorDiv) return;
    errorDiv.textContent = message; // Fehlermeldung einfügen
    errorDiv.style.display = "block"; // sichtbar machen
}

function hideError(inputElement) {
    const errorDiv = inputElement.parentElement.querySelector(".custom-error"); // Fehler-Element suchen
    if (!errorDiv) return;
    errorDiv.style.display = "none"; // ausblenden
}

// E-MAIL-VALIDIERUNG
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email); // Einfacher RegEx(kurz für Regular Expression, auf Deutsch: „Regulärer Ausdruck“) zur Prüfung der E-Mail
}