for (var i = albumItems.length; i < (albumItems.length + otherItems.length); i++) {
    // generate html for the album
    document.writeln("<div class='album'>");

    // generate html for the image inside each box and the product description
    document.write("<img class=\"album-image\" src=\"");
    document.write(otherItems[i-albumItems.length].photoLocation);
    document.write("\" alt=\"");
    document.write(otherItems[i-albumItems.length].description);
    document.writeln("\">");

    // generate html for the model
    document.write("<h4>");
    document.write(otherItems[i-albumItems.length].title); // FIND ALTERNATIVE TO SPAN, SPAN FOR THE THEME OF THE ITEM
	document.writeln("</h4>");

    // generate html for the price
    document.write("<h5>CDN $");
    document.write(otherItems[i-albumItems.length].price);
    document.writeln("</h5>");

    // generate html for buy icon and link to amazon
    document.writeln("<p class='icons'>");
	
    document.writeln("<button type='button' class='btn btn-warning buy' style='margin: 10px 5px;' id=" + i +">Add to Cart</button>");
    
	document.write("<a href='");
    document.write(otherItems[i-albumItems.length].saleLocation);
    document.write("'>");
    document.write(" <button type='button' class='btn btn-warning' style='margin: 10px 5px;'>Amazon</button>");
    document.writeln("</a>");
	
    document.writeln("</p>");

    // generate html to close the album div
    document.writeln("</div>");

}