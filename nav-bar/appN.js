// Function to toggle the sidebar visibility
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const mainContainer = document.querySelector('.main-container');
  const topNavbar = document.querySelector('.top-navbar');

  // Toggle sidebar visibility
  sidebar.classList.toggle('collapsed');

  // Adjust main container and top navbar
  mainContainer.classList.toggle('collapsed');
  topNavbar.classList.toggle('full-width');
}

// Event listener to update the profile picture in the navbar when it's changed in settings
window.addEventListener("DOMContentLoaded", () => {
  const navbarProfilePicture = document.querySelector("#navbar-profile-picture");

  // Check if the profile picture exists in localStorage and display it
  const savedPicture = localStorage.getItem("profile_picture");
  if (savedPicture && navbarProfilePicture) {
    navbarProfilePicture.src = savedPicture; // Set the profile image in the navbar
  }
});

// Listen for the profile picture update event triggered from settings.js
window.addEventListener("updateNavbarPicture", () => {
  const navbarProfilePicture = document.querySelector("#navbar-profile-picture");

  const savedPicture = localStorage.getItem("profile_picture");
  if (savedPicture && navbarProfilePicture) {
    navbarProfilePicture.src = savedPicture; // Update the profile picture in the navbar
  }
});


window.onload = () => {
  try {
    // Retrieve user data from localStorage
    const userStorage = localStorage.getItem("user_storage");

    if (!userStorage) {
      throw new Error("User is not logged in or user data is missing.");
    }

    // Parse the user data (assuming the most recent user is the first in the array)
    const users = JSON.parse(userStorage);
    const user = users[0]; // Get the latest user from the storage

    // Validate user data structure
    if (!user.firstName || !user.lastName) {
      throw new Error("User data is incomplete.");
    }

    // Capitalize and display the first and last name
    const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const firstName = capitalize(user.firstName);
    const lastName = capitalize(user.lastName);

    // Display the user name on the page
    const usernameElement = document.getElementById("username");
    const username2Element = document.getElementById("username2");

    if (usernameElement && username2Element) {
      usernameElement.textContent = `Hello, ${firstName} ${lastName}`;
      username2Element.textContent = `${firstName} ${lastName},`;
    } else {
      console.error("Username elements not found in the DOM.");
      alert("Sorry, we couldn't display your name. Please try refreshing the page.");
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("An error occurred: " + error.message);
    // Redirect to login page if there's an error
    window.location.href = "/SMA-project/index.html"; // Update with your GitHub Pages path
  }
};
