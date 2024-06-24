// Get form elements
const nameInput = document.getElementById("floatingName");
const surnameInput = document.getElementById("floatingSurname");
const emailInput = document.getElementById("floatingEmail");
const commentsInput = document.getElementById("floatingComments");
const ratingInputs = document.querySelectorAll("input[name='rating']");
const satisfactionInputs = document.querySelectorAll("input[name='satisfaction']");
const form = document.querySelector("form");
const faceHearth = document.querySelector(".fa-face-grin-hearts");
const faceSmile = document.querySelector('.fa-face-smile');
const faceNeutral = document.querySelector('.fa-face-meh');
const faceUpset = document.querySelector('.fa-face-angry');
const faceSad = document.querySelector('.fa-face-sad-tear');


// Add event listener to form submit event
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Perform validation checks
  let isValid = true;

  // Check if name is empty
  if (nameInput.value.trim() === "") {
    alert("Please enter your name.");
    isValid = false;
  }

  // Check if surname is empty
  if (surnameInput.value.trim() === "") {
    alert("Please enter your last name.");
    isValid = false;
  }

  // Check if email is empty or invalid
  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
    alert("Please enter a valid email address.");
    isValid = false;
  }

  // Check if comments are empty
  if (commentsInput.value.trim() === "") {
    alert("Please enter your comments.");
    isValid = false;
  }

  // Check if rating is selected
  if (!Array.from(ratingInputs).some(input => input.checked)) {
    alert("Please select a rating.");
    isValid = false;
  }

  // Check if satisfaction is selected
  if (!Array.from(satisfactionInputs).some(input => input.checked)) {
    alert("Please select your satisfaction level.");
    isValid = false;
  }

  // If all validations pass, submit the form
  if (isValid) {
    // Perform form submission logic here
    alert("Form submitted successfully!");
  }
});

// Helper function to validate email format
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


