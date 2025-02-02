// window.onload = () => {
//   try {
//     // Retrieve user data from localStorage
//     const userStorage = localStorage.getItem("user_storage");

//     if (!userStorage) {
//       throw new Error("User is not logged in or user data is missing.");
//     }

//     // Parse the user data (assuming the most recent user is the first in the array)
//     const users = JSON.parse(userStorage);
//     const user = users[0]; // Get the latest user from the storage

//     // Validate user data structure
//     if (!user.firstName || !user.lastName) {
//       throw new Error("User data is incomplete.");
//     }

//     // Capitalize and display the first and last name
//     const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
//     const firstName = capitalize(user.firstName);
//     const lastName = capitalize(user.lastName);

//     // Display the user name on the page
//     const usernameElement = document.getElementById("username");
//     const username2Element = document.getElementById("username2");

//     if (usernameElement && username2Element) {
//       usernameElement.textContent = `Hello, ${firstName} ${lastName}`;
//       username2Element.textContent = `${firstName} ${lastName},`;
//     } else {
//       console.error("Username elements not found in the DOM.");
//       alert("Sorry, we couldn't display your name. Please try refreshing the page.");
//     }
//   } catch (error) {
//     console.error("Error:", error.message);
//     alert("An error occurred: " + error.message);
//     // Redirect to login page if there's an error
//     window.location.href = "/SMA-project/index.html"; // Update with your GitHub Pages path
//   }
// };
