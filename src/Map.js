import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Components/map.css";
import { showDataOnMap } from "./util";

function MapDisplay({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={{lat: 34.80746, lng: -40.4796}} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default MapDisplay;