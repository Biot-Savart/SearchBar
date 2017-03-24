var SearchBar =
{	
	data : null,
	listPosition : 0,
	searchDiv : '',
	//Initialise the search with data in specified div and with 
	//searchDiv -> The div or element the search results must be placed
	//pdata -> the data for the search
	initSearch: function(searchDiv, pdata)
	{	
		this.data = pdata;
		this.searchDiv = searchDiv;

		//search with empty string
		this.search("");

		//fire events when keys are pressed in the search text input
		$(searchDiv + "Text")
			.keyup(function(event)
				{
					if(event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) //ignore up, down and enter keys
						return;					
					
					SearchBar.search(event.currentTarget.value.toLowerCase());	

				})
			.keydown(function(e) {
		    	switch(e.which) {       //what key was pressed

		        case 38: // up
		        	if (listPosition > 0)
		        	{
		        		listPosition--;
		        		SearchBar.arrowNav();
		        	}
		        break;       

		        case 40: // down
		        	listPosition++;
		        	SearchBar.arrowNav();
		        break;

		        case 13: // enter
		        	SearchBar.goToLink();
		        break;       

		        default: return; // exit this handler for other keys
		    }
		    e.preventDefault(); // prevent the default action (scroll / move caret)

			});
	},
	
	//highlight item on arrow up/down navigation
	arrowNav : function()
	{
		var list = $('.listItem').css( "background-color", "white" ); //set all item backgrounds to white

		if (listPosition >= list.length)	//if listposition is larger that number of item, decrement
			listPosition--;

		var item = $('.listItem').eq( listPosition ).css( "background-color", "#E0FFFF" ).focus();	//set background colour of selected list item

		var container = $('.customDropDown');   
		//scroll so that selected item is in view
		container.animate({
	   	scrollTop: item.offset().top - container.offset().top + container.scrollTop() - 100
		},200)

	},

	//Go to highlighted link
	goToLink : function()
	{
		var link = $('.listItem').eq( listPosition ).css( "background-color", "#E0FFFF" )[0].childNodes[0].href;
		window.open(link,"_self");
	},
		
	//Update the displayed search results
	//data -> filtered data
	//searchText -> the filtered text
	addSearch : function(data,searchText)
	{
		//Construct th list to display
		var list = "<ul class='projectList'>";
			list += '<li role="separator" class="divider" id="firstDevider"></li>';

			for (var pcount = 0; pcount < data.length; pcount++)
			{	
				list += "<div class='row'><div class='col-sm-1'><img src='"+data[pcount].image.link+"'/></div><div class='col-sm-6' id='testdiv'><li class='dropdown-header projectName listItem' ><a href='#''>" + this.highlightWords(data[pcount].name,searchText) + "</a></li>";
				list += "<ul class='groupList'>";
				
				for (var groupCount = 0; groupCount < data[pcount].groups.length; groupCount++) {
					list += "<li class='groupName listItem'><a href='"+data[pcount].groups[groupCount].url+"''>"+this.highlightWords(data[pcount].groups[groupCount].name,searchText)+"</a></li>";
				}

				list += "</ul></div></div>";

				list += '<li role="separator" class="divider"></li>';
			}

			list += "</ul>";

			$(this.searchDiv).html(list);

			//Set focus to first element in list
			this.focusFirst();
	},

	//Set focus to first element in list
	focusFirst : function()
	{	
		$(this.searchDiv + "Text").focus();	
	    $('.listItem').eq( 0 ).css( "background-color", "#E0FFFF" );
	    listPosition = 0;
	},

	//Highlight the search text within the list item's text
	highlightWords : function( line, word )
	{
	     var regex = new RegExp( '(' + word + ')', 'gi' );
	     return line.replace( regex, "<span class='highlight'>$1</span>" );
	},

	//Search and filter the data using the search text
	search : function(searchText)
	{	

		var newData = JSON.parse(JSON.stringify(this.data));	//copy the data array

		//if no search text show all
		if (searchText == "")
		{
			this.addSearch(newData, "");
			return;
		}

		//cycle through projects
		for (var pcount = 0; pcount < newData.length; pcount++)
		{			
			//cycle through groups
			for (var groupCount = 0; groupCount < newData[pcount].groups.length; groupCount++) 
			{
					//Split group name using search text
					var groupRes = newData[pcount].groups[groupCount].name.toLowerCase().split(searchText);

					//if split result == 1 then search text not in group name the remove group from list
					if (groupRes.length == 1)
					{
						newData[pcount].groups.splice(groupCount,1);	//remove group from list
						groupCount--;
						continue;
					}
					
			}

			//Split project name using search text
			var ProjectRes = newData[pcount].name.toLowerCase().split(searchText);	

			//if split result == 1 (search text not in project name) and project has no groups remove project from list
			if (ProjectRes.length == 1 && newData[pcount].groups.length == 0)
			{
				newData.splice(pcount,1);	//remove project from list
				pcount--;
			}		
		}	

		//update list on frontend
		this.addSearch(newData,searchText);
	}
}
