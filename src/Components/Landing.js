import Header from "./Header";
import ImageOne from "../images/landingpage-ski-driver.jpg"
import "../Styles/Landing.css"

export default function Landing() {

    return (
        <div>
            <Header active={0} />
            <div className="landing">
                <div className="landingpage-top-div">
                    <img src={ImageOne} className="landingpage-top-image"/>
                    <span className="landingpage-top-image-border" />
                    <div className="landingpage-top-text">
                        <h1 className="landingpage-top-title">Your Ski adventure in Switzerland, easy and quick</h1>
                        <p className="landingpage-top-text">
                        gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat in ante metus dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}