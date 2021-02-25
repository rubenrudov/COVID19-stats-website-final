import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import './infobox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function InfoBox({ title, cases, total, color, active, type, ...props }) {
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
            <p>{total} Total</p>
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
export default InfoBox;