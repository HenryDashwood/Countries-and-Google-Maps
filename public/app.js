window.onload = function() {
  var url = 'https://restcountries.eu/rest/v1';
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if(request.status === 200) {
      var jsonString = request.responseText;
      var countries = JSON.parse(jsonString);
      var country = countries[0];
      main(countries);
      initMap();
    }
  }
  request.send(null);
}
  
  var main = function(countries) {

    populateSelect(countries);
    var selected = countries[0];
    var cached = localStorage.getItem("selectedCountry");
    
    if(cached) {
      selected = JSON.parse(cached);
      document.querySelector("#countries").selectedIndex =selected.index;
    }

    updateDisplay(selected);
    document.querySelector("#info").style.display = "block";
  }

  var populateSelect = function(countries) {
    var parent = document.querySelector("#countries");
    countries.forEach(function(item, index) {
      item.index = index;
      var option = document.createElement("option");
      option.value = index;
      option.text = item.name;
      parent.appendChild(option);
    });
    parent.style.display = "block";
    parent.addEventListener("change", function() {
      var index = this.value;
      var country = countries[index];
      updateDisplay(country);
      localStorage.setItem("selectedCountry", JSON.stringify(country));
    })
  }

  var updateDisplay = function(country) {
    var tags =document.querySelectorAll("#info p");
    tags[0].innerText = country.name;
    tags[1].innerText = country.capital;
    tags[2].innerText = country.population;
  }



var initMap = function() {
  var home = {lat: 52.052156, lng: -1.220455}
  var CodeClan = {lat: 55.9486, lng: -3.1999}

  var map = new Map(CodeClan, 14);
  // map.addMarker(home, "F");
  // map.addMarker(CodeClan, "C");
  // map.bindClick();
  // var locator = new GeoLocator(map);
  // locator.setMapCenter();
  map.addInfoWindow(home, "my info window!");
}