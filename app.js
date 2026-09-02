/* =========================================
   PLACEHUB JAVASCRIPT
========================================= */


/* =========================================
   PAGE NAVIGATION
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");

const pageSubtitle = document.getElementById("pageSubtitle");


const pageInfo = {

    dashboard: {
        title: "Dashboard",
        subtitle:
            "Welcome back! Here's what's happening with placements."
    },

    students: {
        title: "Students",
        subtitle:
            "Manage student profiles and placement eligibility."
    },

    companies: {
        title: "Companies",
        subtitle:
            "Manage your partner companies."
    },

    jobs: {
        title: "Job Opportunities",
        subtitle:
            "Explore the latest placement opportunities."
    },

    drives: {
        title: "Placement Drives",
        subtitle:
            "Manage upcoming campus recruitment drives."
    },

    applications: {
        title: "Applications",
        subtitle:
            "Track student applications and recruitment status."
    },

    analytics: {
        title: "Analytics",
        subtitle:
            "Analyze placement performance and trends."
    },

    notifications: {
        title: "Notifications",
        subtitle:
            "Stay updated with placement activities."
    },

    settings: {
        title: "Settings",
        subtitle:
            "Manage your PlaceHub preferences."
    }

};


navLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const page = this.dataset.page;

        showPage(page);

    });

});


function showPage(pageName) {

    /* Remove active nav */

    navLinks.forEach(link => {

        link.classList.remove("active");

    });


    /* Activate selected nav */

    const selectedLink =
        document.querySelector(
            `.nav-link[data-page="${pageName}"]`
        );

    if (selectedLink) {

        selectedLink.classList.add("active");

    }


    /* Hide all pages */

    pages.forEach(page => {

        page.classList.remove("active-page");

    });


    /* Show selected page */

    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    /* Update heading */

    if (pageInfo[pageName]) {

        pageTitle.textContent =
            pageInfo[pageName].title;

        pageSubtitle.textContent =
            pageInfo[pageName].subtitle;

    }


    /* Close mobile sidebar */

    document
        .querySelector(".sidebar")
        .classList.remove("mobile-open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   MOBILE SIDEBAR
========================================= */

const mobileMenu =
    document.getElementById("mobileMenu");


mobileMenu.addEventListener("click", () => {

    document
        .querySelector(".sidebar")
        .classList.toggle("mobile-open");

});


/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon =
        themeToggle.querySelector("i");


    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        showToast("Dark mode enabled");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        showToast("Light mode enabled");

    }

});


/* =========================================
   TOAST
========================================= */

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   APPLY BUTTONS
========================================= */

const applyButtons =
    document.querySelectorAll(".apply-btn");


applyButtons.forEach(button => {

    button.addEventListener("click", function() {

        this.textContent = "Applied";

        this.style.background = "#e7f9f2";

        this.style.color = "#15956c";

        this.style.borderColor = "#c9efdf";

        showToast(
            "Application submitted successfully!"
        );

    });

});


/* =========================================
   JOB APPLY NOW
========================================= */

const jobApplyButtons =
    document.querySelectorAll(".job-card .primary-btn");


jobApplyButtons.forEach(button => {

    button.addEventListener("click", function() {

        this.textContent = "Application Submitted";

        this.style.background = "#20b486";

        showToast(
            "Job application submitted!"
        );

    });

});


/* =========================================
   VIEW BUTTONS
========================================= */

const viewButtons =
    document.querySelectorAll(".view-btn");


viewButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Opening application details..."
        );

    });

});


/* =========================================
   COMPANY BUTTONS
========================================= */

const companyButtons =
    document.querySelectorAll(".company-card button");


companyButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Company profile opened."
        );

    });

});


/* =========================================
   STUDENT PROFILE BUTTONS
========================================= */

const studentButtons =
    document.querySelectorAll(".student-footer button");


studentButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Student profile opened."
        );

    });

});


/* =========================================
   PRIMARY BUTTONS
========================================= */

const primaryButtons =
    document.querySelectorAll(
        ".section-top .primary-btn"
    );


primaryButtons.forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Feature opened successfully."
        );

    });

});


/* =========================================
   NOTIFICATION
========================================= */

const notificationButton =
    document.querySelector(
        ".notification-btn"
    );


notificationButton.addEventListener(
    "click",
    () => {

        showPage("notifications");

    }
);


/* =========================================
   GLOBAL SEARCH
========================================= */

const globalSearch =
    document.getElementById("globalSearch");


globalSearch.addEventListener(
    "keypress",
    function(e) {

        if (e.key === "Enter") {

            const query =
                this.value.trim();

            if (query === "") {

                showToast(
                    "Please enter something to search."
                );

                return;

            }


            showToast(
                `Searching for "${query}"...`
            );

        }

    }
);


/* =========================================
   SETTINGS SAVE
========================================= */

const settingsSave =
    document.querySelector(
        "#settings .primary-btn"
    );


if (settingsSave) {

    settingsSave.addEventListener(
        "click",
        () => {

            showToast(
                "Profile settings saved successfully!"
            );

        }
    );

}


/* =========================================
   MARK NOTIFICATIONS
========================================= */

const markRead =
    document.querySelector(
        "#notifications .text-btn"
    );


if (markRead) {

    markRead.addEventListener(
        "click",
        () => {

            const notifications =
                document.querySelectorAll(
                    ".notification-item"
                );


            notifications.forEach(item => {

                item.classList.remove("unread");

            });


            const count =
                document.querySelector(
                    ".notification-count"
                );


            if (count) {

                count.textContent = "0";

                count.style.display = "none";

            }


            showToast(
                "All notifications marked as read."
            );

        }
    );

}


/* =========================================
   SWITCHES
========================================= */

const switches =
    document.querySelectorAll(
        ".switch input"
    );


switches.forEach(toggle => {

    toggle.addEventListener(
        "change",
        () => {

            showToast(
                toggle.checked
                    ? "Setting enabled"
                    : "Setting disabled"
            );

        }
    );

});


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showPage("dashboard");

    }
);