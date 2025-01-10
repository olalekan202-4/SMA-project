let form = document.getElementById("form");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("hey");
  const response = await fetch(
    "https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "ade",
        lastName: "ola",
        email: "exa@yahoo.com",
        password: "value",
        confirmPassword: "value1",
      }),
    },
  );
  const data = await response.json();
  console.log(data);
});
