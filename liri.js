var keys = require('./keys');
var fs   = require('fs');
var omdbApiKey = "40e9cece";
spotifyClientID = "d30b40453f4b4c91891565a41bb149e5";
spotifyClientSecret = "8f425f8bee264d22ac9aa25b7d05d113";
spotifyAppName = "liri-node-app-bk";
twitterAppName = "liri-node-app-bk";
defaultMovie   = "Mr. Nobody";
defaultSong    = "The Sign";
console.log(keys);
var writeLog = function(data) {
  fs.appendFile("log.txt", '\n\n');
  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("log.txt  updated!");
  });
}

switch (process.argv[2]) {
    case 'my-tweets':
      getMyTweets();
      break;
    case 'spotify-this-song':
      getSpotifyStuff(process.argv[3]);
      break;
    case 'movie-this':
      getMovieStuff(process.argv[3]);
      break;
    case 'do-what-it-says':
      doWhat();
      break;
    default:
      console.log("I cannot figure out what you want!");
  }
  function getMyTweets() {
  	console.log("in getMyTweets");
  }
  function getSpotifyStuff(songName){
  	var songToUse = "";
  	console.log("in getSpotifyStuff");
  	console.log("song name is " + songName);
  	if (songName == undefined) {
       songToUse = defaultSong
  	} else {
  		songToUse = songName;
  	}
  	console.log("songToUse = " + songToUse);
  }
  function getMovieStuff(movieName) {
  	var nameToUse = "";
  	if (movieName == undefined) {
  		nameToUse = defaultMovie;
  	} else {
  		nameToUse = movieName;
  	}
  	console.log("nameToUse = " + nameToUse);
  }
  function doWhat() {
  	console.log("in doWhat");
  }