// Fonction qui permet d'avoir le nombre de produits en panier actualisé dans le header
function updateCartNumber() {
  if (localStorage.getItem("cartContent") !== undefined && localStorage.getItem("cartContent") !== "" && localStorage.getItem("cartContent") !== null) {
    document.getElementById("panier").innerText = "Panier (" + localStorage.getItem("cartContent").split(",").length + ")";
  } else {
    document.getElementById("panier").innerText = "Panier";
  }
}

// Appel de la fonction
updateCartNumber();
