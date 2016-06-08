var Map = function(latLng, zoom) {

  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: latLng, 
    zoom: zoom
  });

  this.addInfoWindow = function(latLng, title) {
    var marker = this.addMarker(latLng, title);
    marker.addListener('click', function() {
      var infowindow = new google.maps.InfoWindow({
          content: this.title
      });
      infowindow.open(map, marker);
    });
  };

  this.addMarker = function(latLng, title) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      title: title
    })
    return marker
  }
  this.bindClick = function() {

    google.maps.event.addListener(this.googleMap, 'click', function(event) {
      var latLng = {lat: event.latLng.lat(), lng: event.latLng.lng() }
        this.addMarker( latLng, "A" );
    }.bind( this ))

  };
  this.resetCenter = function(latLng) {
    this.googleMap.panTo(latLng);
  };

}