
//----------------------------------------------------------------
// Récupération des produits de l'api
//----------------------------------------------------------------
// appel de la ressource api product (voir script.js) si on est sur la page panier

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objetProduits) => {
      console.log(objetProduits);
      // appel de la fonction affichagePanier
      showBasket(objetProduits);
  })
  .catch((err) => {
      document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + err);
  });

//--------------------------------------------------------------
// Fonction détermine les conditions d'affichage des produits du panier
//--------------------------------------------------------------
function showBasket(index) {
  // on récupère le panier converti
  let basket = JSON.parse(localStorage.getItem("products"));
  // si il y a un panier avec une taille differante de 0 (donc supérieure à 0)
  if (basket && basket.length != 0) {
    // zone de correspondance clef/valeur de l'api et du panier
    for (let product of basket) {
      for (let g = 0, h = index.length; g < h; g++) {
        if (product._id === index[g]._id) {
          // création de valeurs pour l'affichage
          product.name = index[g].name;
          product.price = index[g].price;
          product.image = index[g].imageUrl;
          product.description = index[g].description;
          product.alt = index[g].altTxt;
        }
      }
    }
    // si les conditions sont présentes on affiche le panier
    show(basket);
  } else {
    // si il n'y a pas de panier on applique un panier a 0 + message panier vide
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
  // affichage dynamique si il y'a action sur modification quantité + suppression
  quantityModification();
  deleteElement();
}
//--------------------------------------------------------------
//Fonction d'affichage d'un panier (tableau)
//--------------------------------------------------------------
function show(indexe) {
  // on déclare et on pointe la zone d'affichage de la balise html
  let zonePanier = document.querySelector("#cart__items");
  // on crée les affichages des produits du panier grâce a map et dataset 
  zonePanier.innerHTML += indexe.map((product) => 
  `<article class="cart__item" data-id="${product._id}" data-couleur="${product.colors}" data-quantité="${product.quantity}"> 
    <div class="cart__item__img">
      <img src="${product.image}" alt="${product.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${product.name}</h2>
        <span>couleur : ${product.colors}</span>
        <p data-prix="${product.price}">${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-couleur="${product.colors}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ); 
  // on applique les modification dynamiquement pour afficher un prix après modification 
  total();
}


///////////////////////////////////////
// SUPPRIMER UN ELEMENT
///////////////////////////////////////
function deleteElement () {
  // On recupere la balise html du bouton supprimé
  const deleteButton = document.querySelectorAll(".deleteItem");
  let newBasket = []; // on declare un tableau vide pour le nouveau panier
  //On vise tout les boutons supprimé disponible avec for each
  deleteButton.forEach((deleteProduct) => {
    // On ecoute le click sur le bouton supprimé 
    deleteProduct.addEventListener("click", () => {
      let basket = JSON.parse(localStorage.getItem("products"));
      let totalProductRemove = basket.length; //variable qui recupère le nombre de produit dans le panier
      console.log(totalProductRemove); // on affiche ici le nombre de product

      // Si il y a que 1 seul produit dans le panier alors on le vide entierrement si il y en a + de 1 ca ne fonctionne pas
      if (totalProductRemove == 1) {
        localStorage.removeItem("products")
      } else {
        //Si +2 produits
        newBasket = basket.filter(element => { //ici on filtre l'element global, et stocker dans le nouveau tableau "newbasket"
          
          //On compare les donnés et on renvoi tout ce qui est différent dans le tableau
          if (deleteProduct.dataset.id != element._id || deleteProduct.dataset.couleur != element.colors) { 
            return true
          }
        });
      };
      console.log(newBasket);
      localStorage.setItem("products", JSON.stringify(newBasket));      //On réinjecte les nouvelles valeurs dans le nouveau panier
      return location.reload(); // on raffraichit la page pour afficher le nouveau panier
    });
  });
};
 


/////////////////////////////////////////////
// MODIFIER LA QUANNTITE DUN ELEMENT
/////////////////////////////////////////////
function quantityModification () {
  const cart = document.querySelectorAll(".cart__item");
  console.log(cart); // pour verifier le dataset
  cart.forEach((cart) => {
    cart.addEventListener("change", (event) => {
      
      // vérification d'information de la valeur du clic et son positionnement dans les articles
      let basket = JSON.parse(localStorage.getItem("products"));
      // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
      for (product of basket)
        if (
          // On verifie que le produit correspont bien en comparant le dataset au tableau ( quantité + couleur)
          product._id === cart.dataset.id && product.colors === cart.dataset.couleur) {
          product.quantity = event.target.value;
          localStorage.products = JSON.stringify(basket);
          // on actualise les données totaux dynamiquement 
          total();
        }
    });
  });
};

//////////////////////////////////////////
// AFFICHE LE TOTAL DU PANIER 
//////////////////////////////////////////
function total() {
  let basket = JSON.parse(localStorage.getItem("products"));

  let totalArticle = 0;
  let combinedArticle = 0;
  let totalPrice = 0;

  for (let product of basket) { // pour chaque produits présent dans basket on recupere les produit 1/1
    totalArticle += JSON.parse(product.quantity); // on recupere les quantité total
    combinedArticle = JSON.parse(product.quantity) * JSON.parse(product.price) // on multiplie la quantité * prix
    totalPrice += combinedArticle // on recupère le prix total combiné
  }
  document.getElementById("totalQuantity").textContent = totalArticle; // on affiche le nombre total d'article
  document.getElementById("totalPrice").textContent = totalPrice; // on affiche le prix total du panier
};

//////////////////////////////////////////
// FORMULAIRE
//////////////////////////////////////////

let client = {};
localStorage.client = JSON.stringify("client");

const firstname = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
