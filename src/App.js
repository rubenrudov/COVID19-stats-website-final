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
import ArticleBox from './ArticleBox'
import img1 from './assets/vaccine.png'
import img2 from './assets/mask_wearing.png'
import img3 from './assets/washing_hands.jpg'

var border = {
  border: "solid 10px DodgerBlue",
  borderRadius: "30px",
  textAlign: "center",
  padding: "20px",
}

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);
  const [] = useState();


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
            flag: country.countryInfo.flag
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
      setMapZoom(4);
    });
  };


  return (
    <div className="App">
        <div className="left-container">
          <div className="topbar">
              <div className="topbar-left">
                <FontAwesomeIcon className="fa-icon" icon={faGlobeEurope} />
                <u><h1>COVID-19 world map</h1></u>
                <FontAwesomeIcon className="fa-icon" icon={faMeteor} />
              </div>
              <FormControl className="spinner">
                <Select
                  variant="outlined"
                  value={country.name}
                  onChange={onCountryChange}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country) => (
                    <MenuItem className="menu-item" value={country.value}>
                      <tr>
                        <td><img className="spinner-flag" src={country.flag}/></td>
                        <td>
                        {country.name}
                        </td>
                      </tr>
                      </MenuItem>
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
                active
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
                type="cases"
            />
            <InfoBox
                onClick={(e) => setCasesType("recovered")}
                title="Coronavirus recovered"
                color="green"
                active
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
                type="recovered"
            />
            <InfoBox
                onClick={(e) => setCasesType("deaths")}
                title="Deaths"
                color="black"
                active
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
                type="deaths"
            />  
        </div>
      </div>
      <br/>
      <div className="right-container">
        <Card style={border}>
          <CardContent>
            <div className="info">
            <h3><center><strong><u>Live Cases by Country</u></strong></center></h3>
              {<Table countries={tableData}/>}
            </div>
          </CardContent>
        </Card>

        {/* Here goes the cards that contains the articles ... */}
        <div className="articles">
          <ArticleBox
            text="Go get vaccinated"
            imgPath={img1}
            color="purple"
          />
          <br/>
          <ArticleBox 
            text="Wear a mouth-nose mask outside home"
            imgPath={img2}
          />
          <br/>
          <ArticleBox 
            text="Wash you hands"
            imgPath={img3}
          />
        </div>
      </div>
      {/*<Footer/>*/}
    </div>
  );
}

export default App;
