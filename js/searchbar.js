
var searchInterval;
var data;
var listPosition = 0;


$(document).ready(function () {  

	loadData();

	$('#searchText')
	.keyup(function(event)
		{
			if(event.keyCode == 38 || event.keyCode == 40)
				return;

			//clear the search interval
			clearInterval(searchInterval);
			//only execute search after no input for 500 ms
			searchInterval = setInterval(function(){search(event.currentTarget.value.toLowerCase())},500);				
		})
	.keydown( function(event) {
            if(event.keyCode == 13) {
                search(event.currentTarget.value.toLowerCase());
            }
        });


	$(document).keydown(function(e) {
    switch(e.which) {       

        case 38: // up
        	if (listPosition > 0)
        	{
        		listPosition--;
        		arrowNav();
        	}
        break;       

        case 40: // down

        	listPosition++;
        	arrowNav();

        break;      

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)

});


	//$('#searchDropDown').on('click',function()
//	{
//		$('#searchText').focus();
//	});

	
});

function loadData()
{
	$.getJSON( "https://raw.githubusercontent.com/Biot-Savart/SearchBar/develop/data.json", function( pdata ) {
		
		data = pdata;	//store data because data does not change. If live system the data call will be done on every search.

		search("");			
  			
  });
}

function arrowNav()
{


	//debugger;

	var list = $('.listItem').css( "background-color", "white" );

	if (listPosition >= list.length)
		listPosition--;

	$('.listItem').eq( listPosition ).css( "background-color", "#E0FFFF" );

	
}

function addSearch(data,searchText)
{
	var table = "<ul class='projectList'>";
	table += '<li role="separator" class="divider" id="firstDevider"></li>';
		for (var pcount = 0; pcount < data.length; pcount++)
		{		

			table += "<div class='row'><div class='col-md-1'><img src='"+data[pcount].image.link+"'/></div><div class='col-md-6' id='testdiv'><li class='dropdown-header projectName listItem' ><a href='#''>" + highlightWords(data[pcount].name,searchText) + "</a></li>";
			table += "<ul class='groupList'>";
			//debugger;
			for (var groupCount = 0; groupCount < data[pcount].groups.length; groupCount++) {
				table += "<li class='groupName listItem'><a href='"+data[pcount].groups[groupCount].url+"''>"+highlightWords(data[pcount].groups[groupCount].name,searchText)+"</a></li>";
			}

			table += "</ul></div></div>";

			table += '<li role="separator" class="divider"></li>';
		}

		table += "</ul>";

		$("#searchTable").html(table);

		focusFirst();
}

function focusFirst()
{	
	$('#searchText').focus();
	$('.listItem').eq( 0 ).css( "background-color", "#E0FFFF" );	
}




function highlightWords( line, word )
{
     var regex = new RegExp( '(' + word + ')', 'gi' );
     return line.replace( regex, "<span class='highlight'>$1</span>" );
}


function search(searchText)
{
	//clear the search interval
	clearInterval(searchInterval);

	var newData = JSON.parse(JSON.stringify(data));	//copy the data array

	if (searchText == "")
	{
		addSearch(newData);
		return;
	}

	for (var pcount = 0; pcount < newData.length; pcount++)
	{			
		for (var groupCount = 0; groupCount < newData[pcount].groups.length; groupCount++) 
		{
				var groupRes = newData[pcount].groups[groupCount].name.toLowerCase().split(searchText);

				if (groupRes.length == 1)
				{
					newData[pcount].groups.splice(groupCount,1);
					groupCount--;
					continue;
				}
				
		}

		var ProjectRes = newData[pcount].name.toLowerCase().split(searchText);	

		if (ProjectRes.length == 1 && newData[pcount].groups.length == 0)
		{
			newData.splice(pcount,1);
			pcount--;
		}		
	}	

	addSearch(newData,searchText);


}
