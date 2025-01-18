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
