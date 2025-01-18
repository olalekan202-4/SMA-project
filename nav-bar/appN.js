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
