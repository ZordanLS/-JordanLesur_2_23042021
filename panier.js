// Déclaration de la variable totalPrice pour l'utiliser dans 2 fonctions différentes
var totalPrice = [0];

// Fonction qui affiche un message de panier vide si c'est le cas
function displayEmptyCartMessage() {
  var container = document.getElementById("products");
  var emptyCart = document.createElement("div");
  emptyCart.setAttribute("class", "alert fw-bold fs-5");
  emptyCart.setAttribute("role", "alert");
  var emptyMessage = document.createTextNode("Votre panier est vide !");
  emptyCart.appendChild(emptyMessage);
  container.appendChild(emptyCart);
}

// Fonction de suppression d'un produit du panier
function deleteFromCartFunction(productId, price) {
  var cartArray = localStorage.getItem("cartContent").split(",");
  cartArray.splice(
    cartArray.findIndex((index) => index === productId),
    1
  );
  var newCartString = cartArray.toString();
  localStorage.setItem("cartContent", newCartString);
  var cardsArray = document.getElementsByClassName(`${productId}`);
  cardsArray[0].remove();
  updateCartNumber();
  totalPrice[0] -= price;
  injectPrice(totalPrice[0]);
  if (newCartString === "") {
    displayEmptyCartMessage();
    let h4 = document.getElementById("totalprice");
    h4.remove();
  }
}

// Fonction d'envoi de la commande
function submitOrder() {
  let form = document.forms["orderform"].elements;
  let products = localStorage.getItem("cartContent").split(",");
  let sentData = {
    contact: {
      firstName: form.firstname.value,
      lastName: form.lastname.value,
      address: form.address.value,
      city: form.city.value,
      email: form.formemail.value,
    },
    products: products,
  };
  fetch("http://localhost:3000/api/teddies/order", { method: "POST", body: JSON.stringify(sentData), headers: { "Content-Type": "application/json" } })
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    let orderId = json.orderId;
    localStorage.setItem("cartContent", "");
    window.location.href = "commande.html?id=" + orderId;
  });
}

// Fonction de remplissage de la page
function injectHtml(product) {
  try {
    var container = document.getElementById("products");

    // Création de l'architecture de la page

    // Création de la div card avec la classe card
    var card = document.createElement("div");
    card.setAttribute("class", `col-12 ${product._id}`);

    // Création de la row englobant le contenu de la carte
    var row = document.createElement("div");
    row.setAttribute("class", "row cartRow");

    // Création du conteneur et de l'image avec sa classe, sa source et son alt
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "col-sm-3 d-flex");
    var img = document.createElement("img");
    img.setAttribute("class", "cardimage cartImage m-auto");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.name);

    // Création de la div cardBody avec la classe card-body-right
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body-right col-sm-8 d-flex flex-column m-auto");

    // Création du H5 (nom du produit)
    var cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    var productName = document.createTextNode(product.name);
    cardTitle.appendChild(productName);

    // Création de la description
    var cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "card-text carddescription");
    var productDescription = document.createTextNode(product.description);
    cardDescription.appendChild(productDescription);

    // Création et mise en forme en € du prix et du prix total
    product.price = product.price / 100;
    var productPriceResolved = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.price);
    var cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "card-text price");
    var productPrice = document.createTextNode(productPriceResolved);
    cardPrice.appendChild(productPrice);

    // Création du bouton du suppression du panier
    var cardLink = document.createElement("div");
    cardLink.setAttribute("class", "btn col-sm-1 d-flex");
    var deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "far fa-trash-alt fs-3 m-auto");
    cardLink.addEventListener("click", () => {
      deleteFromCartFunction(product._id, product.price);
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

// Fonction de création du prix total des produits en panier
function injectPrice(totalPrice) {
  try {
    var container = document.getElementById("totalprice");
    var totalPriceElement = document.createTextNode("Total du panier : " + totalPrice + "€");
    container.innerHTML = "";
    container.appendChild(totalPriceElement);
  } catch (error) {
    console.log(error);
  }
}

// Création de l'array des produits en panier s'il n'est pas vide et récupération des informations des produits
if (localStorage.getItem("cartContent") !== "" && localStorage.getItem("cartContent") !== undefined && localStorage.getItem("cartContent") !== null) {
  var cartArray = localStorage.getItem("cartContent").split(",");

  for (cardNumber = 0; cardNumber < cartArray.length; cardNumber++) {
    var productId = cartArray[cardNumber];
    fetch("http://localhost:3000/api/teddies/" + productId)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (product) {
        injectHtml(product, cardNumber);
        return product.price;
      })
      .then(function (price) {
        totalPrice[0] += Number(price);
        injectPrice(totalPrice[0]);
      })
      .catch(function (err) {});
  }
} else {
  displayEmptyCartMessage();
}

// Création du bouton d'envoi de la commande
let submitButton = document.getElementById("submitbutton");
let form = document.forms["orderform"];
