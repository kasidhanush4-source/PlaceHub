/* =========================================
   PLACEHUB PROFILE JAVASCRIPT
========================================= */

const editProfile =
    document.getElementById("editProfile");

const profileModal =
    document.getElementById("profileModal");

const closeModal =
    document.getElementById("closeModal");

const profileForm =
    document.getElementById("profileForm");

const editName =
    document.getElementById("editName");

const editPhone =
    document.getElementById("editPhone");

const editRole =
    document.getElementById("editRole");

const profileName =
    document.getElementById("profileName");

const profileFullName =
    document.getElementById("profileFullName");

const profileEmail =
    document.getElementById("profileEmail");

const profilePhone =
    document.getElementById("profilePhone");

const profileDept =
    document.getElementById("profileDept");

const profileBadgeRole =
    document.getElementById("profileBadgeRole");

const profileInitials =
    document.getElementById("profileInitials");

const topAvatar =
    document.getElementById("topAvatar");

const logoutBtn =
    document.getElementById("logoutBtn");

const toast =
    document.getElementById("toast");


/* =========================================
   CHECK LOGIN
========================================= */

const loggedIn =
    localStorage.getItem(
        "placehubLoggedIn"
    );


if (loggedIn !== "true") {

    window.location.href =
        "login.html";

}


/* =========================================
   LOAD USER
========================================= */

const savedUser =
    localStorage.getItem(
        "placehubUser"
    );

let currentUser = {
    name: "Dhanush K",
    email: "student@placehub.com",
    role: "Student",
    department: "BCA Artificial Intelligence",
    phone: "+91 98765 43210"
};

if (savedUser) {
    try {
        currentUser = { ...currentUser, ...JSON.parse(savedUser) };
    } catch (e) {
        console.error(e);
    }
}

if (profileName) profileName.textContent = currentUser.name;
if (profileFullName) profileFullName.textContent = currentUser.name;
if (editName) editName.value = currentUser.name;
if (profileEmail) profileEmail.textContent = currentUser.email;
if (profilePhone) profilePhone.textContent = currentUser.phone;
if (editPhone) editPhone.value = currentUser.phone;
if (profileDept) profileDept.textContent = currentUser.department;
if (profileBadgeRole) profileBadgeRole.textContent = currentUser.role || "Student";
if (editRole) editRole.value = currentUser.preferredRole || "Software Developer";

updateInitials(currentUser.name);


/* =========================================
   OPEN MODAL
========================================= */

editProfile.addEventListener(
    "click",
    () => {

        profileModal.classList.add("show");

    }
);


/* =========================================
   CLOSE MODAL
========================================= */

closeModal.addEventListener(
    "click",
    () => {

        profileModal.classList.remove("show");

    }
);


profileModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === profileModal
        ) {

            profileModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   SAVE PROFILE
========================================= */

profileForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const newName =
            editName.value.trim();

        if (!newName) {
            return;
        }

        const newPhone = editPhone ? editPhone.value.trim() : currentUser.phone;
        const newRole = editRole ? editRole.value.trim() : currentUser.preferredRole;

        currentUser.name = newName;
        if (newPhone) currentUser.phone = newPhone;
        if (newRole) currentUser.preferredRole = newRole;

        if (profileName) profileName.textContent = newName;
        if (profileFullName) profileFullName.textContent = newName;
        if (profilePhone) profilePhone.textContent = currentUser.phone;

        updateInitials(newName);

        localStorage.setItem(
            "placehubUser",
            JSON.stringify(currentUser)
        );

        profileModal.classList.remove(
            "show"
        );

        showToast(
            "Profile updated successfully!"
        );

    }
);


/* =========================================
   INITIALS
========================================= */

function updateInitials(name) {

    if (!name) return;

    const words =
        name.trim().split(" ");

    let initials = "";

    if (words.length === 1) {
        initials = words[0].substring(0, 2).toUpperCase();
    } else {
        initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }

    if (profileInitials) profileInitials.textContent = initials;
    if (topAvatar) topAvatar.textContent = initials;

}


/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "placehubLoggedIn"
        );

        localStorage.removeItem(
            "placehubUser"
        );


        window.location.href =
            "login.html";

    }
);


/* =========================================
   PHOTO BUTTON
========================================= */

document
    .getElementById("photoButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Profile photo upload can be connected to the backend."
            );

        }
    );


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toast.querySelector("span")
        .textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
