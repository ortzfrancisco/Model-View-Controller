const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("sign up")
  
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();
  
    console.log(username, email, password)
  
    if (username && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords must match")
      } else {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        localStorage.setItem("userId", data.id)
        document.location.replace('/dashboard');
      } else {
        console.log(response)
        alert('Failed to sign up.');
      }
    }
    }
  };
  
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);