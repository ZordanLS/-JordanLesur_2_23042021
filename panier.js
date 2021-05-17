/*function updateCartNumber() {
  if (localStorage.getItem("cartContent") !== undefined && localStorage.getItem("cartContent") !== '' && localStorage.getItem("cartContent") !== null) {
    document.getElementById("panier").innerText = "Panier (" + localStorage.getItem("cartContent").split(",").length + ")"
  } else {
    document.getElementById("panier").innerText = "Panier"
    }}*/

function displayEmptyCartMessage() {
  let container = document.getElementById("products");
  let emptyCart = document.createElement("div");
  emptyCart.setAttribute("class", "alert alert-primary");
  emptyCart.setAttribute("role", "alert");
  let emptyMessage = document.createTextNode("Votre panier est vide !");
  emptyCart.appendChild(emptyMessage);
  container.appendChild(emptyCart);
}
function deleteFromCartFunction(productId) {
  let cartArray = localStorage.getItem("cartContent").split(",");
  cartArray.splice(
    cartArray.findIndex((index) => index === productId),
    1
  );
  let newCartString = cartArray.toString();
  localStorage.setItem("cartContent", newCartString);
  let cardsArray = document.getElementsByClassName(`${productId}`);
  cardsArray[0].remove();
  updateCartNumber();
  if (newCartString === "") {
    displayEmptyCartMessage();
  }
}

function injectHtml(product) {
  try {
    let container = document.getElementById("products");

    // Création de l'architecture de la page

    // Création de la div card avec la classe card
    let card = document.createElement("div");
    card.setAttribute("class", `card col-12 ${product._id}`);

    // Création de la row englobant le contenu de la carte
    let row = document.createElement("div");
    row.setAttribute("class", "row cartRow");

    // Création du conteneur et de l'image avec sa classe, sa source et son alt
    let imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "col-sm-3 d-flex");
    let img = document.createElement("img");
    img.setAttribute("class", "cardimage cartImage m-auto");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.name);

    // Création de la div cardBody avec la classe card-body-right
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body-right col-sm-8 d-flex flex-column m-auto");

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

    // Création du bouton du suppression du panier
    let cardLink = document.createElement("div");
    cardLink.setAttribute("class", "btn col-sm-1 d-flex");
    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "far fa-trash-alt fs-3 m-auto");
    cardLink.addEventListener("click", () => {
      deleteFromCartFunction(product._id);
    });
    cardLink.appendChild(deleteIcon);

    // Création de la structure parent/enfants de la page
    container.appendChild(card);
    card.appendChild(row);
    row.appendChild(imgContainer);
    row.appendChild(cardBody);
    imgContainer.appendChild(img);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);
    row.appendChild(cardLink);
  } catch (error) {
    console.log(error);
  }
}

if (localStorage.getItem("cartContent") !== "" && localStorage.getItem("cartContent") !== undefined && localStorage.getItem("cartContent") !== null) {
  var cartArray = localStorage.getItem("cartContent").split(",");

  for (cardNumber = 0; cardNumber < cartArray.length; cardNumber++) {
    let productId = cartArray[cardNumber];
    fetch("http://localhost:3000/api/teddies/" + productId)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (product) {
        injectHtml(product, cardNumber);
      })
      .catch(function (err) {});
  }
} else {
  displayEmptyCartMessage();
}
