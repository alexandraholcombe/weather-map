var weatherKey = require('./../.env').apiKey;

var latitude = 0;
var longitude = 0;


$(function(){
  $('#weather-location').click(function(){
    var city = $('#location').val();
    $('#location').val("");

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherKey)
    .then(function(response){

      latitude = response.coord.lat;
      console.log("Latitude: " + latitude);
      longitude = response.coord.lon;
      console.log("Longitude: " + longitude);

      $('.show-weather').text("The humidity in " + city + " is " + response.main.humidity + "%");

      initMap();
    })

    .fail(function(error) {
      $('.show-weather').text(error.responseJSON.message);
    });

    function initMap() {
      var uluru = {lat: latitude, lng: longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    }

  });
});

exports.latitude = latitude;
exports.longitude = longitude;
