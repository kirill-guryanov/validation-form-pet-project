const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const regEx = new RegExp([
    '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|',
    ' (".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
    '[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  ].join(""));

  if (regEx.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    const emptyInput = input.value.trim() === "";

    emptyInput
      ? showError(input,`${getFieldName(input)} is required`)
      : showSuccess(input)
  })
}

// Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
      showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
      showSuccess(input);
    }
}

// Check password match
function checkPasswordMatch(inputOne, inputTwo) {
  if (inputOne.parentNode.classList.contains("error")) {
    showError(inputTwo, "");
  }

  if (inputOne.value !== inputTwo.value) {
    showError(inputTwo, "Passwords do not match")
  }
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2)
})