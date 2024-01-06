function toggleMenu(menuId) {
    var nav = document.querySelector('.nav');
    var loginBox = document.querySelector('.login-box');
    var navbar = document.querySelector('.navbar');

    if (menuId === 'mobile-menu') {
        loginBox.classList.remove('show');
        nav.classList.toggle('show');
    } else if (menuId === 'login-menu') {
        nav.classList.remove('show');
        loginBox.classList.toggle('show');
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
        passwordToggle.innerHTML = '<img src="../static/eye.png" alt="Hide Password">';
    } else {
        passwordInput.type = 'password';
        passwordToggle.innerHTML = '<img src="../static/eye-closed.png" alt="Show Password">';
    }
}

function hideContentWhenLoginBoxOpen() {
    if (!(window.location.pathname.endsWith('utente.html'))) {
        var loginBox = document.querySelector('.login-box');
        var mobileMenu = document.querySelector('.mobile-menu');
        var container = document.querySelector('.container');
        var bottomArea = document.querySelector('.bottom-area');

        if (loginBox.classList.contains('show')) {
            container.style.display = 'none';
            bottomArea.style.display = 'none';
        } else if (!(loginBox.classList.contains('show'))) {
            container.style.display = 'block';
            bottomArea.style.display = 'block';
        } else if (mobileMenu.classList.contains('show')) {
            container.style.display = 'block';
            bottomArea.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    hideContentWhenLoginBoxOpen();
});
document.getElementById('login-menu').addEventListener('click', function () {
    hideContentWhenLoginBoxOpen();
});
document.getElementById('mobile-menu').addEventListener('click', function () {
    hideContentWhenLoginBoxOpen();
});


function findGameUrlInDatabase(query) {
    const games = [
        {name: 'Battlefield 2042', url: 'battle'},
        {name: 'Black Desert', url: 'bdo'},
        {name: 'Baldur\'s Gate', url: 'bg3'},
        {name: 'Diablo 4', url: 'diablo'},
        {name: 'Forza Horizon 5', url: 'fh5'},
        {name: 'Monster Hunter Rise', url: 'mhr'},
        {name: 'Spider Man', url: 'spider'},
        {name: 'Starfield', url: 'star'},
        {name: 'Zelda', url: 'zel'}
    ];

    const lowercaseQuery = query.toLowerCase();

    for (const game of games) {
        if (game.name.toLowerCase().includes(lowercaseQuery)) {
            return game.url;
        }
    }
    return null;
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  showInstallButton();
});

function showInstallButton() {
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';
  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('L\'utente ha accettato l\'installazione');
      } else {
        console.log('L\'utente ha rifiutato l\'installazione');
      }
      deferredPrompt = null;
    });
  });
}
