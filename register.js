// ===============================
// PLACEHUB REGISTER JAVASCRIPT
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyBltZ9sa1IFHEUwth7rJJL-hTOwn66dDfQ",
  authDomain: "student-management-a85a7.firebaseapp.com",
  projectId: "student-management-a85a7",
  storageBucket: "student-management-a85a7.firebasestorage.app",
  messagingSenderId: "1038849607691",
  appId: "1:1038849607691:web:69e6a8ca3298bdbfe85f0e",
  measurementId: "G-TZ5WHXNWHC"
};

let auth = null;
try {
    if (typeof firebase !== "undefined") {
        if (!firebase.apps || !firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        auth = firebase.auth();
    }
} catch (e) {
    console.warn("Firebase Auth init in register:", e);
}

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
    // FINALIZE & SAVE USER
    // ===============================

    const finalizeRegistration = (extraProps = {}) => {
        const user = {
            name: name,
            email: email,
            phone: phone,
            department: department,
            role: "Student",
            password: pass,
            ...extraProps
        };

        localStorage.setItem("placehubUser", JSON.stringify(user));
        localStorage.setItem("placehubLoggedIn", "true");
        showToast("Account created successfully!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    };

    if (auth) {
        showToast("Registering with Firebase...");
        auth.createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                const fbUser = userCredential.user;
                if (fbUser && fbUser.updateProfile) {
                    fbUser.updateProfile({ displayName: name }).catch(() => {});
                }
                finalizeRegistration({ uid: fbUser ? fbUser.uid : null });
            })
            .catch((error) => {
                console.warn("Firebase create user error:", error.code, error.message);
                if (error.code === "auth/email-already-in-use") {
                    showToast("Email already in use. Please sign in.");
                } else if (error.code === "auth/weak-password") {
                    showToast("Password should be at least 6 characters.");
                } else if (error.code === "auth/invalid-email") {
                    showToast("Please enter a valid email address.");
                } else {
                    // Seamless fallback if offline or restricted
                    finalizeRegistration();
                }
            });
    } else {
        finalizeRegistration();
    }
});