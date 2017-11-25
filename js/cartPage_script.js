/*script for calculating total price of items in the cart page, has delete & select button*/
var itemsToBuy = [];
if (sessionStorage.getItem('CartItem') != null) {
    itemsToBuy = JSON.parse(sessionStorage.getItem('CartItem'));
}
window.onload = function () {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {

                if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var table = document.getElementById('cartTable'); // cart table
    var selectInputs = document.getElementsByClassName('check'); // all selection
    var checkAllInputs = document.getElementsByClassName('check-all'); // select-all box
    var tr = table.children[1].rows; //rows
    var selectedTotal = document.getElementById('selectedTotal'); //selected items container
    var priceTotal = document.getElementById('priceTotal'); //Total price
    var deleteAll = document.getElementById('deleteAll'); // delete-all button
    var selected = document.getElementById('selected'); //selected items
    var foot = document.getElementById('foot');

    // calculate total price of selected items
    function getTotal() {
        var selected = 0, price = 0, html = '';
        for (var i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                tr[i].className = 'on';
                selected += parseInt(tr[i].getElementsByTagName('input')[1].value); //quantity of selected items
                price += parseFloat(tr[i].getElementsByTagName('td')[4].innerHTML); //total price
            }else{
                tr[i].className = '';
            }
        }
        selectedTotal.innerHTML = selected; // quantity of selected items
        priceTotal.innerHTML = price.toFixed(2); // total price
        selectedViewList.innerHTML = html;
        if (selected===0) {
            foot.className = 'foot';
        }
    }

    // calculate single item total price
    function getSubtotal(tr) {
        var cells = tr.cells;
        var price = cells[2]; //price for one item
        var subtotal = cells[4]; //item price td
        var countInput = tr.getElementsByTagName('input')[1]; //quantity input
        var span = tr.getElementsByTagName('span')[1]; //first
        //write in html
        subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
        //remove "-" if there is only one item
        if (countInput.value === 1) {
            span.innerHTML = '';
        }else{
            span.innerHTML = '-';
        }
    }

    // check box
    for(var i = 0; i < selectInputs.length; i++ ){
        selectInputs[i].onclick = function () {
            if (this.className.indexOf('check-all') >= 0) { //select all
                for (var j = 0; j < selectInputs.length; j++) {
                    selectInputs[j].checked = this.checked;
                }
            }
            if (!this.checked) { //cancel select-all condition if there is at lest one non-selected item
                for (var i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false;
                }
            }
            getTotal();//recalculate total price
        }
    }

    //add operation for each rows
    for (var i = 0; i < tr.length; i++) {
        //connect selected items to tr
        tr[i].onclick = function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement;
            var cls = el.className;
            var countInout = this.getElementsByTagName('input')[1];
            var value = parseInt(countInout.value);
            //confirm which one is selected
            switch (cls) {
                case 'add': //click on "+"
                    countInout.value = value + 1;
                    getSubtotal(this);
                    break;
                case 'reduce': //click on "-"
                    if (value > 1) {
                        countInout.value = value - 1;
                        getSubtotal(this);
                    }
                    break;
                case 'delete': //click on delete
                    var conf = confirm('Are you sure to remove this item?');
                    if (conf) {
                        for (let j = 0; j < itemsToBuy.length; j++) {
							if (itemsToBuy[j].title == this.cells[1].getElementsByTagName('span')[0].innerHTML) {
								itemsToBuy.splice(j, 1);
								sessionStorage.setItem("CartItem", JSON.stringify(itemsToBuy));
								break;
							}
						}
                        this.parentNode.removeChild(this);
                    }
                    break;
            }
            getTotal();
        };
        // quantity
        tr[i].getElementsByTagName('input')[1].onkeyup = function () {
            var val = parseInt(this.value);
            if (isNaN(val) || val <= 0) {
                val = 1;
            }
            if (this.value !== val) {
                this.value = val;
            }
            getSubtotal(this.parentNode.parentNode); //item price
            getTotal(); //get quantity
        }
    }

    // delete
    deleteAll.onclick = function () {
        if (selectedTotal.innerHTML !== 0) {
            var con = confirm('Are you sure to remove all items？'); //pop up confirm
            if (con) {
                for (var i = 0; i < tr.length; i++) {
                    //delete row
                    if (tr[i].getElementsByTagName('input')[0].checked) {
                        for (let j = 0; j < itemsToBuy.length; j++) {
							if (itemsToBuy[j].title == tr[i].cells[1].getElementsByTagName('span')[0].innerHTML) {
								itemsToBuy.splice(j, 1);
								sessionStorage.setItem("CartItem", JSON.stringify(itemsToBuy));
								break;
							}
						}
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        } else {
            alert('Please choose an item！');
        }
        getTotal(); //quantity
    };

    // default: select all
    checkAllInputs[0].checked = true;
    checkAllInputs[0].onclick();


};
