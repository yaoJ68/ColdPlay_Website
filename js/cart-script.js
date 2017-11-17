var itemsToBuy = [];
if (sessionStorage.getItem("CartItem") != null)
    itemsToBuy = JSON.parse(sessionStorage.getItem("CartItem"));

function init() {
    var buyButton = document.getElementsByClassName("btn btn-warning buy");
    for (let i = 0; i < buyButton.length; i++) {
        buyButton[i].addEventListener("click", function(){
            addToCart(buyButton[i].id);
        });
    }

    var removeButton = document.getElementsByClassName("btn btn-warning remove");
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener("click", function(){
            removeFromCart(removeButton[i].id);
        });
    }

    var totalPrice = 0;
    for(let i = 0; i < itemsToBuy.length; i++) {
        totalPrice = totalPrice + parseFloat(itemsToBuy[i].price);
    }
    document.getElementById("total").innerHTML = totalPrice.toFixed(2);
}

function addToCart(id) {
    itemsToBuy.push(items[id]);
    sessionStorage.setItem("CartItem", JSON.stringify(itemsToBuy));
}

function removeFromCart(id) {
    itemsToBuy.splice(id, 1);
    sessionStorage.setItem("CartItem", JSON.stringify(itemsToBuy));
    location.reload();
}