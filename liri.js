var keys = require('./keys');
var fs   = require('fs');
var request = require('request');
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
    var formattedName = "";
  	if (movieName == undefined) {
  		nameToUse = defaultMovie;
  	} else {
  		nameToUse = movieName;
  	}
    formattedName = handleSpaces(nameToUse);
    console.log("formattedName = " + formattedName);
// the main logic
  var urlHit = "http://www.omdbapi.com/?t=" + formattedName + "&y=&plot=full&tomatoes=true&r=json&apikey=40e9cece";

  request(urlHit, function(error, response, body) {
    console.log("after request error is "+error);
    console.log("statusCode = " + response.statusCode);
    console.log("body = " + body);
    if (!error && response.statusCode == 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data);
      writeLog(data);
}
  });
// end of main logic    
  }
  function doWhat() {
  	console.log("in doWhat");
    fs.readFile('./random.txt', 'utf8', function (error, data) {
    if (error) {
      console.log('ERROR: Reading random.txt -- ' + error);
      return;
    } else {
      var cmdString = data.split(',');
      var command = cmdString[0].trim();
      var p = cmdString[1].trim();

      switch(command) {
        case 'my-tweets':
          getMyTweets(); 
          break;

        case 'spotify-this-song':
          getSpotifyStuff(p);
          break;

        case 'movie-this':
          getMovieStuff(p);
          break;
      }
    }
  });
}
function handleSpaces(thing) {
  var array = [];
  var ret = "";
  array = thing.split(" ");
  for (j=0;j<array.length;j++){
    ret = ret + array[j]+"+";   
  }
  console.log("ret = " + ret);
  ret = ret.slice(0, -1);
  return(ret);

}
