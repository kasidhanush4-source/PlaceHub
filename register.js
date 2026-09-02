// ===============================
// PLACEHUB REGISTER JAVASCRIPT
// ===============================

const registerForm = document.getElementById("registerForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        this.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        password.type = "password";

        this.innerHTML =
            '<i class="fa-regular fa-eye"></i>';
    }

});


toggleConfirmPassword.addEventListener("click", function () {

    if (confirmPassword.type === "password") {

        confirmPassword.type = "text";

        this.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        confirmPassword.type = "password";

        this.innerHTML =
            '<i class="fa-regular fa-eye"></i>';
    }

});


// ===============================
// TOAST FUNCTION
// ===============================

function showToast(message) {

    const toast = document.getElementById("toast");
    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ===============================
// REGISTER
// ===============================

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const department =
        document.getElementById("department").value;

    const pass = password.value;

    const confirmPass =
        confirmPassword.value;

    const terms =
        document.getElementById("terms").checked;


    // Password check
    if (pass.length < 6) {

        showToast(
            "Password must contain at least 6 characters."
        );

        return;
    }


    // Confirm password
    if (pass !== confirmPass) {

        showToast(
            "Passwords do not match."
        );

        return;
    }


    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {

        showToast(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    // Terms
    if (!terms) {

        showToast(
            "Please accept the Terms & Conditions."
        );

        return;
    }


    // ===============================
    // CREATE USER OBJECT
    // ===============================

    const user = {

        name: name,

        email: email,

        phone: phone,

        department: department,

        role: "Student",

        password: pass
    };


    // Save registration data
    localStorage.setItem(
        "placehubUser",
        JSON.stringify(user)
    );


    // Login status
    localStorage.setItem(
        "placehubLoggedIn",
        "true"
    );


    // Success message
    showToast(
        "Account created successfully!"
    );


    // Redirect to dashboard
    setTimeout(() => {

        window.location.href = "index.html";

    }, 1500);

});