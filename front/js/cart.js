let basket = JSON.parse(localStorage.getItem("products"));
let newBasket = []; 

function getArticleAPI () {
  fetch(`http://localhost:3000/api/products/`)
    .then((response) => response.json())
    .then((data) => product(data))
    .catch((error) => {
      document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + error);
    });  
}



// selection de la class ou on va injecter le html
const section = document.getElementById("cart__items");

//Si panier vide afficher "Votre penier est vide"

if (basket === null) {
    console.log("je suis vide");
    document.getElementById("cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>";

}else {
    //Si le panier n'est pas vide afficher les produits ici
    console.log("je ne suis pas vide");
    
    show();
    total();
    deleteElement();
    quantityModification();
};


function show() {
  // on déclare et on pointe la zone d'affichage
  let zoneBasket = document.querySelector("#cart__items");
  // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
  for (let product in basket) {
 
  zoneBasket.innerHTML += 
  `<article class="cart__item" data-id="${basket[product]._id}" data-couleur="${basket[product].colors}" data-quantite="${basket[product].quantity}"> 
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${basket[product].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${basket[product].name}</h2>
        <span>couleur : ${basket[product].colors}</span>
        <p data-prix="${basket[product].price * basket[product].quantity}">${basket[product].price * basket[product].quantity}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[product].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${basket[product]._id}" data-couleur="${basket[product].colors}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  
  };
};


// SUPPRIMER UN ELEMENT
function deleteElement () {
  // On recupere la balise html du bouton supprimé
  const deleteButton = document.querySelectorAll(".deleteItem");
  
  //On vise tout les boutons supprimé disponible avec for each
  deleteButton.forEach((deleteProduct) => {
    // On ecoute le click sur le bouton supprimé 
    deleteProduct.addEventListener("click", () => {
      
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
 



// MODIFIER LA QUANNTITE DUN ELEMENT
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
}


// AFFICHE LE TOTAL DU PANIER 
function total() {
  let basket = JSON.parse(localStorage.getItem("products"));

  let totalArticle = 0;
  let combinedArticle = 0;
  let totalPrice = 0;

  for (let product of basket) {
    totalArticle += JSON.parse(product.quantity);
    combinedArticle = JSON.parse(product.quantity) * JSON.parse(product.price)
    totalPrice += combinedArticle 
  }
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrice;

}

