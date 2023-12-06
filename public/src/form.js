function closeValidationBox(boxId) {
  document.getElementById(boxId).style.display = "none";
}

function showSuccessMessage() {
  const successBox = document.getElementById("successBox");
  successBox.style.display = "block";
  setTimeout(() => {
    closeValidationBox("successBox");
  }, 3000);
}

function showErrorMessage() {
  const errorBox = document.getElementById("errorBox");
  errorBox.style.display = "block";
}

function validateForm(e) {
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("email").value;

  const invalidName = document.querySelector(".invalidName");
  const invalidEmail = document.querySelector(".invalidEmail");

  const errorMessage = document.querySelector("#errorMessage");
  if (!/^[a-z]/gi.test(name) || name.length > 30) {
    e.preventDefault();

    errorMessage.innerText =
      "Please enter a valid name.\n*No special characters\n*No longer than 30 letters";
    console.error("Invalid name");
    showErrorMessage();
    return;
  }

  if (!/^[\w.-_]*@[\w]*\.[\w]*$/gi.test(email) || email.length > 40) {
    e.preventDefault();

    errorMessage.innerText = "Please enter a valid E-mail format.";
    showErrorMessage();
    return;
  }

  invalidEmail.innerText = "";
  invalidName.innerText = "";
  showSuccessMessage();
  console.log("Validation passed. Submitting the form...");
}
