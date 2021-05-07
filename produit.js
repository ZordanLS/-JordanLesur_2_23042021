// Récupération du paramètre de recherche dans l'URL
let url = new URL(window.location.href);
var urlSearchParams = url.searchParams;
let productId = urlSearchParams.get("id");

// Récupère les données du produit correspondant à l'ID récupéré au dessus
fetch("http://localhost:3000/api/teddies/" + productId)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    injectHtml(product);
  })
  .catch(function (err) {});

// Intègre au HTML les différentes informations du produit
function injectHtml(product) {
  // Formate le prix en €
  product.price = product.price / 100;
  let productPriceResolved = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.price);
  let productTitle = document.getElementById("producttitle");
  let productImage = document.getElementById("productimage");
  let productName = document.getElementById("productname");
  let productDescription = document.getElementById("productdescription");
  let productPrice = document.getElementById("productprice");
  let addToBasket = document.getElementById("addtobasket");
  let productOptions = document.getElementById("colors");

  // La boucle récupère l'array contenant les couleurs possibles et crée une ligne du menu déroulant par couleur existante
  for (let color = 0; color < product.colors.length; color++) {
    let listElement = document.createElement("option");
    listElement.innerHTML = product.colors[color];
    productOptions.appendChild(listElement);
  }

  productImage.setAttribute("src", product.imageUrl);
  productImage.setAttribute("alt", product.name);
  productName.innerText = product.name;
  productDescription.innerText = product.description;
  productPrice.innerText = productPriceResolved;
  addToBasket.setAttribute("href", "#");
}
