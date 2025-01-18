// DOM Element References
const hiddenPassword = document.getElementById("hidden-password");
const passwordField = document.getElementById("password");
const passwordImage = document.getElementById("password-image");
const loginSubmit = document.querySelector("#submit-login");
const errorMsg = document.querySelector("#error");
const forgetPassword = document.querySelector("#forget-password");
const emailInput = document.getElementById("email");
const emailIcon = document.getElementById("email-image");

// Toggle Password Visibility
hiddenPassword.addEventListener("click", () => {
  const isPasswordHidden = passwordField.type === "password";
  passwordField.type = isPasswordHidden ? "text" : "password";
  hiddenPassword.src = isPasswordHidden
    ? "./login-page/IMAGE/password-view-icon.png" // View icon
    : "./login-page/IMAGE/password-hidden-icon.png"; // Hidden icon
});

// Hide/Show Email Icon Based on Input
emailInput.addEventListener("input", () => {
  emailIcon.classList.toggle("hidden", emailInput.value.length > 0);
});

// Hide/Show Password Icon Based on Input
passwordField.addEventListener("input", () => {
  passwordImage.classList.toggle("hidden", passwordField.value.length > 0);
});

// Helper Functions
const handleDisplayError = (inputName, validationType = "default") => {
  const errorMessage =
    validationType === "email"
      ? `${inputName} type is invalid, kindly input a valid ${inputName}!`
      : `${inputName} is missing, kindly input and continue`;
  errorMsg.textContent = errorMessage;
};

const handleClearError = () => {
  errorMsg.textContent = "";
};

const handleRedirection = (redirectPath) => {
  const repoName = "SMA-project";
  const fullRedirectPath = `/${repoName}${redirectPath}`;
  window.location.href = fullRedirectPath;
};

const handleSaveToLocalStorage = (data) => {
  localStorage.setItem("user_token", data.token);
  localStorage.setItem("user_data", JSON.stringify(data.user));
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Handle Login Form Submission
loginSubmit.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordField.value.trim();

  if (!email) return handleDisplayError("Email");
  if (!validateEmail(email)) return handleDisplayError("Email", "email");
  if (!password) return handleDisplayError("Password");

  const loginData = { email, password };

  try {
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

    handleSaveToLocalStorage(data);

    handleClearError();
    alert("Login successful! Redirecting you to the Dashboard...");
    handleRedirection("/indexD.html"); // Redirect to dashboard page
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.textContent = error.message || "Something went wrong. Please try again.";
  }
});

// Handle Forgot Password
forgetPassword.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  if (!email) return handleDisplayError("Email");

  try {
    const response = await fetch(
      "https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/forgotPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to send reset password email.");

    errorMsg.style.color = "green";
    errorMsg.textContent = "Password reset email sent! Check your inbox.";
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.textContent = error.message || "Something went wrong. Please try again.";
  }
});
