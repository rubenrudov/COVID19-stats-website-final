import React from 'react'
import { Card, CardContent } from '@material-ui/core'
// TODO: Create styles js file and transport the styles from here to this file and import it
// import './articlebox.css'

var card_style = {
    border: "solid 10px #CC88D8",
    borderRadius: "30px",
    textAlign: "center",
    padding: "20px",
}

var text_style = {
    fontSize: "20px",
    color: "#666"
}

function ArticleBox({ text, imgPath }) {
    return(
        <div>
            <Card style={card_style}>
                <CardContent>
                    <center>
                        <p style={text_style}>{text}</p>
                        <img className="image-vector" src={imgPath}/>
                    </center>
                </CardContent>
            </Card>
        </div>
    );
}

export default ArticleBox;