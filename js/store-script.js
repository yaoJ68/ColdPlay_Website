var buy_button = document.getElementsByClassName("btn btn-warning buy");
buy_button.addEventListener('click', function() {
    var text = this.textContent
    this.textContent = this.dataset.textSwap
    this.dataset.textSwap = text
});