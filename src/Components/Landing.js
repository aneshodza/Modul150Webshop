import Header from "./Header";
import ImageOne from "../images/landingpage-ski-driver.jpg"
import "../Styles/Landing.css"

export default function Landing() {

    return (
        <div>
            <Header active={0} />
            <div className="landing">
                <div className="landingpage-top-div">
                    <img src={ImageOne} className="landingpage-top-image" alt="man skiing"/>
                    <span className="landingpage-top-image-border" />
                    <div className="landingpage-top-text">
                        <h1 className="landingpage-top-title">Your Ski adventure in Switzerland, easy and quick</h1>
                        <p className="landingpage-top-text">
                        Welcome to YouSki!
                        This page is all about your own ski adventure in switzerland, easy and quick.
                        You are directly connected to home owners, which offer up their houses for rent.
                        You can rent a house for a certain price, which differs from house to house.
                        We have a big collection of home owners, that rent out their houses.
                        You can find out more about the home owners, their houses and the price they offer.
                        <br />
                        <br />
                        Primarily this site is focused on the rental of houses in switzerland.
                        You can start by creating an account under the "Account" tab or you can just check out the houses under the "Resorts" tab.
                        <br />
                        <br />
                        If you have any questions, feel free to contact us. 
                        The contact details are in the tab "Contact".
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}