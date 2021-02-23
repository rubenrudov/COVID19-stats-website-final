import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import './infobox.css'

function InfoBox({ title, cases, total, color, active, type, ...props }) {
    console.log(title, active);
    return (
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected infoBox--"}${color}`}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
            <h2 className={`infoBox__cases--${color}`}>
            {cases} {type} today
            </h2>  
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
export default InfoBox;