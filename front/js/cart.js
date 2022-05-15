let basket = JSON.parse(localStorage.getItem("products"));
// console.log(basket);


// selection de la class ou on va injecter le html
const section = document.getElementById("cart__items");

//Si panier vide afficher "Votre penier est vide"


if (basket === null) {
    console.log("je suis vide");
    document.getElementById("cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>";

}else {
    //Si le panier n'est pas vide afficher les produits ici
    console.log("je ne suis pas vide");

    
    function affiche() {
        // on déclare et on pointe la zone d'affichage
        let zonePanier = document.querySelector("#cart__items");
        console.log(zonePanier);
        // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
        for (let product in basket) {
        zonePanier.innerHTML += 
        `<article class="cart__item" data-id="${basket[product]._id}" data-couleur="${basket[product].colors}" data-quantite="${basket[product].quantity}"> 
          <div class="cart__item__img">
            <img src="${basket[product].img}" alt="${basket[product].alt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__titlePrice">
              <h2>${basket[product].name}</h2>
              <span>couleur : ${basket[product].colors}</span>
              <p data-prix="${basket[product].price}">${basket[product].price} €</p>
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
        }
      }
    
    affiche();
    
    
    
    
    
    
    
    
    
    
    
    // for (let product in basket) {
    
    //     let affichage = document.querySelector("#cart__items");
    //     let child = affichage.getElementsByTagName("h2");
    //     for(var h = 0; h < child.length; h++ ) {
    //         child[h].innerHTML =  basket[product].name;

    //       };
    //     console.log(basket[product].name);
        
        
    
    // };
}