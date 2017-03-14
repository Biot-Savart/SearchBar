

$(document).ready(function () {  

	loadData();

	
});

function loadData()
{
	$.getJSON( "https://raw.githubusercontent.com/Biot-Savart/SearchBar/develop/data.json", function( data ) {
		

		var table = "<table>";

		for (var count = 0; count < data.length; count++)
		{
			table += "<tr><td>" + data[count].name + "</td>";
			table += "<td><ul>";
debugger;
			for (var groupCount = 0; groupCount < data[count].groups.length; groupCount++) {
				table += "<li>"+data[count].groups[groupCount].name+"</li>";
			}

			table += "</td></ul>";
		}

		table += "</table";

		$("#searchTable").html(table);
  			
  });
		

}
