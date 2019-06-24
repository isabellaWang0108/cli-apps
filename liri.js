// Question
//     how to set a default value in each function?


var axios = require("axios");
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


// set up the seconde command
var secondCommand=process.argv[3];



// for concert_this
function concert_this(){
    axios.get("https://rest.bandsintown.com/artists/" + secondCommand + "/events?app_id=codingbootcamp")
    .then(function(response) {
        console.log("Venue: "+response.data[0].venue.name);
        console.log("location: "+response.data[0].venue.city);
        console.log("time: "+moment(response.data[0].datetime).format('LLLL'))
        
    });
}

// for spotify-this-song
function spotify_this_song(string){
    spotify.search({ type: 'track', query: string})
    .then(function(response) {
   

        console.log("artist name: "+response.tracks.items[0].album.artists[0].name);
        console.log("album name: "+response.tracks.items[0].album.name);
        console.log("link to song: "+response.tracks.items[0].external_urls.spotify);
        console.log("song name: "+response.tracks.items[0].name);

    }).catch(function(error) {
        console.log("error");
     })
}


// movie search
function movie_this(string){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+string) 
    .then(function(response) {
        // if(response.data.Response=="False"){
        //     secondCommand="Mr.Nobody";
        // };
        console.log("title: "+response.data.Title);
        console.log("year: "+response.data.Year);
        console.log("IMDB rating: "+response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes rating: "+response.data.Ratings[1].Value);
        console.log("country of production: "+response.data.Country);
        console.log("language: "+response.data.Language);
        console.log("plot: "+response.data.Plot);
        console.log("Actors: "+response.data.Actors);
    });
}

// do_what_it_says(
    function do_what_it_says(){
        fs.readFile("random.txt","utf8", function(error, data) {
          
            var newArray=data.split(",");

            if(newArray[0]=="concert-thisg"){
                concert_this(newArray[1]);
            }

            if(newArray[0]=="spotify-this-song"){
                spotify_this_song(newArray[1]);
            }

            if(newArray[0]=="movie-this"){
                movie_this(newArray[1]);
            }
            
            
          
          });
    }

switch (process.argv[2]){
    case  "concert-this":
        concert_this(secondCommand);
    break;

    case "spotify-this-song":
        spotify_this_song(secondCommand);
    break;
 
    case "movie-this":
        movie_this(secondCommand);
    break;
 
    case "do-what-it-says":
        do_what_it_says();
    break;
}