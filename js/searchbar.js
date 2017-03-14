

$(document).ready(function () {  

	loadData();


});

function loadData()
{
	

	

	$.getJSON( "https://jsonblob.com/9aee3bb1-08e0-11e7-a0ba-5105f8aa6676", function( data ) {
  			debugger;
  }).done(function() {
  	debugger;
    console.log( "second success" );
  });

}
