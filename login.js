/* =========================================
   PLACEHUB LOGIN SYSTEM
========================================= */

const loginForm =
    document.getElementById("loginForm");

const password =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");

const demoLogin =
    document.getElementById("demoLogin");

const toast =
    document.getElementById("loginToast");

const toastText =
    document.getElementById("toastText");


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

togglePassword.addEventListener("click", () => {

    const icon =
        togglePassword.querySelector("i");

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

});


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const pass =
        password.value.trim();


    if (!email || !pass) {

        showToast("Please enter email and password.");

        return;

    }


    /*
        FRONTEND DEMO LOGIN

        Demo:
        Email: student@placehub.com
        Password: 123456
    */

    if (
        email === "student@placehub.com" &&
        pass === "123456"
    ) {

        localStorage.setItem(
            "placehubLoggedIn",
            "true"
        );

        localStorage.setItem(
            "placehubUser",
            JSON.stringify({
                name: "Dhanush K",
                email: email,
                role: "Student",
                department: "BCA Artificial Intelligence"
            })
        );


        showToast("Login successful!");


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 1000);

    } else {

        showToast(
            "Invalid email or password."
        );

    }

});


/* =========================================
   DEMO LOGIN
========================================= */

demoLogin.addEventListener("click", () => {

    document.getElementById("email").value =
        "student@placehub.com";

    password.value = "123456";

    loginForm.requestSubmit();

});


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
