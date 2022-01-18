import Header from './Header.js';
import ImageOne from "../images/aboutpage-ski-driver.jpg"
import "../Styles/Landing.css"


export default function AboutUs() {
    return (
        <div>
            <Header active={1} />
            <div className="landing">
                <div className="landingpage-top-div">
                    <img src={ImageOne} className="landingpage-top-image" alt="man skiing"/>
                    <span className="landingpage-top-image-border" />
                    <div className="landingpage-top-text">
                        <h1 className="landingpage-top-title">About me</h1>
                        <p className="landingpage-top-text">
                            I am a IMS student in Zürich. I am currently studying at the Kantonsschule Büelrain, or for short; KBW. 
                            Right now I'm in my 3rd year and will be graduating in the next year.
                            If I pass my exams, I will be left with an Informatiker EFZ and a matur in economics.
                            <br />
                            <br />
                            I made this page for a school project, which is about making your own E-Business application.
                            The goal was to make a nice and easy to use website, on which you can rent something.
                            I picked ski houses, because I like skiing and always look forward to finally go skiing with my family.
                            <br />
                            <br />
                            Keep in mind, that none of these houses will really be rented out to you.
                            Nothing on this site is real.
                            <br />
                            <br />
                            I hope you enjoy your stay. Have fun!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}