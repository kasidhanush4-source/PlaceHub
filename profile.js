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

const profileName =
    document.getElementById("profileName");

const profileInitials =
    document.getElementById("profileInitials");

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


if (savedUser) {

    const user =
        JSON.parse(savedUser);

    profileName.textContent =
        user.name;

    editName.value =
        user.name;

    updateInitials(user.name);

}


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


        profileName.textContent =
            newName;


        updateInitials(newName);


        let user = {

            name: newName,

            email:
                "student@placehub.com",

            role:
                "Student",

            department:
                "BCA Artificial Intelligence"

        };


        localStorage.setItem(
            "placehubUser",
            JSON.stringify(user)
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

    const words =
        name.split(" ");

    let initials = "";


    words.forEach(word => {

        if (word.length > 0) {

            initials +=
                word.charAt(0).toUpperCase();

        }

    });


    profileInitials.textContent =
        initials.substring(0, 2);

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
