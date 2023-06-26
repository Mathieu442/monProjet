//Gestion de la Nav Barre

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

//Ajout d'un gestionnaire d'événements click à chaque bouton. Lorsque le bouton est cliqué, nous récupérons l'ID de l'article à partir de l'attribut data-article-id et nous pouvons effectuer une action supplémentaire en fonction de cet ID (par exemple, effectuer une requête AJAX vers le serveur pour obtenir plus de détails sur l'article).

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


document.addEventListener('DOMContentLoaded', () => {
  const articleImg = document.querySelectorAll('.article_img');

  articleImg.forEach(button => {
    button.addEventListener('click', () => {
      const articleId = button.getAttribute('contenu-article-id');
      // Effectuez une action supplémentaire en fonction de l'ID de l'article
      // par exemple, effectuer une requête AJAX vers le serveur pour obtenir plus de détails sur l'article
      console.log('Article ID:', articleId);
    });
  });
});