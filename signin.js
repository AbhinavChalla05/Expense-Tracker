function validateForm(event) {
    event.preventDefault();
    
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';
    
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;
    
    if (name.trim() === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }
    if (email.trim() === '') {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    if (password.trim() === '') {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }
    if (isValid)
        window.location.href = 'dashboard.html';
    return false;
}