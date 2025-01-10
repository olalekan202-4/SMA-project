window.onload = () => {
  // Retrieve all users from localStorage
  const allUsersData = localStorage.getItem("user_storage");
  console.log(allUsersData);

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

  // Find the matching user
  const matchingUser = allUsers.find(
    (user) => user.email.toLowerCase() === currentEmail.toLowerCase()
  );

  if (!matchingUser) {
    alert("User not found. Redirecting to login page...");
    // window.location = "../login-page/index.html";
    return;
  }

  // Capitalize names and display them
  const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const firstName = capitalize(matchingUser.firstName);
  const lastName = capitalize(matchingUser.lastName);

  document.getElementById("username").textContent = `Hello, ${firstName} ${lastName}`;
  document.getElementById("username2").textContent = `${firstName} ${lastName},`;
};
