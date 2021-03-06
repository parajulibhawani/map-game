(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var apiKey = "AIzaSyDTxxSTai-Jb7jEh6w4_euhPozoiFTh89M";

},{}],2:[function(require,module,exports){
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
    console.log(marker);
    getConcerts(markerLat, markerLon);
    $('#bandName').text(''),
    $('#bandName').append('<h2>'+'Events'+'</h2>'),
    $('#venue').text(''),
    $('#venue').append('<h2>'+'Venue'+'</h2>'),
    $('#city').text(''),
    $('#city').append('<h2>'+'City'+'</h2>'),
    $('#date').text(''),
    $('#date').append('<h2>'+'Time'+'</h2>'),
    $('#ticket_status').text(''),
    $('#ticket_status').append('<h2>'+'Tickets'+'</h2>'),
    $('#ticket_link').text(''),
    $('#ticket_link').append('<h2>'+'Buy'+'</h2>');
  });
}

function getConcerts(thisLat, thisLon){
  $.get('http://api.bandsintown.com/events/search?location=' + thisLat + ',' + thisLon + '&radius=50&format=json&app_id=EpicodusStudentProject&',

 function(info){
   if (info[0]) {
     for(var i=0; i<info.length; i++)
      $("#bandName").append('<p>'+"<a href='" + info[i].artists[0].url + "'    target="+'_blank'+">"+info[i].artists[0].name +"</a>"+'</p>'),
      $('#venue').append('<p>' + info[i].venue.name + '</p>'),
      $('#city').append('<p>' + info[i].venue.city + '</p>'),
      $('#date').append('<p>' + info[i].datetime + '</p>'),
      $('#ticket_status').append('<p>' + info[i].ticket_status + '</p>'),
      $('#ticket_link').append("<a href='" + info[i].ticket_url + "' target="+'_blank'+"><i class='fa fa-ticket fa-1x' aria-hidden='true'></i></a>");
       console.log(info);
   } else {
     $('#bandName').text('Sorry, no bands are playin in this area.'),
     $('#venue').text(''),
     $('#city').text(''),
     $('#date').text(''),
     $('#ticket_status').text(''),
     $('#ticket_link').text('');
     }
  });
}

$(document).ready(function(){
   $.get('https://maps.googleapis.com/maps/api/js?key='+ apiKey + '&callback=initMap',
   function(newMap){
     $("#map").show(initMap());
   });
});

},{"./../.env":1}]},{},[2]);
