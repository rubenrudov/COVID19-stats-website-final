import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import './infobox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function InfoBox({ title, cases, total, color, active, type, pop, ...props }) {
    return (
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected infoBox--"}${color}`}
      >
        <div className={color}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
            <h2 className={`infoBox__cases--${color}`}>
            +{cases}
            </h2>  
          <Typography className="infoBox__total" color="textSecondary">
            <p>{total} Total</p>
          </Typography>
        </CardContent>
        </div>
      </Card>
    );
  }
  
export default InfoBox;