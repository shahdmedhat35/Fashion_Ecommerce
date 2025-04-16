let loggedIn = false;

function register() {
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[email] = { password, firstName, lastName };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully!');
    window.location.href = 'login.html';
}