
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
  // si il y a un panier qui n'est pas égal à 0
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


// on recupere les elements du html
//firstname
const firstname = document.getElementById("firstName");
const firstnameInfo = document.getElementById("firstNameErrorMsg");
//lastname
const lastName = document.getElementById("lastName");
const lastnameInfo = document.getElementById("lastNameErrorMsg");
//adress
const address = document.getElementById("address");
const adressInfo = document.getElementById("addressErrorMsg");
//city
const city = document.getElementById("city");
const cityInfo = document.getElementById("cityErrorMsg");
//mail
const email = document.getElementById("email");
const emailInfo = document.getElementById("emailErrorMsg")
// boutton envoyer 
const buttonSubmit = document.getElementById("order");

//////////////////////////////
// FIRSTNAME input
//On ecoute le input de firstanem
firstname.addEventListener("change", function () {
  validFirstname(this);
});

const validFirstname = function(inputFirstname) {
  //REGEX
  let regexFirstname = new RegExp('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-]{2,20}$', 'g');

  if (regexFirstname.test(inputFirstname.value)) { // si on passe le test regex on continue
    firstnameInfo.innerHTML = `Votre prénom semble correct !`;
    document.getElementById("firstNameErrorMsg").style.color = "green";
    return true;
  } else {
    firstnameInfo.innerHTML = `Votre prénom semble incorrect !`;
    document.getElementById("firstNameErrorMsg").style.color = "red";
    return false;
  }
};


//////////////////////////////
// LASTNAME input
//On ecoute le input de lastname
lastName.addEventListener("change", function () {
  validLastname(this);
});

const validLastname = function(inputLastname) {
  //REGEX
  let regexLastname = new RegExp('^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-]{2,20}$', 'g');

  if (regexLastname.test(inputLastname.value)) { // si on passe le test regex on continue
    lastnameInfo.innerHTML = `Votre nom semble correct !`;
    document.getElementById("lastNameErrorMsg").style.color = "green";
    return true;
  } else {
    lastnameInfo.innerHTML = `Votre nom semble incorrect !`;
    document.getElementById("lastNameErrorMsg").style.color = "red";
    return false;
  }
};

//////////////////////////////
// Adresse input
//On ecoute le input de l'adress
address.addEventListener("change", function () {
  validAdress(this);
});

const validAdress = function(inputAdress) {
  //REGEX
  let regexAdress = new RegExp('^[0-9 a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-]{5,50}$', 'g');

  if (regexAdress.test(inputAdress.value)) { // si on passe le test regex on continue
    adressInfo.innerHTML = `Votre adresse semble correct !`;
    document.getElementById("addressErrorMsg").style.color = "green";
    return true;
  } else {
    adressInfo.innerHTML = `Votre adresse semble incorrect !`;
    document.getElementById("addressErrorMsg").style.color = "red";
    return false;
  }
};

//////////////////////////////
// city input
//On ecoute le input de city
city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function(inputCity) {
  //REGEX
  let regexCity = new RegExp('^[ a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.-]{3,50}$', 'g');
  if (regexCity.test(inputCity.value)) { // si on passe le test regex on continue
    cityInfo.innerHTML = `Votre ville semble correct !`;
    document.getElementById("cityErrorMsg").style.color = "green";
    return true;
  } else {
    cityInfo.innerHTML = `Votre ville semble incorrect !`;
    document.getElementById("cityErrorMsg").style.color = "red";
    return false;
  }
};

//////////////////////////////
//EMAIL input
//On ecoute le input du mail
email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function(inputEmail) {
  //REGEX
  let regexMail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
  // On test si les caracteres sont valides
  if (regexMail.test(inputEmail.value)) {
    emailInfo.innerHTML = `Votre email semble correct !`;
    document.getElementById("emailErrorMsg").style.color = "green";
    return true;
  } else {
    emailInfo.innerHTML = `Votre email semble incorrect !`;
    document.getElementById("emailErrorMsg").style.color = "red";
    return false;
  }
};

//////////////////////////////////////////
// FORMULAIRE ENVOI DES INFORMATIONS CLIENT
//////////////////////////////////////////
// on lance une fonction au click sur le bouton envoyer et on verifie que toutes les infos soient valide avec regex
buttonSubmit.addEventListener("click", function () { // on ecoute le bouton
   // si toutes les validations regex sont OK alors on envoi dans le localStorage
  if (validFirstname(firstname) && validEmail(email) && validLastname(lastName) && validCity(city) && validAdress(address)){
      infoClient(); // on appele la fonction infoclient
    } else { // sinon on indique a l'utilisateur de reessayer en modifiant les infos personnels
      console.log("false");
      document.getElementById("order").value = "Réessayer";
    }
  });


  // Fonction pour envoyer les informations + panier client au localstorage
function infoClient () {
  let local = JSON.parse(localStorage.getItem("client"));
      local = [];
      const client = { // on renseigne les elements qu'on souhaite injecter dans le localstorage
        firstName: firstname.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      };
      order(client); // on integre le fonction order a l'aquel on applique client pour push tous les paquets ( client + products)
      local.push(client); // on push les elements dans le format string dans le LS
      localStorage.setItem("client", JSON.stringify(local)); // on stringify pour le json
      console.log("OK");
      document.getElementById("addToCart").innerHTML = "Nous envoyons votre commande...";
};



// function qui va permettre de recuperer le contact tableau et produit tableau
function order (contact) {
  let basket = JSON.parse(localStorage.getItem("products")); // on recupere le tableau products du LS
  let products = []; // on créer un tableau vide prodcts
  
  for(i = 0; i < basket.length; i++){ 
    products.push(basket[i]._id)
  }

  const data = {contact, products}
  console.log(data);
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "content-type" : "application/json",
      }   
    })
    .then(res => res.json())
    .then(result => {
      window.location.href = `confirmation.html?order=${result.orderId}`;
      console.log(result.orderId)
    })
  }

