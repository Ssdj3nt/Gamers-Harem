function toggleMenu(menuId) {
    var nav = document.querySelector('.nav');
    var loginBox = document.querySelector('.login-box');
    var navbar = document.querySelector('.navbar');
    var container = document.querySelector('.container');
    var bottom = document.querySelector('.bottom-area');

    if (menuId === 'mobile-menu') {
        loginBox.classList.remove('show');
        nav.classList.toggle('show');

        container.style.display = nav.classList.contains('show') ? 'block' : 'none';
        bottom.style.display = nav.classList.contains('show') ? 'block' : 'none';
    } else if (menuId === 'login-menu') {
        nav.classList.remove('show');
        loginBox.classList.toggle('show');

        container.style.display = loginBox.classList.contains('show') ? 'none' : 'block';
        bottom.style.display = loginBox.classList.contains('show') ? 'none' : 'block';
    }

    if (!nav.classList.contains('show') && !loginBox.classList.contains('show')) {
        container.style.display = 'block';
        bottom.style.display = 'block';
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


