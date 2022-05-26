// https://qastack.fr/programming/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
// Ici on recupere l'id du produit depuis l'url avec serachparams

const params = (new URL(document.location)).searchParams; // console.log(document.location);
const id = params.get("order");

if (params.has("order")) {
    let orderId = document.getElementById("orderId");
    orderId.innerHTML = `<br /><br />`+ id;
    localStorage.clear(); // on vide le local storage
} else {
    console.log("KO");
}

