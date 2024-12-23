const hiddenPassword = document.getElementById('hidden-password');
const passwordField = document.getElementById('password');
const passwordImage = document.getElementById('password-image');
const loginSubmit = document.querySelector("#submit-login");
const errorMsg = document.querySelector("#error");

// hidden password field
hiddenPassword.addEventListener('click', function (e) {
  if (hiddenPassword.src === "IMAGE/password-hidden-icon.png") {
    hiddenPassword.src= "IMAGE/password-hidden-icon.png"; // Change to second image
  } else {
    hiddenPassword.src = "IMAGE/password-view-icon.png"; // Change back to first image
  }

  if (passwordField.type === "password") {
    passwordField.type = "text";
  } else {
    passwordField.type = "password";
  }
  return hiddenPassword;

})

const emailInput = document.getElementById("email");
const emailIcon = document.getElementById("email-image");

    // Add an event listener to detect input
    emailInput.addEventListener("input", function () {
      // Remove the icon when the user starts typing
      if (emailInput.value.length > 0) {
        emailIcon.classList.add("hidden"); // Add 'hidden' class to hide the icon
      } else {
        emailIcon.classList.remove("hidden"); // Show the icon again if the field is empty
      }
    });

    passwordField.addEventListener('input', function() {
      if (passwordField.value.length > 0) {
        passwordImage.classList.add("hidden"); // Show the password icon if the field is not empty
      } else {
        passwordImage.classList.remove("hidden"); // Hide the password icon if the field is empty
  
    }})

    

const handleDisplayError = (inputName, validationType="default") => {
  if(validationType === "default") return errorMsg.innerHTML = `${inputName} is missing, kindly input and continue`;
  if(validationType === "email") return errorMsg.innerHTML = `${inputName} type is invalid, kindly input a valid ${inputName}!`;
  if(validationType === "password") return errorMsg.innerHTML = `${inputName} must have a minimum of 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.`;
}


loginSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if(emailInput.value === "") return handleDisplayError("Email");


  if(passwordField.value === "") return handleDisplayError("Password");
  const savedObj = localStorage.getItem("user_storage");
  if(savedObj) {
      const savedData = JSON.parse(savedObj);
      const isEmailExist = savedData.find(users => users.email === emailInput.value);


      if(!isEmailExist) return errorMsg.innerHTML = `${emailInput.value} does not exist, kindly check the email or create a new account`;
      handleClearError();


      if(isEmailExist) {
        const isPasswordCorrect = isEmailExist.password === passwordField.value;
            if(!isPasswordCorrect) return errorMsg.innerHTML = `Password is incorrect, kindly check the password or use forgot password`;
            handleClearError();
            alert("Login successful, Redirecting you to Dash Board.....");
            handleRedirection("../dashboard-page/index.html");
            handleSaveSession(isEmailExist);
        }
    }
    errorMsg.innerHTML = `${email.value} does not exist, kindly check the email or create a new account`;
});


const handleSaveSession = (details) => {
    sessionStorage.setItem("present_session", JSON.stringify(details));
}
const handleClearError = () => {
    errorMsg.innerHTML = "";
}


const handleRedirection = (redirectUrl) => {
    window.location = redirectUrl;
}

