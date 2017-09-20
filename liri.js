var keys = require('./keys');
var fs   = require('fs');
var request = require('request');
var Spotify = require('spotify');
var Twitter = require('twitter');
var omdbApiKey = "40e9cece";
var spotifyClientID = "d30b40453f4b4c91891565a41bb149e5";
var spotifyClientSecret = "8f425f8bee264d22ac9aa25b7d05d113";
var spotifyAppName = "liri-node-app-bk";
var twitterAppName = "liri-node-app-bk";
var defaultMovie   = "Mr. Nobody";
var defaultSong    = "The Sign";
console.log(keys);
var writeLog = function(data) {
  fs.appendFile("log.txt", '\n\n');
  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
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
    var params = { screen_name: 'bkwiencien', count: 10 };
    var client = new Twitter({
      consumer_key: keys.consumer_key,
      consumer_secret: keys.consumer_secret,
      access_token_key: keys.access_token_key,
      access_token_secret: keys.access_token_secret
    });
  	console.log("in getMyTweets");
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var dd = []; 
      console.log("there was no error");
      for (var i = 0; i < tweets.length; i++) {
        dd.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(dd);
      writeLog(dd);
    } else {
      console.log("error ");
    }
  });
  }
  var getNames = function(artist) {
    return artist.name;
  };
  function getSpotifyStuff(songName){
  	var songToUse = "";
    var songFormatted = "";
  	console.log("in getSpotifyStuff");
  	console.log("song name is " + songName);
  	if (songName == undefined) {
       songToUse = defaultSong
  	} else {
  		songToUse = songName;
  	}
    var Spotify = require('node-spotify-api');
    spotify = new Spotify({
       id: spotifyClientID,
       secret: spotifyClientSecret
    });
    spotify.search({ type: 'track', query: songToUse }, function(err, data) {
    console.log(data);
    if (err) {
      console.log('Error : ' + err);
      return;
    }
    var songs = data.tracks.items;
    var dodo = []; 

    for (var i = 0; i < songs.length; i++) {
      dodo.push({
        'artist(s)': songs[i].artists.map(getNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(dodo);
    writeLog(dodo);
  });  
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
