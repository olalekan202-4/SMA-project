const username = document.querySelector(".username");
const username2 = document.querySelector(".username2");
const email = document.querySelector("#email-2");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const hiddenPassword = document.querySelector(".hidden-password");
const hiddenPassword2 = document.querySelector(".hidden-password2");
const passwordImage = document.getElementById('password-image');
const password2Image = document.getElementById('password2-image');
const gender = document.getElementById("gender");
const submit = document.querySelector("#submit");
const errorMsg = document.querySelector("#error");
const emailIcon = document.getElementById("email2-icon");
const userIcon = document.querySelectorAll(".password-icon");
const form = document.getElementById('form');


// hidden password field
hiddenPassword.addEventListener('click', function (e) {
  if (hiddenPassword.src === "./login-page/IMAGE/password-hidden-icon.png") {
    hiddenPassword.src= "./login-page/IMAGE/password-hidden-icon.png"; // Change to second image
  } else {
    hiddenPassword.src = "./login-page/IMAGE/password-view-icon.png"; // Change back to first image
  }

  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
  return hiddenPassword;

})


// hiddenPassword2
hiddenPassword2.addEventListener('click', function (e) {
  if (hiddenPassword2.src === "./login-page/IMAGE/password-hidden-icon.png") {
    hiddenPassword2.src= "../login-page/IMAGE/password-hidden-icon.png"; // Change to second image
  } else {
    hiddenPassword2.src = "../login-page/IMAGE/password-view-icon.png"; // Change back to first image
  }

  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
  } else {
    confirmPassword.type = "password";
  }
  return hiddenPassword2;

})

  // Add an event listener to detect input
  email.addEventListener("input", function () {
    // Remove the icon when the user starts typing
    if (email.value.length > 0) {
      emailIcon.classList.add("hidden"); // Add 'hidden' class to hide the icon
    } else {
      emailIcon.classList.remove("hidden"); // Show the icon again if the field is empty
    }
  });

    

  // password confirmation
  password.addEventListener('input', function() {
    if (password.value.length > 0) {
      passwordImage.classList.add("hidden"); // Show the password icon if the field is not empty
    } else {
      passwordImage.classList.remove("hidden"); // Hide the password icon if the field is empty

  }})
    
  // confirm the password
  confirmPassword.addEventListener('input', function() {
    if (confirmPassword.value.length > 0) {
      password2Image.classList.add("hidden"); // Show the password icon if the field is not empty
    } else {
      password2Image.classList.remove("hidden"); // Hide the password icon if the field is empty

      if (confirmPassword.value === '') {
        errorMsg.textContent = 'Confirm Password'; // Clear message if confirm password is empty
        // message.classList.add('error');
      } else if (password.value === confirmPassword.value) {
        message.textContent = 'Passwords match!';
        message.classList.add('success');
      } else {
        message.textContent = 'Passwords do not match.';
        // errorMsg.classList.add('error');
      }
    }});


  // username
  username.addEventListener('input', function() {
    if (username.value.length > 0) {
      userIcon[0].classList.add("hidden"); // Show the username icon if the field is not empty
    } else {
      userIcon[0].classList.remove("hidden"); // Hide the username icon if the field is empty
    }
  });

  // username2
  username2.addEventListener('input', function() {
    if (username2.value.length > 0) {
      userIcon[1].classList.add("hidden"); // Show the username icon if the field is not empty
    } else {
      userIcon[1].classList.remove("hidden"); // Hide the username icon if the field is empty
    }
  });


  

const handleClearError = () => {
errorMsg.innerHTML = "";
}


const handleResetFields = () => {
  username.value = "";
  username2.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  errorMsg.innerHTML = ""
}

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const upperCase = /[A-Z]/;
  const lowercase = /[a-z]/;
  const digit = /\d/;
  const special = /[@$!%*?&]/;

//////////////////////////////////field validations //////////////////////////////////////////
const handleDisplayError = (inputName, validationType="default") =>{
  if(validationType === "default") return errorMsg.innerHTML = `${inputName} is missing, kindly input and continue`;
  if(validationType === "email") return errorMsg.innerHTML = `${inputName} type is invalid, kindly input a valid ${inputName}!`;
  if(validationType === "password") return errorMsg.innerHTML = `${inputName} must have a minimum of 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.`;
}


const handleValidatePassword = (password) => {
let msg = "password must contain";
  if(!upperCase.test(password)) msg += " at least one uppercase,"
  if(!lowercase.test(password)) msg += " at least one lowercase,"
  if(!digit.test(password)) msg += " a digit,"
  if(!special.test(password)) msg += " a special character,"
  if(password.length < 8) msg += " password must be more than 8 letters"


  if(msg === "password must contain") return handleClearError();
  return errorMsg.innerHTML = msg;
}




//////////////////////////////////////event listeners //////////////////////////////////////////
password.addEventListener("input", function(e) {
  const pass = e.target.value;
  handleValidatePassword(pass);
})

const handleRedirection = (redirectPath) => {
  // Adjust for GitHub Pages by adding repository name
  const repoName = "SMA-project"; // Your GitHub repository name
  const fullRedirectPath = `/${repoName}${redirectPath}`;
  window.location.href = fullRedirectPath;
};



submit.addEventListener("click", async function (e) {
  e.preventDefault();

  // Validation checks
  if (!username.value) return handleDisplayError("First Name");
  if (!username2.value) return handleDisplayError("Last Name");
  if (!email.value || !emailRegex.test(email.value)) return handleDisplayError("Email", "email");
  if (!password.value || !passwordRegex.test(password.value)) return handleDisplayError("Password", "password");
  if (!confirmPassword.value || password.value !== confirmPassword.value) {
    errorMsg.style.color = "red";
    return (errorMsg.textContent = "Passwords do not match!");
  }
  if (!gender.value) return handleDisplayError("Gender");

  const formObj = {
    firstName: username.value,
    lastName: username2.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    const response = await fetch(
      "https://techcrush-subscription-management-app-api.onrender.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObj),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signup failed (Email already registered).");

    errorMsg.style.color = "green";
    errorMsg.textContent = "Signup successful! Redirecting to login page...";

    // Trigger the success alert
    alert("Sign-up successful! Redirecting to the login page...");

    handleSaveToStorage(formObj);

    // Redirect to login page after 2 seconds
    setTimeout(() => handleRedirection("/index1.html"), 2000); // Increase the timeout to 2 seconds to allow user to see the alert
  } catch (error) {
    errorMsg.style.color = "red";
    errorMsg.textContent = error.message || "Something went wrong.";
  }
});



// /////////// // setTimeout(() => (window.location.href = "../login-page/index.html"));//////////////////////////////saving to storage ////////////////////////////////
const handleSaveToStorage = (formObj) => {
  const userStorage = localStorage.getItem("user_storage");
  if(!userStorage) {
      const formString = JSON.stringify([formObj]);
      localStorage.setItem("user_storage", formString);
  }

  if(Storage) {
      const savedObj = JSON.parse(userStorage);
      const newSavedObj = [formObj, ...savedObj]//spread operator
      localStorage.setItem("user_storage", JSON.stringify(newSavedObj));
  }
  handleResetFields();
}

// Array of Nigeria states
// const nigeriaStates = [
//   "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
//   "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
//   "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", 
//   "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", 
//   "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", 
//   "Yobe", "Zamfara", "FCT"
// ];

// const stateDropdown = document.getElementById("state");

// // Populate the dropdown with states
// nigeriaStates.forEach((state) => {
//   const option = document.createElement("option");
//   option.value = state.toLowerCase(); // Lowercase value for convenience
//   option.textContent = state; // Display name
//   stateDropdown.appendChild(option);
// });
