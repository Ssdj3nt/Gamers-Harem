function toggleMenu(menuId) {
    var nav = document.querySelector('.nav');
    var loginBox = document.querySelector('.login-box');
    var navbar = document.querySelector('.navbar');
    var container = document.querySelector('.container');
    var bottomarea = document.querySelector('.bottom-area');

    if (menuId === 'mobile-menu') {
        loginBox.classList.remove('show');
        nav.classList.toggle('show');
        container.style.display = nav.classList.contains('show') ? 'block' : 'none';
        bottomarea.style.display = nav.classList.contains('show') ? 'block' : 'none';
    } else if (menuId === 'login-menu') {
        nav.classList.remove('show');
        loginBox.classList.toggle('show');
        container.style.display = loginBox.classList.contains('show') ? 'none' : 'block';
        bottomarea.style.display = nav.classList.contains('show') ? 'block' : 'none';
    }

    if (!nav.classList.contains('show') && !loginBox.classList.contains('show')) {
        container.style.display = 'block';
        bottomarea.style.display = 'block';
    }

    if (nav.classList.contains('show') || loginBox.classList.contains('show')) {
        navbar.style.borderRadius = '15px 15px 0px 0px';
    } else {
        navbar.style.borderRadius = '15px';
    }
}

document.getElementById('mobile-menu').addEventListener('click', function () {
    toggleMenu('mobile-menu');
});
document.getElementById('login-menu').addEventListener('click', function () {
    toggleMenu('login-menu');
});

function openModal() {
    var overlay = document.getElementById('overlay');
    var modal = document.getElementById('myModal');
    var body = document.body;

    overlay.style.display = 'block';
    modal.style.display = 'block';
    body.classList.add('grayed-out');
    body.style.overflow = 'hidden';
}
function closeModal() {
    var overlay = document.getElementById('overlay');
    var modal = document.getElementById('myModal');
    var body = document.body;

    overlay.style.display = 'none';
    modal.style.display = 'none';
    body.classList.remove('grayed-out');
    body.style.overflow = 'auto';
}
function openRegisterModal() {
    closeModal();
    var overlayRegister = document.getElementById('overlayRegister');
    var registerModal = document.getElementById('registerModal');
    var body = document.body;

    document.getElementById('registerEmail').value = '';
    document.getElementById('registerNickname').value = '';
    document.getElementById('registerPassword').value = '';

    overlayRegister.style.display = 'block';
    registerModal.style.display = 'block';
    body.classList.add('grayed-out');
    body.style.overflow = 'hidden';
}
function closeRegisterModal() {
    var overlayRegister = document.getElementById('overlayRegister');
    var registerModal = document.getElementById('registerModal');
    var body = document.body;

    overlayRegister.style.display = 'none';
    registerModal.style.display = 'none';
    body.classList.remove('grayed-out');
    body.style.overflow = 'auto';
}
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('registerPassword');
    var passwordToggle = document.querySelector('.password-toggle');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle.innerHTML = '<img src="eye-closed.png" alt="Hide Password">';
    } else {
        passwordInput.type = 'password';
        passwordToggle.innerHTML = '<img src="eye.png" alt="Show Password">';
    }
}
