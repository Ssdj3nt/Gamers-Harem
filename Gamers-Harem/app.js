document.getElementById('mobile-menu').addEventListener('click', function () {
    var nav = document.querySelector('.nav');
    nav.classList.toggle('show');

    // Aggiungi o rimuovi la classe sulla navbar in base allo stato della nav
    var navbar = document.querySelector('.navbar');
    if (nav.classList.contains('show')) {
        navbar.style.borderRadius = '15px 15px 0px 0px'; // Rimuovi il border-radius quando il menu è aperto
    } else {
        navbar.style.borderRadius = '15px'; // Imposta il border-radius quando il menu è chiuso
    }
});
