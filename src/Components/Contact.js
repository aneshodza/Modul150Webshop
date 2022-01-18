import Header from "./Header"
import ImageOne from "../images/contactpage-ski-driver.jpg"
import "../Styles/Landing.css"


export default function Contact() {
    return (
        <div>
            <Header active={2} />
            <div className="landing">
                <div className="landingpage-top-div">
                    <img src={ImageOne} className="landingpage-top-image" alt="man skiing"/>
                    <span className="landingpage-top-image-border" />
                    <div className="landingpage-top-text">
                        <h1 className="landingpage-top-title">How to contact me</h1>
                        <p className="landingpage-top-text">
                            If you need any support or have any questions, feel free to contact me.
                            You can do that on the following email address: <a href="mailto:anes.hodza04@gmail.com">anes.hodza04@gmail.com</a>. 
                            Or alternatively you can contact me by phone: <a href="tel:+41789034412">+41 78 903 44 12</a>. 
                            <br/>
                            <br/>
                            I hope you enjoy your stay and have a nice ski trip!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}