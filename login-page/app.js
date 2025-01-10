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
    hiddenPassword.src = "IMAGE/password-view-icon.png"; // Change to view icon
  } else {
    passwordField.type = "password";
    hiddenPassword.src = "IMAGE/password-hidden-icon.png"; // Change back to hidden icon
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

const handleDisplayError = (inputName, validationType = "default") => {
  if (validationType === "default")
    return (errorMsg.innerHTML = `${inputName} is missing, kindly input and continue`);
  if (validationType === "email")
    return (errorMsg.innerHTML = `${inputName} type is invalid, kindly input a valid ${inputName}!`);
  if (validationType === "password")
    return (errorMsg.innerHTML = `${inputName} must have a minimum of 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.`);
};

const handleClearError = () => {
  errorMsg.innerHTML = "";
};

const handleRedirection = (redirectUrl) => {
  window.location = redirectUrl;
};

const details = {
  emailInput: document.querySelector("#email").value, // Example
  passwordInput: document.querySelector("#password").value,
};


const handleSaveSession = (details) => {
  localStorage.setItem("current_user_email", details.emailInput); // Save email for the logged-in user
  localStorage.setItem("present_session", JSON.stringify(details)); // Optionally save entire user details
};
console.log("Details object:", details);
console.log("Email Input:", details.emailInput);



// Handle Login Form Submission
loginSubmit.addEventListener("click", async function (e) {
  e.preventDefault();

  // Input validation
  if (emailInput.value === "") return handleDisplayError("Email");
  if (passwordField.value === "") return handleDisplayError("Password");

  // Form data
  const loginData = {
    email: emailInput.value.trim().toLowerCase(),
    password: passwordField.value.trim(),
  };

  try {
    // API call
    const response = await fetch("https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    console.log(data);

    // Handle response
    if (!response.ok) throw new Error(data.message || "Login failed");

    handleClearError();
    alert("Login successful, Redirecting you to Dashboard...");
    handleSaveSession(data); // Save user data to localStorage
    handleRedirection("../dashboard-page/index.html"); // Redirect to dashboard
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.innerHTML = error.message || "Something went wrong. Please try again.";
  }
});

// Handle Forgot Password
forgetPassword.addEventListener("click", async function (e) {
  e.preventDefault();

  // Input validation for email
  if (emailInput.value === "") {
    return handleDisplayError("Email");
  }

  try {
    // API call to forgotPassword
    const response = await fetch("https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.value }),
    });

    const data = await response.json();
    console.log(data);

    // Handle response
    if (!response.ok) throw new Error(data.message || "Failed to send reset password email.");

    errorMsg.style.color = "green";
    errorMsg.innerHTML = "Password reset email sent! Check your inbox.";
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.innerHTML = error.message || "Something went wrong. Please try again.";
  }
});

