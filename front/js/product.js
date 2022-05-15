// https://qastack.fr/programming/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
// Ici on recupere l'id du produit depuis l'url avec serachparams

const params = (new URL(document.location)).searchParams;
const id = params.get("_id");

const confirmation = document.querySelector("button");
const nom = document.getElementById("title");
const img = document.querySelector(".item__img");



main();

function main () {
  getArticleAPI();
  add_To_Cart();
}



// ICI on a appele l'api pour récuperer le produit via l'id en fin d'url
function getArticleAPI () {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => product(data))
    .catch((error) => {
      document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + error);
    });
    
}
  
 // AFFICHAGE D'UN PRODUIT UNIQUE GRACE A SON ID

function product (article) {

  // déclaration des variables, on fait pointer sur l'id du html de chaque elements
  let image = document.querySelector(".item__img")
  let name = document.getElementById("title")
  let price = document.getElementById("price")
  let description = document.getElementById("description")
  let colors = document.getElementById("colors")

  // Ici on injecte les données avec innerHtml
  image.innerHTML = `<img src="${article.imageUrl}">`
  name.innerHTML = `${article.name}`
  price.innerHTML = `${article.price}`
  description.innerHTML = `${article.description}`

// Creation du boucle for of pour afficher autant de fois que l'api nous retourne de couleurs 
  for (let color of article.colors) {

// injection des couleurs avec innerhtml 
    colors.innerHTML += `
    <option value="${color}">${color}</option>
    `
  } 
};



// FONCTION D'AJOUT  AU PANIER 

function add_To_Cart (article) {
  
  addToCart.onclick = () => {

    // On verifier que la couleur ainsi que la quantité est séléctionné avant de continuer
    if (quantity.value > 0 && quantity.value < 100 && colors.value != "") {

      // Déclaration des elements a ajouter dans le local
      const productAdded = {
        _id: id,
        colors: colors.value,
        price: price.innerHTML,
        quantity: quantity.value,
        name: nom.innerHTML,
        img: img
  
      };

      let local = [];

      // Si le localStorage existe, on récupère son contenu et on l'envoi dans le tablau local
      if (localStorage.getItem("products") !== null) {
        local = JSON.parse(localStorage.getItem("products"));
      } 
        // ici on push le produit dans le localstorage si il est vide avec le produit
        local.push(productAdded);
        localStorage.setItem("products", JSON.stringify(local));  

        //Style après ajout panier 
        confirmation.style.visibility = "visible";
        confirmation.style.background = "green";
        confirmation.innerHTML = `Vous avez ajouté ${nom.innerHTML} dans votre panier !`;
        setTimeout("location.reload(true);", 4000);
    } else {
      //alerte si quantité <= 0
      alert ("Merci de verifier la couleur ou la quantité"); 
    }
  };
}

// A améliorer et ajouter un produit de la meme couleur en modifiant seulement la quantité dans le panier dans le localstorage