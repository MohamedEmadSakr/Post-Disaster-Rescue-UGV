import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-vehicle-control',
  templateUrl: './vehicle-control.component.html',
  styleUrls: ['./vehicle-control.component.css']
})

export class VehicleControlComponent {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  public map!: google.maps.Map;
  public markers: google.maps.Marker[] = [];

  zoom = 15;
  public ugvLocation: google.maps.LatLngLiteral = { lat: 30.1055, lng: 31.3854 };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 1,
  };

  public constructor(private _httpclient: HttpClient) {
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };


  vehiclemarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    label: "UGV"
  };


  markerPositions: google.maps.LatLngLiteral[] = [
    {
      lat: 30.1058,
      lng: 31.385,
    }
  ];

  public ugvMarker = new google.maps.Marker({
    position: this.ugvLocation,
    map: this.map,
    title: 'UGV'
  });


  public missionMarkers = new google.maps.Marker({
    position: this.ugvLocation,
    map: this.map,
    title: 'UGV'
  });

  public pinPoints: google.maps.Marker[] = [];

  missions = [{
    missionId: 1234,
    missionName: "mission 1",
    noOfSurvivors: 5
  }]

  ngAfterViewInit() {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.ugvLocation,
      zoom: 12
    });

    this.ugvMarker.setMap(this.map);
    setInterval(() => {
      this.loadMarkers()
    }, 1000); // set interval to 1000ms (1 second)
  }

  public pinLocation() {
    let pinPoint = new google.maps.Marker({
      position: this.ugvLocation,
      map: this.map,
      title: 'Survivor'
    });
    this.pinPoints.push(pinPoint);
    pinPoint.setMap(this.map);
    alert("marker added");
  }

  public loadMarkers() {
    // Create a new marker object for each location
    this._httpclient.get("https://172.20.10.10:5000/coordinates").subscribe((location: any) => {
       this.ugvLocation.lat = location.lat;
      this.ugvLocation.lng = location.lng;
      this.ugvMarker.setPosition(this.ugvLocation);
    })
  }

  //ngOnInit() {
  //  let directionRequest = new google.maps.DirectionsService();
  //  this._httpclient.get("https://172.20.10.10:5000/coordinates").subscribe((location: any) => {
  //    this.ugvLocation.lat = location.lat;
  //    this.ugvLocation.lng = location.lng;
      
  //    console.log(this.ugvLocation);
  //  })
  //  let request: google.maps.DirectionsRequest = {
  //    origin: this.ugvLocation,
  //    destination: this.markerPositions[0],
  //    travelMode: google.maps.TravelMode.DRIVING,
  //  };
  //  directionRequest.route(request, (result, status) => {
  //    if (status === google.maps.DirectionsStatus.OK) {
  //      const directionsRenderer = new google.maps.DirectionsRenderer({
  //        map: this.map.googleMap,
  //        suppressMarkers: true,
  //      });
  //      directionsRenderer.setDirections(result);
  //    }
  //  });
  //  setInterval(() => {
  //    this._httpclient.get("https://172.20.10.10:5000/coordinates").subscribe((location: any) => {
  //      this.ugvLocation.lat = location.lat;
  //      this.ugvLocation.lng = location.lng;
  //      console.log(this.ugvLocation);
  //    })
  //  }, 5000); // set interval to 1000ms (1 second)
  //}

}
