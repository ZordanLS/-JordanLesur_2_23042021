// Récupère les données "Teddies" de l'API
fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (array) {
    injectHtml(array);
  })
  .catch(function (err) {});

// Pour chaque produit, crée une carte et l'intègre au HTML
function injectHtml(productsList) {
  productsList.map(function (product) {
    let container = document.getElementById("products");

    // Création de l'architecture de la page

    // Création de la div card avec la classe card
    let card = document.createElement("div");
    card.setAttribute("class", "card col-10 col-md-5 col-lg-3 col-xxl-2 m-2");

    // Création de l'image avec sa classe, sa source et son alt
    let img = document.createElement("img");
    img.setAttribute("class", "card-img-top cardimage");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.name);

    // Création de la div cardBody avec la classe card-body
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    // Création du H5 (nom du produit)
    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    let productName = document.createTextNode(product.name);
    cardTitle.appendChild(productName);

    // Création de la description
    let cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "card-text carddescription");
    let productDescription = document.createTextNode(product.description);
    cardDescription.appendChild(productDescription);

    // Création et mise en forme en € du prix
    product.price = product.price / 100;
    let productPriceResolved = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.price);
    let cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "card-text");
    let productPrice = document.createTextNode(productPriceResolved);
    cardPrice.appendChild(productPrice);

    // Création du lien vers la page produit
    let cardLink = document.createElement("a");
    cardLink.setAttribute("class", "btn btn-primary");
    cardLink.setAttribute("href", "produit.html?id=" + product._id);
    let productLink = document.createTextNode("Voir le produit");
    cardLink.appendChild(productLink);

    // Création de la structure parent/enfants de la page des produits
    container.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardLink);
  });
}
