// Récupération de l'id de commande dans les paramètres de l'URL
let url = new URL(window.location.href);
let urlSearchParams = url.searchParams;
let orderId = urlSearchParams.get("id");

// Ajout de l'id récupéré dans le HTML
let orderIdSpan = document.getElementById("orderid");
let orderIdText = document.createTextNode(orderId);
orderIdSpan.appendChild(orderIdText);
