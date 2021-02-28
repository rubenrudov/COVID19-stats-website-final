import './App.css';
import React, { useEffect, useState } from 'react'
import { FormControl, Select, MenuItem, Card, CardContent, LinearProgress } from '@material-ui/core'
import InfoBox from './Components/InfoBox'
import MapDisplay from './Map'
import Table from "./Table";
import GraphView from './GraphView'
import PieChart from './PieChart'
import { sortData } from "./util"
import "leaflet/dist/leaflet.css";
import { faGithub, faInstagram, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ArticleBox from './ArticleBox'
import img1 from './assets/vaccine.png'
import img2 from './assets/mask_wearing.png'
import img3 from './assets/washing_hands.jpg'
import img4 from './assets/covid_logo.svg'

var border = {
  border: "solid 10px DodgerBlue",
  borderRadius: "30px",
  textAlign: "center",
  padding: "20px",
}

var footer_icon = {
  paddingRight: "10px",
  paddingLeft: "10px",
  paddingTop: "5px",
}

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [worldwideData, setWorldWide] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(4);
  const [] = useState();
  /* 
  const [vaccined_country_days_Info, set_vaccined_country_days_Info] = useState({});
  */
  var country_vac = '';
  function updateCountry(){
    console.log(country_vac);
  }
  var vaccined_country_days = "https://disease.sh/v3/covid-19/vaccine/coverage/countries/israel?lastdays=30"
  useEffect(() => {
    fetch(vaccined_country_days)
      .then((response) => response.json())
      .then((data) => {
        console.log(data['timeline'])
        console.log(data['country'])
        // setCountryInfo(data);
      });
  }, []);
  /*
  useEffect(() => {
    const getCountriesData = async () => {
      fetch(vaccined_country_days)
        .then((response) => response.json())
        .then((data) => {
          var countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
            flag: country.countryInfo.flag
          }));
          let sortedData = sortData(data);
          setCountries(countries);
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
    */


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setWorldWide(data);
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
            flag: country.countryInfo.flag,
            population: country.population
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
  var today = new Date(), date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();


  return (
    <div className="App">
      <div className="sides-containers">
        <div className="left-container">
          <div className="topbar">
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
          <br/>      
          <center><h2>Date {date}</h2></center>
          <br/>
          <div className="wrapper">
            <div className="stats">
              <InfoBox
                  onClick={(e) => setCasesType("cases")}
                  title="World-wide Covid-19 Cases"
                  color="red"
                  cases={worldwideData.todayCases}
                  total={worldwideData.cases}
                  type="cases"
                  pop={country.population}
              />
              <InfoBox
                  onClick={(e) => setCasesType("cases")}
                  title="World-wide Covid-19 recovered"
                  color="green"
                  cases={worldwideData.todayRecovered}
                  total={worldwideData.recovered}
                  type="cases"
                  pop={country.population}
              />
              <InfoBox
                  onClick={(e) => setCasesType("cases")}
                  title="World-wide Covid-19 deaths"
                  color="black"
                  cases={worldwideData.todayDeaths}
                  total={worldwideData.deaths}
                  type="cases"
                  pop={country.population}
              />
            </div>
          </div>

          <MapDisplay
              countries={mapCountries}
              center={mapCenter}
              zoom={mapZoom}
          /> 
          <br/>
          <center>
          <h1 className="country-name-title"> 
            {
             countries.map((country2) =>(
              country2.value === country ?  <p> {country2.name} </p> : null
             ))
            }
          </h1>
          {/* <p> In: {country}</p> */}
          {countries.map((country2) => (
            country2.value === country ? <div><img className="info-box-flag" src={country2.flag}/></div> : null
           ))}

           {console.log(
             countries.map((country2) =>(
              country2.value === country ?  console.log(country2) : null
             ))
             )}
          </center>
          
          <div className="stats">
              <InfoBox
                  onClick={(e) => setCasesType("cases")}
                  title="Coronavirus Cases"
                  color="red"
                  cases={countryInfo.todayCases}
                  total={countryInfo.cases}
                  type="cases"
                  pop={country.population}
              />
              <InfoBox
                  onClick={(e) => setCasesType("recovered")}
                  title="Coronavirus recovered"
                  color="green"
                  cases={countryInfo.todayRecovered}
                  total={countryInfo.recovered}
                  type="recovered"
                  pop={country.population}
              />
              <InfoBox
                  onClick={(e) => setCasesType("deaths")}
                  title="Deaths"
                  color="black"
                  cases={countryInfo.todayDeaths}
                  total={countryInfo.deaths}
                  type="deaths"
                  pop={country.population}
              />  
          </div>
          <GraphView 
          title="Covid cases in the last 30 days"
          casesType="cases"
          color="rgba(178, 0, 0, 0.5)"
          borderColor="rgb(178, 0, 0)"
        />
        
        <GraphView 
          title="Covid recovered in the last 30 days"
          casesType="recovered"
          color="rgba(0, 178, 0, 0.5)"
          borderColor="rgb(0, 178, 0)"
        />
        <GraphView 
          title="Covid mortality rate in the last 30 days"
          casesType="deaths"
          borderColor="black"
        />

        <form>
            <label>
              Enter Number of days: &nbsp;
            </label>
            <br />
            <input type="text" name="Enter_Number_of_days" 
                value={country_vac} onChange={updateCountry} />
            <br />
            <label>
            Enter Country Name: &nbsp;
            </label>
            <br />
            <input type="text" name="Enter_Country_Name" 
              value={country_vac} onChange={updateCountry} />
            <br />
            <br />
            <input type="submit" value="Submit" />
        </form>
        <br/>
        <br/>
        <div className="graphs-by-country">
          <PieChart />
          <PieChart />
          <PieChart />
        </div>
        </div>
        <br/>
        <div className="right-container">
          <Card style={border}>
            <CardContent>
              <div className="info">
              <h3><center><strong><u>Live cases by country</u></strong></center></h3>
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
      </div>
      <br/>
      <footer class="footer">
        <center>
          <a href="https://github.com/Ruby-Adam-softwares"><FontAwesomeIcon className="footer-fa-icon" icon={faGithub} color={"white"} style={footer_icon}/></a>
          <a href="https://www.instagram.com/rudovruben"><FontAwesomeIcon className="footer-fa-icon" icon={faInstagram} color={"white"} style={footer_icon}/></a>
          <a href="https://www.linkedin.com/in/ruben-rudov-106a22204/"><FontAwesomeIcon className="footer-fa-icon" icon={faLinkedin} color={"white"} style={footer_icon}/></a>
          <a href="mailto:adamruben.softwares@gmail.com"><FontAwesomeIcon className="footer-fa-icon" icon={faGoogle} color={"white"} style={footer_icon}/></a>
          <p>© Ruben & Adam softwares 2021</p>
        </center>
    </footer>
    </div>
  );
}

export default App;
