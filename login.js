document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let isValid = true;
    
    if (email.trim() === '') {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    if (password.trim() === '') {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    if (isValid)
        window.location.href = 'dashboard.html';
});