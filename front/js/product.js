// https://qastack.fr/programming/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
// Ici on recupere l'id du produit depuis l'url avec serachparams

const params = (new URL(document.location)).searchParams; // console.log(document.location);
const id = params.get("_id");

const nom = document.getElementById("title");


// ICI on a appele l'api pour récuperer le produit via l'id en fin d'url

fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => product(data))
    .catch((error) => {
      document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
      console.log("erreur 404, sur ressource api: " + error);
});  

main();

function main () {
  add_To_Cart();
}

 // AFFICHAGE D'UN PRODUIT UNIQUE GRACE A SON ID

function product (article) {

  // déclaration des variables, on fait pointer sur l'id du html de chaque elements
  let image = document.querySelector("article div.item__img")
  let price = document.getElementById("price")
  let description = document.getElementById("description")
  let colors = document.getElementById("colors")

  // Ici on injecte les données avec innerHtml
  image.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`
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

function add_To_Cart () {
  // Au click sur le boutin ajouter au panier
  addToCart.onclick = () => {
    let local = JSON.parse(localStorage.getItem("products")); 
    // si les valeurs ne sont pas rensiegner alors on affiche une alerte
    if (quantity.value > 0 && quantity.value < 100 && colors.value != ""){
      if (local == null) { // Si le tableau est vide
        local = []; // on défini un tableau
        const productAdded = { // on renseigne les elements qu'on souhaite injecter dans le localstorage
          _id: id,
          colors: colors.value,
          price: price.innerHTML,
          quantity: quantity.value
        };
        local.push(productAdded); // on push les elements dans le format string dans le LS
        localStorage.setItem("products", JSON.stringify(local));
        document.getElementById("addToCart").innerHTML = "Produit ajouté au panier";
      } else if (local != null) { // Si le local n'est pas vide
        for (i = 0; i < local.length; i++){ // on recupere les elements de chaques lignes 
          console.log(local);
          if(local[i].id == local.id && local[i].colors == colors.value){ // si l'ID et la couleurs sont les mêmes 
            return(
              local[i].quantity++, // alors on inject uniquement la quantité
              localStorage.setItem("products", JSON.stringify(local)),
              local = JSON.parse(localStorage.getItem("products")));
          };
        };
      };
      for (i = 0; i < local.length; i++) { // on recupere les elemennts
        if (local[i].id == local.id && local[i].colors != colors.value){ // si l'ID est le même mais pas la couleur 
          const productAdded = {
            _id: id,
            colors: colors.value,
            price: price.innerHTML,
            quantity: quantity.value
          };
          document.getElementById("addToCart").innerHTML = "Produit ajouté au panier";
          return (
            local.push(productAdded), // on push alors un new element en string
            localStorage.setItem("products", JSON.stringify(local))
          );
        };
      };
    } else{
      //Alerte pour signifier que la couleur ou la quantité n'est pas renseigner
      alert("Merci de verifier la couleur ou la quantité"); 
    };
}};