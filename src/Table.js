import React from "react";
import "./table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0, 0")}</strong>
          </td>
          <td><a href={`https://www.google.com/search?q=${country.country}`}><img className="table-flag" src={country.countryInfo.flag}/></a></td>
        </tr>
      ))}
    </div>
  );
}

export default Table;