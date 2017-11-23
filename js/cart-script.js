var itemsToBuy = [];
if (sessionStorage.getItem("CartItem") != null)
    itemsToBuy = JSON.parse(sessionStorage.getItem("CartItem"));

window.onload = function () {
	// Adds item to cart and changes text to 'Added to Cart'
    var buyButton = document.getElementsByClassName("btn btn-warning buy");
    for (let i = 0; i < buyButton.length; i++) {
        buyButton[i].addEventListener("click", function(){
            addToCart(buyButton[i].id);
            buyButton[i].innerHTML = "Added to Cart";
        });
    }

	// Adds item to cart. If item already exists in cart it will not add it.
	function addToCart(id) {
		var in_basket = 0;
		if (id >= albumItems.length) {
			for (let i = 0; i < itemsToBuy.length; i++) {
				if (itemsToBuy[i].title == otherItems[id-albumItems.length].title) {
					in_basket = 1;
					break;
				}
			}
			if (in_basket == 0) {
				alert(itemsToBuy[0].title);
				itemsToBuy.push(otherItems[id-albumItems.length]);
			}
		}
		else {
			for (let i = 0; i < itemsToBuy.length; i++) {
				if (itemsToBuy[i].title == albumItems[id].title) {
					in_basket = 1;
					break;
				}
			}
			if (in_basket == 0) {
				itemsToBuy.push(albumItems[id]);
			}
		}
		sessionStorage.setItem("CartItem", JSON.stringify(itemsToBuy));
	}
}