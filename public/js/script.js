var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
  sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  sidenav.classList.remove("active");
}

//------------------------------------------------------------------------------


 document.addEventListener('DOMContentLoaded', function() {
      // Sélectionne l'élément de lien d'inscription
      var inscriptionLink = document.getElementById('register');
      
      // Ajoute un gestionnaire d'événement au clic sur le lien d'inscription
      inscriptionLink.addEventListener('click', function(event) {
        // Empêche le comportement par défaut du lien (par exemple, la navigation)
        event.preventDefault();

        // Effectue la navigation vers la page d'inscription
        window.location.href = '/register'; // Remplace '/inscription' par l'URL réelle de ta page d'inscription
      });
    });
