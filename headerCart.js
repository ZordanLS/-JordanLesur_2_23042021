function updateCartNumber() {
  if (localStorage.getItem("cartContent") !== undefined && localStorage.getItem("cartContent") !== "" && localStorage.getItem("cartContent") !== null) {
    document.getElementById("panier").innerText = "Panier (" + localStorage.getItem("cartContent").split(",").length + ")";
  } else {
    document.getElementById("panier").innerText = "Panier";
  }
}

updateCartNumber();
