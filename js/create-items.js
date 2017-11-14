for (var i = 0; i < items.length; i++) {

    // generate html for the album
    document.writeln("<div class='album'>");

    // generate html for the image inside each box and the product description
    document.write("<img class='album-image' src='");
    document.write(items[i].photoLocation);
    document.write("' alt='");
    document.write(items[i].description);
    document.writeln("'>");

    // generate html for the model
    document.write("<h4>");
    document.write(items[i].title);
    document.writeln("</h4>");

    // generate html for the price
    document.write("<h5>");
    document.write(items[i].price);
    document.writeln("</h5>");

    // generate html for buy icon and link to amazon
    document.writeln("<p class='icons'>");
    document.writeln("<a href='Checkout.html'>");
    document.writeln("<button type='button' class='btn btn-warning' style='margin: 10px 5px;'>Buy Now</button>");
    document.writeln("</a>");
    document.write("<a href='");
    document.write(items[i].saleLocation);
    document.writeln("'>");
    document.writeln(" <button type='button' class='btn btn-warning' style='margin: 10px 5px;'>Amazon</button>");
    document.writeln("</a>");
    document.writeln("</p>");

    // generate html to close the album div
    document.writeln("</div>");
}