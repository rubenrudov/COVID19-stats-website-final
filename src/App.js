import './App.css';
import React, { useEffect, useState } from 'react'
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import InfoBox from './Components/InfoBox'
import MapDisplay from './Map'
import Table from "./Table";
import { sortData } from "./util"
import Footer from './Footer'
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMeteor, faGlobeEurope } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          var countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInputCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(1);
    });
  };


  return (
    <div className="App">
        <div className="left-container">
          <div className="topbar">
              <div className="topbar-left">
                <FontAwesomeIcon className="fa-icon" icon={faGlobeEurope} />
                <u><h1>COVID-19 STATS TRACKER</h1></u>
                <FontAwesomeIcon className="fa-icon" icon={faMeteor} />
              </div>
              <FormControl className="spinner">
                <Select
                  variant="outlined"
                  value={country}
                  onChange={onCountryChange}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
          </div>

        <MapDisplay
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
        /> 

<div className="stats">
            <InfoBox
                onClick={(e) => setCasesType("cases")}
                title="Coronavirus Cases"
                color="red"
                active={casesType === "cases"}
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
                type="cases"
            />
            <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Coronavirus recovered"
                color="green"
                active={casesType === "recovered"}
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
                type="recovered"
            />
            <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                color="black"
                active={casesType === "deaths"}
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
                type="deaths"
            />  
        </div>
      </div>
      <br/>
      <div className="right-container">
        <Card >
          <CardContent>
            <div className="info">
            <h3><center><strong><u>Live Cases by Country</u></strong></center></h3>
              {<Table countries={tableData}/>}
              <h3><center><strong><u>Worldwide new {casesType}</u></strong></center></h3>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
