import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'

var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
  textAlign: 'center'
}


function Footer() {
    return (
        <div className="footer">
            <div style={phantom} />
            <div className="links" style={style}>
                <p className="credits">&copy; Ruben Rudov</p>
                <div className="link-item">
                    <a className="icon github" href="https://www.github.com/rubenrudov/">
                        <FontAwesomeIcon icon={faGithubAlt}/>
                    </a>
                    <br/>
                    <p className="github">Github</p>
                </div>
                <div className="link-item">
                    <a className="icon instagram" href="https://www.instagram.com/rudovruben/">
                        <FontAwesomeIcon icon={faInstagram}/>
                    </a>
                    <br/>
                    <p className="instagram">Instagram</p>
                </div>
                <div className="link-item">
                    <a className="icon facebook" href="https://www.instagram.com/rudovruben/">
                        <FontAwesomeIcon icon={faFacebook}/>
                    </a>
                    <br/>
                    <p className="facebook">Facebook</p>
                </div>
                <div className="link-item">
                    <a className="icon linkedin" href="https://www.instagram.com/rudovruben/">
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </a>
                    <br/>
                    <p className="linkedin">Linkedin</p>
                </div>
            </div>
        </div>
    )
}

export default Footer