const registrationForm = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newUser = {
    username: usernameInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      window.location.replace('/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
});
