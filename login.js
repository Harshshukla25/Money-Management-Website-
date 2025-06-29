document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const enteredUsername = document.getElementById('loginUsername').value;
    const enteredPassword = document.getElementById('loginPassword').value;
    const enteredEmail = document.getElementById('loginEmail').value; 
  
    // Get stored username and password from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedEmail = localStorage.getItem('email');
  
    // Check if the entered credentials match the stored ones
    if (enteredUsername === storedUsername && enteredPassword === storedPassword && enteredEmail===storedEmail) {
      localStorage.setItem('isLoggedIn', true);
      window.location.href = "index1.html";  // Redirect to welcome page after successful login
    } else if(enteredUsername === storedUsername && enteredPassword === storedPassword && enteredEmail!=storedEmail){
        document.getElementById('loginErrorMessageEmail').style.display = 'block';
    }else if(enteredUsername === storedUsername && enteredPassword != storedPassword && enteredEmail===storedEmail){
        document.getElementById('loginErrorMessagePassword').style.display = 'block';
    }
    else {
      document.getElementById('loginErrorMessage').style.display = 'block';
    }
  });

  
document.querySelector(".forget").addEventListener("click", function () {
  const username = prompt("Enter your username to retrieve your password:");
  if (localStorage.getItem(username)) {
    const storedPassword = JSON.parse(localStorage.getItem(username)).password;
    alert("Your password is: " + storedPassword);
  } else {
    alert("Username not found!");
  }
})