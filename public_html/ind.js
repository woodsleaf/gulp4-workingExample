// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [
        "1999",
        "Little Red Corvette"
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

var flags = [0,0,0,0];
// Only change code below this line
function updateRecords(id, prop, value, flags) {

  /*if(collection[id].hasOwnProperty(prop)){
    flags[0] = 1; //prop exist
  }*/
  if (collection[id][prop].length > 1) {
    flags[1] = 1; //prop value is array
  }
  if (typeof(collection[id][prop]) === object) {
    flags[2] = 1; //prop value is array
  }
  flags[3] = 1;


  //collection[id][prop].push(value);

  //collection[id][prop] = value;
  console.log(flags);
  console.log(collection);
  return collection;
}


// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");
