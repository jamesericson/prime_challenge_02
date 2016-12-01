console.log("js");

var searchResults = [];

$(document).ready(function(){
  console.log("jQuery");

  $("#searchButton").on('click', function(){
    var newSearch =  $("#movieSeach").val();

    console.log("newSearch: ", newSearch);
    var searchUrl = 'http://www.omdbapi.com/?s=' + newSearch;
    $('input').val('');

    searchResults = [];
    getResults(searchUrl);

  });//end on click

  var getResults = function(searchUrl){
    $.ajax({ url:searchUrl, datatype:'JSON', success:function(data){
    console.log('got this data: ', data);

    for (var i = 0; i < data.Search.length; i++) {
        searchResults.push({
          title: data.Search[i].Title,
          year: data.Search[i].Year,
          posterURL: data.Search[i].Poster
        });
      }//end for
      console.log('Serach Reasult Array', searchResults);
      displayToDom();
    }}); //end ajax
  }; // end get Results


  var displayToDom = function() {
    console.log(" in displayToDom");

    var htmlText = "";
    for (var i = 0; i < searchResults.length; i++) {
      htmlText += '<h2>'+ searchResults[i].title + '</h2>';
      htmlText += '<h3>' + searchResults[i].year + '</h3>';
      if ( searchResults[i].posterURL !== 'N/A' ){
        htmlText += '<img  src="' + searchResults[i].posterURL + '" alt="' + searchResults[i].title + '">';
      } else {
        htmlText += "<p>--no poster to display--</p>";
      }
    }//end for
    $( '#outputText' ).html( htmlText );
  };//end displayToDom



});//end doc ready
