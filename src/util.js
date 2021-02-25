import React from "react";
import numeral from "numeral";
import './util.css'
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={"rgb(178, 0, 0)"}
      fillColor={"#FFF"}
      fillOpacity={0.5}
      radius={50000}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
          >
            <center><img src={country.countryInfo.flag}/></center>
          </div>
          <div className="name"><strong>{country.country}</strong></div>
          <div className="confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));