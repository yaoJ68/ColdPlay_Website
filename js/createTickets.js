

for (var i=15; i<20 ;i++){
    document.write("<div class=\"ticket\">");
    //document.write("<img class='ticket_img' src='img/img10.jpg'>");
    document.write("<img class='ticket_img' src='");
    document.write(ticketList[i-15].photoLocation);
    document.writeln("'>");
    document.write("<div class=\"ticket_text\">");

    document.write("<h2>");
    document.write(ticketList[i-15].title);
    document.write("</h2>");

    document.write("<p>");
    document.write(ticketList[i-15].Location);
    document.write("</p>");

    document.write("<p class=\"ticket_date\">");
    document.write(ticketList[i-15].Time);
    document.write("</p>");

    document.write("</div>"); //closing tag for "ticket_text"

    document.write("<div class=\"ticket_buy\">");
    document.write("<h3>");
    document.write(ticketList[i-15].Price_Word);
    document.write("<br>");
    document.write("<span>");
    document.write(ticketList[i-15].price);
    document.write("</span>");    //closing tag - span
    document.write("</h3>");        //closing tag - h3

    document.writeln("<button type='button' class='btn btn-warning buy' id=" + i +">Add to Cart </button>");
    document.write("</div>");    //closing tag for "ticket_buy"
    document.write("</div>");    //closing tag for "ticket"
}