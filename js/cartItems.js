var itemsCheckOut = JSON.parse(sessionStorage.getItem("CartItem"));

for (var i = 0; i < itemsCheckOut.length; i++) {

    // generate html for the table row
    document.writeln("<tr>");
	
    document.writeln("<td class=\"checkbox\"><input class=\"check-one check\" type=\"checkbox\"></td>");
	
    document.write("<td class=\"goods\"><img src=\"");
	document.write(itemsCheckOut[i].photoLocation);
	document.write("\" alt=\"");
	document.write(itemsCheckOut[i].description);
	document.write("\"><span>");
	document.write(itemsCheckOut[i].title);
	document.writeln("</span></td>");
	
	document.write(" <td class=\"price\">"); // ADD CDN $
	document.write(itemsCheckOut[i].price);
	document.writeln("</td>");
	
	document.writeln("<td class=\"count\">");
	document.writeln("<span class=\"reduce\"></span>");
	document.writeln("<input class=\"count-input\" type=\"text\" value=\"1\">");
	document.writeln("<span class=\"add\">+</span>");
	document.writeln("</td>");
	
	document.write("<td class=\"subtotal\">"); // ADD CDN $
	document.write(itemsCheckOut[i].price);
	document.writeln("</td>");
	
	document.writeln("<td class=\"operation\"><span class=\"delete\">Remove</span></td>");
}