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

document.addEventListener('DOMContentLoaded', function () {
    const cartLogo = document.querySelector('.cart-logo');
    const cartMenu = document.querySelector('.cart-menu');

    // Aggiungi un gestore di eventi al clic del logo del carrello
    cartLogo.addEventListener('click', function () {
        // Mostra o nascondi il menu del carrello
        cartMenu.classList.toggle('show');
    });
});

document.getElementById("close-cart-menu").addEventListener("click", function(event) {
    // Impedisce la propagazione dell'evento clic al contenitore del menu
    event.stopPropagation();

    var cartMenu = document.querySelector(".cart-menu");
    var overlay = document.getElementById("overlay");

    // Chiudi il menu e nascondi l'overlay
    cartMenu.classList.remove("show");
    overlay.style.display = "none";
});
