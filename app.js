$(document).ready(function() {
  var loc;
       //Getting the users location
       $.getJSON("http://ipinfo.io/json", function(data){
         console.log(data)
         var str = data.loc;
         console.log(str)
         loc = str.split(",")
       })


       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           lat = position.coords.latitude
           long = position.coords.longitude
           console.log(lat)

       //getting the JSON api

         $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + loc[0] + "&lon=" + loc[1] + "&appid=41ac040badaa3b69dea1c0c3533dcec8", function(json) {
           //seeing the JSON api for tests
           console.log(json);

           // city & country name
           $("#city").html(json.name + "," + json.sys.country);

           // What the weather is
           $("#weather-type").html(json.weather[0].description);

           // creating the different tempture scales
           //kelvin

           Kelvin = json.main.temp;
           //celsius
           celsius = (Kelvin - 273.15);
           celsius = celsius.toFixed(2)
             //fahrenheit
           fahrenheit = ((Kelvin - 273.15) * 1.8 + 32);
           fahrenheit = fahrenheit.toFixed(2)
           $("#temp").html("Tempture: " + celsius + "&degC");
           $("#changing-temp").html("Change to &degF")

           var weather = json.weather[0].id;
           if (weather >= 200 & weather <= 232) {
             document.getElementById("image").src = "http://piskel-imgstore-b.appspot.com/img/35d06ff3-faa4-11e5-a45b-712ef2f70c9c.gif";
           }
           else if(weather >= 300 & weather <=531){
             document.getElementById("image").src = "http://piskel-imgstore-b.appspot.com/img/96ef1ccf-fa23-11e5-9a68-0f7070c636bb.gif";
           }
           else if(weather >= 600 & weather <=622){
             document.getElementById('image').src = "http://piskel-imgstore-b.appspot.com/img/8198bf2b-fa22-11e5-9c62-0f7070c636bb.gif"
           }
           else if (weather >=801 & weather<= 804){
             document.getElementById("image").src = "http://piskel-imgstore-b.appspot.com/img/93f38e8c-faa3-11e5-b824-712ef2f70c9c.gif";
           }
           else if (weather == 800){
             document.getElementById("image").src = "http://piskel-imgstore-b.appspot.com/img/f517a49e-faa3-11e5-bac2-712ef2f70c9c.gif";
           };
         }, "jsonp");

         $("#changing-temp").on("click", function() {
           var button = document.getElementById("changing-temp").innerHTML;
           switch (button) {
             case "Change to �F":
               $("#temp").html("Tempture: " + fahrenheit + "�F");
               $("#changing-temp").html("Change to �C")
               break;
             case "Change to �C":
               $("#temp").html("Tempture: " + celsius + "�C");
               $("#changing-temp").html("Change to �F")
               break;

           }

         });
           });
       }


 });
