var lochttp = "http://ipinfo.io/json"
var mainCountry = "";
var mainPostal = ""
var key = "41ac040badaa3b69dea1c0c3533dcec8"
var weatherHttp = "http://api.openweathermap.org/data/2.5/weather?zip="
var weather = 1;
var temp;

function changeUnit(){
  if($("#unit").html()[1] == "F"){
      $("#temp").html("Tempture: " + (((temp-273.15)*(9/5))+32).toFixed(0) + "&degF")
      $("#unit").html("&degC")
  }else{
      $("#temp").html("Tempture: " + (temp-273.15).toFixed(1) + "&degC")
      $("#unit").html("&degF")
  }
}

function changeScreen(num){
  if (num >= 200 & num <= 232) {
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/35d06ff3-faa4-11e5-a45b-712ef2f70c9c.gif" )
    $("#weather-sky").css("background-color", "#42445A")
  }
  else if(num >= 300 & num <=531){
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/96ef1ccf-fa23-11e5-9a68-0f7070c636bb.gif" )
    $("#weather-sky").css("background-color", "#000C24")
  }
  else if(num >= 600 & num <=622){
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/8198bf2b-fa22-11e5-9c62-0f7070c636bb.gif" )
    $("#weather-sky").css("background-color", "#51708D")
  }
  else if (num >=801 & num<= 804){
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/93f38e8c-faa3-11e5-b824-712ef2f70c9c.gif" )
    $("#weather-sky").css("background-color", "#7C9196")
  }
  else if (num == 800){
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/f517a49e-faa3-11e5-bac2-712ef2f70c9c.gif" )
    $("#weather-sky").css("background-color", "#CDE5FF")
  }else{
    $("#image").attr("src","http://piskel-imgstore-b.appspot.com/img/2cd56c9e-f9d8-11e5-8c20-0f7070c636bb.gif" )
    $("#weather-sky").css("background-color", "#9AC4FF")

  };

}

function getWeather(zip){
  $.getJSON(weatherHttp + zip + "," + mainCountry + "&appid=" + key, function(json){
    temp = json["main"]["temp"]
    createLocation(json)
    changeScreen(json["weather"][0]["id"])
  })
}

function createLocation(obj){
  $("#location").html(obj["name"] + ", " + obj["sys"]["country"])
  $("#temp").html("Tempture: " + (obj["main"]["temp"]-273.15).toFixed(1) + "&degC")
  $("#description").html(obj['weather'][0]["description"])
}

$(document).ready(function(){
  $("#weather-tv").css("height", $("#weather-tv").width())
  $("#weather-ground").css("height", $("#weather-tv").width())
  $.getJSON(lochttp,function(data){
    mainCountry = data.country;
    mainPostal = data.postal;
    getWeather(mainPostal)
  })
  $("#unit").on("click", function(){
    changeUnit()
  })
  $("#new-location").on("click", function(){
    $("#loaction-box").addClass("active")
  })
  $("#done").on("click", function(){
    getWeather($("#zip").val())
    $("#loaction-box").removeClass("active")
  })
  $("cancel").on("click", function(){
    $("#loaction-box").removeClass("active")
  })

    $(window).resize(function(){
      $("#weather-tv").css("height", $("#weather-tv").width())
      $("#weather-ground").css("height", $("#weather-tv").width())
    })
  })
