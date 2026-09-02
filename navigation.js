// navigation.js

export const pageInfo = {
    dashboard: {
        title: "Dashboard",
        subtitle: "Welcome back! Here's what's happening with placements."
    },

    students: {
        title: "Students",
        subtitle: "Manage student profiles and placement eligibility."
    },

    companies: {
        title: "Companies",
        subtitle: "Manage your partner companies."
    },

    jobs: {
        title: "Job Opportunities",
        subtitle: "Explore the latest placement opportunities."
    },

    drives: {
        title: "Placement Drives",
        subtitle: "Manage upcoming campus recruitment drives."
    },

    applications: {
        title: "Applications",
        subtitle: "Track student applications and recruitment status."
    },

    analytics: {
        title: "Analytics",
        subtitle: "Analyze placement performance and trends."
    },

    notifications: {
        title: "Notifications",
        subtitle: "Stay updated with placement activities."
    },

    settings: {
        title: "Settings",
        subtitle: "Manage your PlaceHub preferences."
    }
};

export function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}