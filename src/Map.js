import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'
import { showDataOnMap } from "././util";
import './Components/map.css'

var map_border = {
  border: "solid 15px black"
};

function MapDisplay({ countries, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries)}
      </MapContainer>
    </div>
  );
}

export default MapDisplay;