var cartProducts = localStorage.getItem("cartContent");
if (cartProducts) {
  var cartArray = localStorage.getItem("cartContent").split(",");
} else {
  localStorage.setItem("cartContent", "");
}
let htmlCart = document.getElementById("panier");
htmlCart.innerText = "Panier (" + cartArray.length + ")";
