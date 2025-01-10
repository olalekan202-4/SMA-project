// Helper function to capitalize the first letter of a string
const capitalize = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

window.onload = () => {
  // Retrieve session data
  const userSession = sessionStorage.getItem("present_session");

  if (!allUsersData) {
    alert("No users found in localStorage. Redirecting to login page...");
    // window.location = "../login-page/index.html";
    return;
  }

  let allUsers;
  try {
    allUsers = JSON.parse(allUsersData);
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    alert("User data corrupted. Redirecting to login page...");
    window.location = "../login-page/index.html";
    return;
  }

  // Retrieve the current user's email
  const currentEmail = localStorage.getItem("current_user_email");

  if (!currentEmail) {
    alert("No logged-in user found. Redirecting to login page...");
    // window.location = "../login-page/index.html";
    return;
  }

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