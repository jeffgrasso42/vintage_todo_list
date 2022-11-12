const newTodoForm = document.querySelector('#new-todo');
const newTodoInput = document.querySelector('#new-todo-input');
const logoutButton = document.querySelector('#logout');
const checkBoxes = document.querySelectorAll('input[type=checkbox]');

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener('click', async (e) => {
    const isChecked = e.target.checked;
    const todoId = e.target.getAttribute('data-todo-id');
    if (isChecked) {
      const updatedTodo = {
        complete: isChecked,
      };
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        e.target.checked = false;
      }
    }
  });
});

newTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newTodo = {
    title: newTodoInput.value.trim(),
  };
  const response = await fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    window.location.reload();
  }
});

logoutButton.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch('/api/users/logout', { method: 'GET' });
  if (response.status === 204) {
    window.location.replace('/');
  }
});
