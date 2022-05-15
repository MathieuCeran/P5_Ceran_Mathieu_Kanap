// ICI on a appeler l'api pour récuperer tout les éléments ( les produits sont récuperés via l'url fourni.)
fetch ("http://localhost:3000/api/products")
    .then (response => response.json())
    .then (data => showAllItems(data))

// Si erreur remplace le titre par une erreur 404 avec un message
    .catch(error => {
        document.querySelector(".titles").innerHTML = "<h2>Si le problème persiste, merci de nous contacter</h2>";
        console.log("erreur API" + error);
    }
);


// création d'une fonction pour l'affichage des produits sur la page index

function showAllItems(articles) {

    // Variable qui declare la zone d'affichage on fait pointer sur l'id du html #items
    let affichage =  document.getElementById("items");   

    //boucle for of pour dupliquer autant de fois les articles car l'indice précis d'un élément n'est pas nécessaire pendant l'itération
    for (let article of articles) {  

    // Injection sur l'ID en html                                              
        affichage.innerHTML += `<a href="./product.html?_id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
          <p class="productDescription"><b>${article.price} €</b></p>
        </article>
      </a>`;
    }
}



