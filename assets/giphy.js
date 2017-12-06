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

for(var i = 0; i < topics.length; i++) {
	var playerbutton = $("<button>").text(topics[i]);
	playerbutton.attr("data-player", topics[i]);
	playerbutton.addClass("player-button");
	$("#playerbutton-group").append(playerbutton);
}

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

$(document).on("click", ".player-button", function() {
	var hooper = $(this).attr("data-player");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hooper + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	
    	console.log(results);

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