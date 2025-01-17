window.onload = () => {
  try {
    // Retrieve user data from localStorage
    const userToken = localStorage.getItem("user_token");
    const userData = localStorage.getItem("user_data");

    console.log(userToken)

    if (!userToken || !userData) {
      throw new Error("User is not logged in or data is missing.");
    }

    // Parse the user data
    const user = JSON.parse(userData);

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
    // window.location = "../login-page/index.html";
  }
};
