window.onload = async () => {
  try {
    // Assume the user has entered login credentials (email and password).
    const email = "user@example.com";  // Example email (replace with actual value).
    const password = "userPassword";   // Example password (replace with actual value).

    // Make a login request to the API to retrieve the token
    const loginResponse = await fetch("https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.statusText}`);
    }

    const loginData = await loginResponse.json();
    const userToken = loginData.token;  // Assuming the token is in the 'token' field

    // Store the token in localStorage (or another appropriate storage method)
    localStorage.setItem("user_token", userToken);

    // Fetch user data from the dashboard API using the retrieved token
    const dashboardResponse = await fetch(
      "https://techcrush-subscription-management-app-api.onrender.com/api/v1/user/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Use the retrieved token
        },
      }
    );

    if (!dashboardResponse.ok) {
      throw new Error(`Error fetching user data: ${dashboardResponse.statusText}`);
    }

    const dashboardData = await dashboardResponse.json();
    console.log("Dashboard Data:", dashboardData);

    // Extract first and last name from the response data (adjust if needed)
    const user = dashboardData.user;
    if (!user || !user.firstName || !user.lastName) {
      alert("User data is incomplete.");
      return;
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
    }

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
};
