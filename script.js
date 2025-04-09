// Selecting DOM elements
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const resultsDiv = document.getElementById('results-div');

// Regular expression to validate US phone numbers
const usPhoneNumberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

// Function to validate phone number
function validatePhoneNumber(phoneNumber) {
  return usPhoneNumberRegex.test(phoneNumber);
}

// Event listener for the "Check" button
checkBtn.addEventListener('click', () => {
  const inputValue = userInput.value.trim();

  // Check if input is empty
  if (!inputValue) {
    alert('Please provide a phone number');
    return;
  }

  // Validate the phone number
  if (validatePhoneNumber(inputValue)) {
    resultsDiv.textContent = `Valid US number: ${inputValue}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${inputValue}`;
  }
});

// Event listener for the "Clear" button
clearBtn.addEventListener('click', () => {
  userInput.value = ''; // Clear the input field
  resultsDiv.textContent = ''; // Clear the results display
});