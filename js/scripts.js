/* ========================================
   SELECT ELEMENTS
======================================== */

const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.querySelector(".nav-menu");


/* ========================================
   MOBILE MENU
======================================== */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        // Toggle menu
        const isOpen = menuBtn.classList.toggle("active");

        navMenu.classList.toggle("active");

        // Update accessibility attribute
        menuBtn.setAttribute("aria-expanded", isOpen);

    });
}


/* ========================================
   CLOSE MENU AFTER CLICKING NAV LINK
======================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (menuBtn && navMenu) {

            menuBtn.classList.remove("active");

            navMenu.classList.remove("active");

            menuBtn.setAttribute("aria-expanded", "false");

        }

    });

});


/* ========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
======================================== */

document.addEventListener("click", (event) => {

    if (!menuBtn || !navMenu) {
        return;
    }

    const clickedInsideMenu =
        navMenu.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedMenuButton &&
        navMenu.classList.contains("active")
    ) {

        menuBtn.classList.remove("active");

        navMenu.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

    }

});


/* ========================================
   NAVBAR ON SCROLL
======================================== */

function handleNavbarScroll() {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


/* ========================================
   ACTIVE NAVIGATION LINK
======================================== */

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


/* ========================================
   WINDOW SCROLL EVENTS
======================================== */

window.addEventListener(
    "scroll",
    handleNavbarScroll
);

window.addEventListener(
    "scroll",
    updateActiveNav
);


/* ========================================
   RUN FUNCTIONS ON PAGE LOAD
======================================== */

handleNavbarScroll();
updateActiveNav();

// ========================================
// CONTACT FORM SUBMISSION
// ========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        // Stop normal page reload
        event.preventDefault();

        const submitButton =
            contactForm.querySelector(".contact-submit");

        const buttonText =
            submitButton.querySelector(".button-text");

        // Collect form data
        const formData = new FormData(contactForm);


        // ========================================
        // SENDING STATE
        // ========================================

        submitButton.disabled = true;

        buttonText.textContent = "Sending...";

        formStatus.textContent = "";

        formStatus.className = "form-status";


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,

                    headers: {
                        Accept: "application/json"
                    }
                }
            );


            // ========================================
            // SUCCESS
            // ========================================

            if (response.ok) {

                formStatus.textContent =
                    "✓ Message sent successfully!";

                formStatus.classList.add(
                    "show",
                    "success"
                );

                buttonText.textContent =
                    "Message Sent!";

                // Clear form
                contactForm.reset();


                // Reset button after 3 seconds
                setTimeout(function () {

                    buttonText.textContent =
                        "Send Message";

                    submitButton.disabled = false;

                    formStatus.classList.remove("show");

                }, 3000);


            } else {

                throw new Error(
                    "Form submission failed"
                );

            }


        } catch (error) {

            // ========================================
            // ERROR
            // ========================================

            formStatus.textContent =
                "✕ Something went wrong. Please try again.";

            formStatus.classList.add(
                "show",
                "error"
            );

            buttonText.textContent =
                "Send Message";

            submitButton.disabled = false;

        }

    });

}
