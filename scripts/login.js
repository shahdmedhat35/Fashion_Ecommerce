
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email] && users[email].password === password) {
        localStorage.setItem('loggedInUser', JSON.stringify(users[email]));
        loggedIn = true;
        localStorage.setItem('loggedIn', loggedIn); 
        window.location.href = 'loggedin.html';
    } else {
        alert('Invalid email or password.');
    }
}
