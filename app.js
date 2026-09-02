// app.js

import { pageInfo, showToast } from "./navigation.js";

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");

export function showPage(pageName) {

    // Remove active navigation
    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    // Activate selected navigation
    const selectedLink = document.querySelector(
        `.nav-link[data-page="${pageName}"]`
    );

    if (selectedLink) {
        selectedLink.classList.add("active");
    }

    // Hide all pages
    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    // Update title
    if (pageInfo[pageName]) {
        pageTitle.textContent = pageInfo[pageName].title;
        pageSubtitle.textContent = pageInfo[pageName].subtitle;
    }

    // Close mobile sidebar
    document
        .querySelector(".sidebar")
        .classList.remove("mobile-open");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Navigation click
navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const page = this.dataset.page;

        showPage(page);
    });

});


// Dark mode
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeToggle.querySelector("i");

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


// Initialize
document.addEventListener("DOMContentLoaded", () => {

    showPage("dashboard");

});