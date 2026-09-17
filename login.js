/* =========================================
   PLACEHUB LOGIN SYSTEM
========================================= */

// FIREBASE CONFIGURATION
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
    console.warn("Firebase Auth init:", e);
}

// DOM ELEMENTS
const tabEmail = document.getElementById("tabEmail");
const tabPhone = document.getElementById("tabPhone");
const loginForm = document.getElementById("loginForm");
const phoneForm = document.getElementById("phoneForm");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const demoLogin = document.getElementById("demoLogin");
const googleLogin = document.getElementById("googleLogin");
const toast = document.getElementById("loginToast");
const toastText = document.getElementById("toastText");

// PHONE LOGIN ELEMENTS
const phoneStepNumber = document.getElementById("phoneStepNumber");
const phoneStepOtp = document.getElementById("phoneStepOtp");
const phoneNumberInput = document.getElementById("phoneNumber");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const otpCodeInput = document.getElementById("otpCode");
const editPhoneBtn = document.getElementById("editPhoneBtn");
const displaySentPhone = document.getElementById("displaySentPhone");
const otpTimer = document.getElementById("otpTimer");
const resendOtpBtn = document.getElementById("resendOtpBtn");

let activePhone = "";
let otpCountdown = null;
let currentOtpRemaining = 30;


/* =========================================
   TAB SWITCHING (EMAIL / PHONE)
========================================= */

if (tabEmail && tabPhone) {
    tabEmail.addEventListener("click", () => {
        tabEmail.classList.add("active");
        tabPhone.classList.remove("active");
        loginForm.style.display = "block";
        phoneForm.style.display = "none";
    });

    tabPhone.addEventListener("click", () => {
        tabPhone.classList.add("active");
        tabEmail.classList.remove("active");
        loginForm.style.display = "none";
        phoneForm.style.display = "block";
    });
}


/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

if (togglePassword && password) {
    togglePassword.addEventListener("click", () => {
        const icon = togglePassword.querySelector("i");
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
}


/* =========================================
   EMAIL & PASSWORD LOGIN
========================================= */

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = password.value.trim();

    if (!email || !pass) {
        showToast("Please enter both email and password.");
        return;
    }

    let savedUser = null;
    try {
        savedUser = JSON.parse(localStorage.getItem("placehubUser") || "null");
    } catch (e) {}

    // Check preconfigured demo accounts or registered user
    const isDemoMatch = (email === "student@placehub.com" || email === "dhanush@placehub.com") && pass === "123456";
    const isRegisteredMatch = savedUser && savedUser.email && savedUser.email.toLowerCase() === email.toLowerCase() && (savedUser.password ? savedUser.password === pass : pass === "123456");

    if (isDemoMatch || isRegisteredMatch) {
        const userObj = isRegisteredMatch && savedUser ? savedUser : {
            name: "Dhanush K",
            email: email,
            role: "Student",
            department: "BCA Artificial Intelligence",
            phone: "+91 98765 43210"
        };

        localStorage.setItem("placehubLoggedIn", "true");
        localStorage.setItem("placehubUser", JSON.stringify(userObj));

        showToast("Login successful! Redirecting...");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showToast("Invalid email or password. Try student@placehub.com / 123456");
    }
});


/* =========================================
   GOOGLE SIGN-IN
========================================= */

if (googleLogin) {
    googleLogin.addEventListener("click", () => {
        showToast("Connecting to Google Account...");

        // Try Firebase popup if available and running on HTTP/HTTPS
        const isHttp = window.location.protocol.startsWith("http");
        if (auth && isHttp) {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("profile");
            provider.addScope("email");

            auth.signInWithPopup(provider)
                .then((result) => {
                    const user = result.user;
                    const googleUser = {
                        name: user.displayName || "Google Student",
                        email: user.email || "student.google@placehub.com",
                        photoURL: user.photoURL || "",
                        role: "Student",
                        department: "Computer Applications",
                        phone: user.phoneNumber || "+91 98765 43210"
                    };

                    localStorage.setItem("placehubLoggedIn", "true");
                    localStorage.setItem("placehubUser", JSON.stringify(googleUser));

                    showToast(`Welcome, ${googleUser.name}!`);
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1000);
                })
                .catch((error) => {
                    console.warn("Firebase Google popup error, using fallback:", error.code, error.message);
                    loginWithGoogleFallback();
                });
        } else {
            // Running via file:// protocol or auth offline - use seamless fallback
            loginWithGoogleFallback();
        }
    });
}

function loginWithGoogleFallback() {
    const googleUser = {
        name: "Google Student",
        email: "google.student@placehub.com",
        role: "Student",
        department: "BCA Artificial Intelligence",
        phone: "+91 98765 43210"
    };

    localStorage.setItem("placehubLoggedIn", "true");
    localStorage.setItem("placehubUser", JSON.stringify(googleUser));

    showToast("Signed in with Google! Welcome.");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}


/* =========================================
   PHONE NUMBER & OTP LOGIN
========================================= */

// Step 1: Send OTP
if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", () => {
        const rawPhone = phoneNumberInput.value.trim().replace(/\D/g, "");

        if (rawPhone.length !== 10) {
            showToast("Please enter a valid 10-digit mobile number.");
            return;
        }

        activePhone = rawPhone;
        displaySentPhone.textContent = `+91 ${activePhone}`;

        // Attempt Firebase Phone Auth if in HTTP environment
        const isHttp = window.location.protocol.startsWith("http");
        if (auth && isHttp && window.firebase) {
            try {
                if (!window.recaptchaVerifier) {
                    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
                        size: "invisible",
                        callback: () => {}
                    });
                }

                auth.signInWithPhoneNumber(`+91${activePhone}`, window.recaptchaVerifier)
                    .then((confirmationResult) => {
                        window.confirmationResult = confirmationResult;
                        startOtpFlow(false);
                    })
                    .catch((err) => {
                        console.warn("Firebase phone auth fallback:", err);
                        startOtpFlow(true);
                    });
                return;
            } catch (err) {
                console.warn("Recaptcha/Phone error, using fallback:", err);
            }
        }

        // Default / local preview flow
        startOtpFlow(true);
    });
}

function startOtpFlow(isDemo) {
    phoneStepNumber.style.display = "none";
    phoneStepOtp.style.display = "block";
    otpCodeInput.value = "";
    otpCodeInput.focus();

    if (isDemo) {
        showToast("OTP sent! Demo verification OTP is 123456");
        otpCodeInput.placeholder = "Enter 123456";
    } else {
        showToast(`OTP sent to +91 ${activePhone}`);
    }

    startResendTimer();
}

function startResendTimer() {
    clearInterval(otpCountdown);
    currentOtpRemaining = 30;
    resendOtpBtn.disabled = true;
    otpTimer.textContent = currentOtpRemaining;

    otpCountdown = setInterval(() => {
        currentOtpRemaining--;
        if (currentOtpRemaining <= 0) {
            clearInterval(otpCountdown);
            otpTimer.textContent = "0";
            resendOtpBtn.disabled = false;
        } else {
            otpTimer.textContent = currentOtpRemaining;
        }
    }, 1000);
}

// Resend OTP
if (resendOtpBtn) {
    resendOtpBtn.addEventListener("click", () => {
        if (currentOtpRemaining > 0) return;
        startOtpFlow(true);
    });
}

// Change Phone Number
if (editPhoneBtn) {
    editPhoneBtn.addEventListener("click", () => {
        clearInterval(otpCountdown);
        phoneStepOtp.style.display = "none";
        phoneStepNumber.style.display = "block";
        phoneNumberInput.focus();
    });
}

// Step 2: Verify OTP
if (phoneForm) {
    phoneForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const otp = otpCodeInput.value.trim().replace(/\D/g, "");
        if (otp.length !== 6) {
            showToast("Please enter the 6-digit verification code.");
            return;
        }

        // If Firebase confirmationResult is active
        if (window.confirmationResult) {
            window.confirmationResult.confirm(otp)
                .then((result) => {
                    completePhoneLogin(activePhone);
                })
                .catch((err) => {
                    console.warn("Firebase OTP verify failed:", err);
                    if (otp === "123456") {
                        completePhoneLogin(activePhone);
                    } else {
                        showToast("Invalid code. Please enter 123456");
                    }
                });
        } else {
            // Local fallback: accept 123456 or any 6-digit code
            if (otp === "123456" || otp.length === 6) {
                completePhoneLogin(activePhone);
            } else {
                showToast("Invalid OTP. Try 123456");
            }
        }
    });
}

function completePhoneLogin(phoneDigits) {
    let existingUser = null;
    try {
        existingUser = JSON.parse(localStorage.getItem("placehubUser") || "null");
    } catch (e) {}

    const formattedPhone = `+91 ${phoneDigits}`;
    let userObj;

    if (existingUser && existingUser.phone && existingUser.phone.includes(phoneDigits)) {
        userObj = existingUser;
    } else {
        userObj = {
            name: existingUser ? existingUser.name : `Student (${phoneDigits.slice(-4)})`,
            email: existingUser ? existingUser.email : `student.${phoneDigits.slice(-4)}@placehub.com`,
            phone: formattedPhone,
            role: "Student",
            department: existingUser ? existingUser.department : "BCA Artificial Intelligence"
        };
    }

    localStorage.setItem("placehubLoggedIn", "true");
    localStorage.setItem("placehubUser", JSON.stringify(userObj));

    showToast("Phone verification successful! Redirecting...");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}


/* =========================================
   DEMO ACCOUNT LOGIN
========================================= */

if (demoLogin) {
    demoLogin.addEventListener("click", () => {
        const demoUser = {
            name: "Dhanush K",
            email: "student@placehub.com",
            role: "Student",
            department: "BCA Artificial Intelligence",
            phone: "+91 98765 43210"
        };

        localStorage.setItem("placehubLoggedIn", "true");
        localStorage.setItem("placehubUser", JSON.stringify(demoUser));

        showToast("Logged in as Demo Student! Redirecting...");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    });
}


/* =========================================
   TOAST NOTIFICATION
========================================= */

function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
