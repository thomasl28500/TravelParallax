function redirectDestination(nomDestination) {
    const message = `Êtes-vous sûr de vouloir découvir ${nomDestination} ?`;
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;

    // Afficher la pop-up et l'overlay
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Bloquer le défilement de la page
    document.body.classList.add('no-scroll');

    // Gérer les boutons
    document.getElementById('confirmBtn').style.display = 'flex';

    document.getElementById('confirmBtn').onclick = () => {
        window.location.href = `${nomDestination}.html`; // Redirection vers la page HTML
        closePopup();
    };
    document.getElementById('cancelBtn').onclick = () => {
        closePopup();
    };
}

function errorDestination() {
    const message = "Aucun vol est prévu pour cette destination...";
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;

    // Afficher la pop-up et l'overlay
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    // Bloquer le défilement de la page
    document.body.classList.add('no-scroll');

    // Gérer les boutons
    document.getElementById('confirmBtn').style.display = 'none'; // Cacher le bouton "Oui"

    document.getElementById('cancelBtn').onclick = () => {
        closePopup();
    };
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Réactiver le défilement de la page
    document.body.classList.remove('no-scroll');
}
