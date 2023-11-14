function searchOnEnter(event) {
    if (event.key === "Enter") {
        search();
    }
}

function search() {
    var searchTerm = document.getElementById("searchInput").value;
    // Aggiungi qui la tua logica di ricerca con il termine di ricerca (searchTerm)
    // Esempio: alert("Esegui ricerca con termine: " + searchTerm);
}
