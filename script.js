document.getElementById("check-btn").addEventListener("click", function() {
    var inputValue = document.getElementById("text-input").value;
    
    // Requirement 4: Alert if no value is provided.
    if (inputValue.trim() === "") {
      alert("Please input a value");
      return;
    }
    
    // Save the original text to include in the result.
    var originalText = inputValue;
    
    // Remove all non-alphanumeric characters and convert to lower-case.
    var sanitized = inputValue.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    
    // Reverse the sanitized string.
    var reversed = sanitized.split("").reverse().join("");
    
    // Check if the string is a palindrome.
    var message = (sanitized === reversed)
      ? originalText + " is a palindrome"
      : originalText + " is not a palindrome";
    
    // Display the result.
    document.getElementById("result").textContent = message;
  });