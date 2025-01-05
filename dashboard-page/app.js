// Helper function to capitalize the first letter of a string
const capitalize = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

window.onload = () => {
  // Retrieve session data
  const userSession = sessionStorage.getItem("present_session");

  // Check if user session exists
  if (userSession) {
    const userDetails = JSON.parse(userSession);
    const { firstName, lastName } = userDetails;

    // Capitalize first and last name before displaying
    const formattedFirstName = capitalize(firstName);
    const formattedLastName = capitalize(lastName);

    // Display user's first and last name
    document.getElementById("username").textContent = `Hello, ${formattedFirstName} ${formattedLastName}`;
    document.getElementById("username2").textContent = `${formattedFirstName} ${formattedLastName},`;
  } else {
    // Redirect to login page if no session is found
    alert("You are not logged in. Redirecting to login page...");
    window.location = "../login-page/index.html";
  }
};