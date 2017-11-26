for (var i = 0; i < albumItems.length; i++) {

    // generate html for the album
    document.writeln("<div class='album'>");

    if (i == 0){
        document.writeln("<div id='album1'>");
    }
    else if (i == 1){
        document.writeln("<div id='album2'>");
    }
    else if (i == 2){
        document.writeln("<div id='album3'>");
    }
    else if (i == 3){
        document.writeln("<div id='album4'>");
    }
    else if (i == 4){
        document.writeln("<div id='album5'>");
    }
    else if (i == 5){
        document.writeln("<div id='album6'>");
    }else if (i == 6){
        document.writeln("<div id='album7'>");
    }else if (i == 7){
        document.writeln("<div id='album8'>");
    }



    //generate the audio -- currently not fully implemented
    document.write("<audio id=\"");
    document.write(i+1);
    document.writeln("\">");
    document.writeln("<source src=\"");
    document.write(albumItems[i].audioLoction);
    document.writeln("\"></source>");
    document.writeln("</audio>");

    // generate html for the image inside each box and the product description
    document.writeln("<div class=\"flip-container\" ontouchstart=\"this.classList.toggle('hover');\">");
    document.writeln("<div class=\"flipper\">");
    document.writeln("<div class=\"front\">");
    document.write("<img class='album-image' src='");
    document.write(albumItems[i].photoLocation);
    document.write("' alt='");
    document.write(albumItems[i].description);
    document.writeln("'>");
    document.writeln("</div>");
    document.writeln("<div class=\"back\">");
    document.write("<img class='album-image' src='");
    document.write(albumItems[i].backCover);
    document.write("' alt='");
    document.write(albumItems[i].description);
    document.writeln("'>");
    document.writeln("</div>");
    document.writeln("</div>");
    document.writeln("</div>");

    // generate html for the model
    document.write("<h4>");
    document.write(albumItems[i].title);
    document.writeln("</h4>");

    // generate html for the price
    document.write("<h5>CDN $");
    document.write(albumItems[i].price);
    document.writeln("</h5>");

    // generate html for buy icon and link to amazon
    document.writeln("<p class='icons'>");
	document.writeln("<button type='button' class='btn btn-warning buy' style='margin: 10px 5px;' id=" + i +">Add to Cart</button>");
    document.write("<a target=\"_blank\" href='");
    document.write(albumItems[i].saleLocation);
    document.writeln("'>");
    document.writeln(" <button type='button' class='btn btn-warning' style='margin: 10px 5px;'>Amazon</button>");
    document.writeln("</a>");
    document.writeln("</p>");

    // generate html to close the album div
    document.writeln("</div>");
    document.writeln("</div>");

}