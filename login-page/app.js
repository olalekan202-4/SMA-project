const hiddenPassword = document.getElementById("hidden-password");
const passwordField = document.getElementById("password");
const passwordImage = document.getElementById("password-image");
const loginSubmit = document.querySelector("#submit-login");
const errorMsg = document.querySelector("#error");
const forgetPassword = document.querySelector("#forget-password");

// Toggle password visibility
hiddenPassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    hiddenPassword.src = "./login-page/IMAGE/password-view-icon.png"; // Change to view icon
  } else {
    passwordField.type = "password";
    hiddenPassword.src = "./login-page/IMAGE/password-hidden-icon.png"; // Change back to hidden icon
  }
});

const emailInput = document.getElementById("email");
const emailIcon = document.getElementById("email-image");

// Add an event listener to detect input for email
emailInput.addEventListener("input", function () {
  if (emailInput.value.length > 0) {
    emailIcon.classList.add("hidden"); // Hide the email icon
  } else {
    emailIcon.classList.remove("hidden"); // Show the email icon if the field is empty
  }
});

// Add an event listener to detect input for password
passwordField.addEventListener("input", function () {
  if (passwordField.value.length > 0) {
    passwordImage.classList.add("hidden"); // Hide the password icon
  } else {
    passwordImage.classList.remove("hidden"); // Show the password icon if the field is empty
  }
});

// Helper functions
const handleDisplayError = (inputName, validationType = "default") => {
  if (validationType === "default")
    return (errorMsg.innerHTML = `${inputName} is missing, kindly input and continue`);
  if (validationType === "email")
    return (errorMsg.innerHTML = `${inputName} type is invalid, kindly input a valid ${inputName}!`);
};

const handleClearError = () => {
  errorMsg.innerHTML = "";
};

const handleRedirection = (redirectUrl) => {
  window.location = redirectUrl;
};

const handleSaveToLocalStorage = (data) => {
  localStorage.setItem("user_token", data.token); // Save the token for future requests
  localStorage.setItem("user_data", JSON.stringify(data.user)); // Save user details
};

// Validate email
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Handle Login Form Submission
loginSubmit.addEventListener("click", async function (e) {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordField.value.trim();

  // Input validation
  if (!email) return handleDisplayError("Email");
  if (!validateEmail(email)) return handleDisplayError("Email", "email");
  if (!password) return handleDisplayError("Password");

  // Form data
  const loginData = {
    email: email,
    password: password,
  };

  try {
    // API call to log in the user
    const response = await fetch(
      "https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Login failed");

    // Save user data to localStorage
    handleSaveToLocalStorage(data);

    // Redirect to dashboard
    handleClearError();
    alert("Login successful, Redirecting you to Dashboard...");
    handleRedirection("../indexD.html");
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.innerHTML = error.message || "Something went wrong. Please try again.";
  }
});

// Handle Forgot Password
forgetPassword.addEventListener("click", async function (e) {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  if (!email) {
    return handleDisplayError("Email");
  }

  try {
    // API call to send forgot password email
    const response = await fetch(
      "https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Failed to send reset password email.");

    errorMsg.style.color = "green";
    errorMsg.innerHTML = "Password reset email sent! Check your inbox.";
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.innerHTML = error.message || "Something went wrong. Please try again.";
  }
});
