
//This array sets the pre-set string options that appear on the screen when it is loaded.
var topics = [
	"allen iverson",
	"michael jordan",
	"kobe bryant",
	"shaquille o'neil",
	"steve nash",
	"stephen curry",
	"lebron james",
	"kevin garnett",
	"paul pierce",
	"chris paul",
	"jason kidd",
	"chris webber",
	"charles barkley",
	"jason williams"

];

//This for loop runs through the array one by one and creates the pre-set buttons.
//Create a new variable named playerbutton which creates a new button via jquery and applys text based on the for loop result and index
//Add an attribute to the player button as well as a class designator to be able to call it later.
for(var i = 0; i < topics.length; i++) {
	var playerbutton = $("<button>").text(topics[i]);
	playerbutton.attr("data-player", topics[i]);
	playerbutton.addClass("player-button");
	$("#playerbutton-group").append(playerbutton);
}

//This section creates an on click function which allows the user to click on the "Shoot" button and render an action
$("#add-player-button").on("click", function(e) {
	e.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#new-player-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#new-player-input").val() !== "" && alreadyExist === false) {
		var newBaller = $("#new-player-input").val().toLowerCase();
		topics.push(newBaller);
		var button = $("<button>").text(newBaller);
		button.attr("data-player", newBaller);
		button.addClass("player-button");
		$("#playerbutton-group").append(button);
	}
	$("#new-player-input").val("");
});

//This section sets up the document on click feature which enables the DOM to respond to when the user interacts by clicking on buttons.
//Creates a new variables called hooper and queryURL
//queryURl equals to the url from which we will be pulling information from plus it includes the assigned api key as well as sets the limit of number of giphys to return equal to a limit of 10.

$(document).on("click", ".player-button", function() {
	var hooper = $(this).attr("data-player");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hooper + "&api_key=r2eQ62susITH5yMEm5a8a4CIJtciMARA&limit=10";

//This section uses the ajax call function to "get" information from the given website.
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var playerPic = $("<img class='result'>");
    		playerPic.attr("src", results[i].images.fixed_height_still.url);
    		playerPic.attr("data-state", "still");
    		playerPic.attr("data-still", results[i].images.fixed_height_still.url);
    		playerPic.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(playerPic);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#allstar-group").prepend(resultsContainerSection);
    });
});