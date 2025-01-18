// Elements
const profilePictureInput = document.getElementById("change-pics");
const saveChangesButton = document.querySelector(".button-save");
const resetPasswordButton = document.querySelector(".settings-input button");
const deleteAccountButton = document.querySelector(".settings-input button:nth-child(3)");

// Input fields
const nameInput = document.querySelector("input[placeholder='your name']");
const usernameInput = document.querySelector("input[placeholder='user name']");
const emailInput = document.querySelector("input[placeholder='email@yahoo.com']");
const addressInput = document.querySelector("input[placeholder='address']");
const phoneInput = document.querySelector("input[placeholder='phone number']");
const prevPasswordInput = document.querySelector("input[placeholder='Previous Password']");
const newPasswordInput = document.querySelector("input[placeholder='Change Password']");

// Save profile picture to localStorage
profilePictureInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      localStorage.setItem("profile_picture", base64Image);
      alert("Profile picture updated successfully!");
      
      // Optionally, trigger an event or callback to update the navbar
      const navbarPicture = new Event("updateNavbarPicture");
      window.dispatchEvent(navbarPicture);  // Trigger update for navbar
    };
    reader.readAsDataURL(file);
  }
});

// Load saved profile picture from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedPicture = localStorage.getItem("profile_picture");
  if (savedPicture) {
    const img = document.querySelector("img[alt='profile-picture']");
    img.src = savedPicture;
  }
});

// API Endpoints
const BASE_URL = "https://techcrush-subscription-management-app-api.onrender.com/api/v1";
const DELETE_PROFILE_URL = `${BASE_URL}/deleteProfile`;
const UPDATE_PROFILE_URL = `${BASE_URL}/updateProfile`;
const UPDATE_PASSWORD_URL = `${BASE_URL}/updatePassword`;

// Function to handle API requests
const apiRequest = async (url, method, body) => {
  try {
    const token = localStorage.getItem("user_token");
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }
    return data;
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(error);
    throw error;
  }
};

// Save Changes (Update Profile)
saveChangesButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const profileData = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    address: addressInput.value.trim(),
    phoneNumber: phoneInput.value.trim(),
  };

  try {
    const data = await apiRequest(UPDATE_PROFILE_URL, "PATCH", profileData);
    alert("Profile updated successfully!");
    console.log("Updated Profile:", data);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
});

// Reset Password
resetPasswordButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const passwordData = {
    oldPassword: prevPasswordInput.value.trim(),
    newPassword: newPasswordInput.value.trim(),
  };

  try {
    const data = await apiRequest(UPDATE_PASSWORD_URL, "PATCH", passwordData);
    alert("Password updated successfully!");
    console.log("Password Update Response:", data);
  } catch (error) {
    console.error("Error updating password:", error);
  }
});

// Delete Account
deleteAccountButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
    return;
  }

  try {
    const data = await apiRequest(DELETE_PROFILE_URL, "DELETE", {});
    alert("Account deleted successfully!");
    console.log("Account Deletion Response:", data);

    // Clear local storage and redirect to login
    localStorage.clear();
    window.location.href = "../login-page/index.html";
  } catch (error) {
    console.error("Error deleting account:", error);
  }
});
