import React from "react";
import "./table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>{numeral(country.cases).format('0,0')}</td>
          <td><img class="table-flag" src={country.countryInfo.flag}/></td>
        </tr>
      ))}
    </div>
  );
}

export default Table;