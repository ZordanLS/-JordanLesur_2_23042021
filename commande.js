let url = new URL(window.location.href);
let urlSearchParams = url.searchParams;
let orderId = urlSearchParams.get("id");

let orderIdSpan = document.getElementById("orderid");
let orderIdText = document.createTextNode(orderId);
orderIdSpan.appendChild(orderIdText);