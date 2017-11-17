var itemsCheckOut = JSON.parse(sessionStorage.getItem("CartItem"));

for (var i = 0; i < itemsCheckOut.length; i++) {
    // generate html for the album
    document.writeln("<div class='album'>");

    // generate html for the image inside each box and the product description
    document.write("<img class='album-image' src='");
    document.write(itemsCheckOut[i].photoLocation);
    document.write("' alt='");
    document.write(itemsCheckOut[i].description);
    document.writeln("'>");

    // generate html for the model
    document.write("<h4>");
    document.write(itemsCheckOut[i].title);
    document.writeln("</h4>");

    // generate html for the price
    document.write("<h5>");
    document.write(itemsCheckOut[i].price);
    document.writeln("</h5>");

    // generate html for buy icon and link to amazon
    document.writeln("<p class='icons'>");
    document.writeln("<button type='button' class='btn btn-warning remove' style='margin: 10px 5px;' id=" + i +">Remove Item</button>");
    document.writeln("</p>");

    // generate html to close the album div
    document.writeln("</div>");
}