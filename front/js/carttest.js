
// let basket = JSON.parse(localStorage.getItem("products"));
// let newBasket = []; 


// function getArticleAPI () {
//   fetch("http://localhost:3000/api/products")
//     .then((response) => response.json())
//     .then((data) => {
//       productes = data;
//       console.log(productes);
//     });
// };


// //Si panier vide afficher "Votre penier est vide"
// if (basket === null) {
//     console.log("je suis vide");
//     document.getElementById("cartAndFormContainer").innerHTML = "<h1>Votre panier est vide</h1>";

// }else {
//     //Si le panier n'est pas vide afficher les produits ici
//     console.log("je ne suis pas vide");
  
//     show();
//     total();
//     deleteElement();
//     quantityModification();
// };

// /////////////////////////////////////////
// // AFFICHAGE DU PANIER
// /////////////////////////////////////////
// function show() {
//   // on déclare et on pointe la zone d'affichage
//   let zoneBasket = document.querySelector("#cart__items");
//   // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
//   for (let product in basket) {
//     zoneBasket.innerHTML += 
//     `<article class="cart__item" data-id="${basket[product]._id}" data-couleur="${basket[product].colors}" data-quantite="${basket[product].quantity}"> 
//       <div class="cart__item__img">
//         <img src="${product.imageUrl}" alt="${basket[product].alt}">
//       </div>
//       <div class="cart__item__content">
//         <div class="cart__item__content__titlePrice">
//           <h2>${basket[product].name}</h2>
//           <span>couleur : ${basket[product].colors}</span>
//           <p data-prix="${basket[product].price * basket[product].quantity}">${basket[product].price * basket[product].quantity}€</p>
//         </div>
//         <div class="cart__item__content__settings">
//           <div class="cart__item__content__settings__quantity">
//             <p>Qté : </p>
//             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[product].quantity}">
//           </div>
//           <div class="cart__item__content__settings__delete">
//             <p class="deleteItem" data-id="${basket[product]._id}" data-couleur="${basket[product].colors}">Supprimer</p>
//           </div>
//         </div>
//       </div>
//     </article>`;
//   };
// };