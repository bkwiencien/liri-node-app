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
switch (process.argv[2]) {
    case 'my-tweets':
      getMyTweets();
      break;
    case 'spotify-this-song':
      getMeSpotifyStuff(process.argv[3]);
      break;
    case 'movie-this':
      getMovieStuff(process.argv[3]);
      break;
    case 'do-what-it-says':
     // doWhatItSays();
      break;
    default:
      console.log("I cannot figure out what you want!");
  }
  function getMyTweets() {
  	console.log("in getMyTweets");
  }
  function getSpotifyStuff(songName){
  	console.log("in getSpotifyStuff");
  }
  function getMovieStuff(maveNAme) {
  	console.log("in getMovieStuff");
  }