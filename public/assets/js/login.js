const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const user = {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      window.location.replace('/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
});
