var apiKey = require("./../.env").apiKey;

var map;
function initMap() {
  var myLatLng = {lat: 37.0902, lng: -95.7129};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 5
  });

  map.addListener('click', function(event) {
    marker = new google.maps.Marker({position: event.latLng, map: map});
    markerLat = marker.position.lat();
    markerLon = marker.position.lng();
    getConcerts(markerLat, markerLon);
    $('#bandName').text(''),
    $('#venue').text(''),
    $('#date').text(''),
    $('#ticket_status').text(''),
    $('#ticket_link').text('');
  });
}

function getConcerts(thisLat, thisLon){
  $.get('http://api.bandsintown.com/events/search?location=' + thisLat + ',' + thisLon + '&radius=10&format=json&app_id=EpicodusStudentProject',

 function(info){
   if (info[0]) {
     for(var i=0; i<info.length; i++)
       $("#bandName").append('<p>'+info[i].artists[0].name +'</p>'),
       $('#venue').append('<p>' + info[i].venue.name + '</p>'),
       $('#date').append('<p>' + info[i].datetime + '</p>'),
       $('#ticket_status').append('<p>' + info[i].ticket_status + '</p>'),
       $('#ticket_link').append("<p><a href='" + info[i].ticket_url + "'><button>Buy Tickets</button></a><p>");
       console.log(info);
   } else {
     $('#bandName').text('Sorry, no bands are playin in this area.');
     }
  });
}

$(document).ready(function(){
   $.get('https://maps.googleapis.com/maps/api/js?key='+ apiKey + '&callback=initMap',
   function(newMap){
     $("#map").show(initMap());
   });
});
