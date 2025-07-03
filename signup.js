document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const email= document.getElementById('signupEmail').value;
  
    if (username && password && email) {
      // Store the username and password in localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('email', email);
      alert('Sign Up successful! You can now log in.');
      window.location.href = "login.html";  // Redirect to the login page
    } else {
      document.getElementById('signupErrorMessage').style.display = 'block';
    }
  });

 