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

//  document.addEventListener('DOMContentLoaded', function() {
//       // Sélectionne l'élément de lien d'inscription
//       var inscriptionLink = document.getElementById('register');

//       // Ajoute un gestionnaire d'événement au clic sur le lien d'inscription
//       inscriptionLink.addEventListener('click', function(event) {
//         // Empêche le comportement par défaut du lien (par exemple, la navigation)
//         event.preventDefault();

//         // Effectue la navigation vers la page d'inscription
//         window.location.href = '/register'; // Remplace '/inscription' par l'URL réelle de ta page d'inscription
//       });
//     });

//-------------------------------------------------------------------------------

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

//------------------------------------------------------------------------


function removePostButtonEventListener(event) {
    const buttonElement = event.target;
    const id = buttonElement.getAttribute('data-id');
    console.log(buttonElement);
    const options = {
        method: 'delete',
        headers: {
            'content-type': 'application/json'
        }
    };
    console.log(event);

    const url = `/posts/${id}`;

    fetch(url, options)
        .then(function(response) {
            if (response.ok) {
                // Récupérer la ligne à supprimer
                // const postElement = document.querySelector(`[data-id="${id}"]`);
                // postElement.remove();
                window.location.href = "/articles"
            }
            else {
                if (response.status === 403) {
                    window.location.href = '/';
                }
                else {
                    response.json().then(console.log);
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

    //----------------------------------------------------------------------------------

    function editPostEventListener(event) {
        event.preventDefault();
        const form = event.target.parentElement;
        const id = form.querySelector('input[name="id"]').value;
        const titre = form.querySelector('input[name="titre"]').value;
        const contenu = form.querySelector('textarea[name="contenu"]').value;

        const data = {
            id,
            titre,
            contenu
        };

        const options = {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const url = `/posts/${id}`;

        fetch(url, options)

            .then(function(response) {
                if (response.ok) {
                    console.log('edited');
                }
                else {
                    response.json().then(console.log);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //------------------------------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', function() {
        // Administration posts remove button listener
        const postRemoveButtonsList = document.querySelectorAll('.js-remove-post-button');

        if (postRemoveButtonsList.length > 0) {
            postRemoveButtonsList.forEach(function(postRemoveButton) {
                postRemoveButton.addEventListener('click', removePostButtonEventListener);
            });
        }

        // Edit post button event listener
        const editPostButton = document.querySelector('.js-post-edit-form .js-form-submit');
        if (editPostButton !== null) {
            editPostButton.addEventListener('click', editPostEventListener);
        }
    });

  //----------------------------------------------------------------------------
  
  // Sélection ldu bouton de recherche
const searchButton = document.querySelector('.searchBar');

// Définissez la fonction à exécuter lors du clic sur le bouton de recherche
function handleSearch() {
  // Récupérez la valeur du champ de recherche
  const searchInput = document.querySelector('#maRecherche').value;

  // Effectuez les actions de recherche appropriées
  // par exemple, effectuer une requête AJAX vers votre serveur

  // Exemple de console.log pour afficher la valeur de recherche
  console.log('Recherche effectuée:', searchInput);
}

// Ajoutez un écouteur d'événement de clic au bouton de recherche
searchButton.addEventListener('click', handleSearch);
