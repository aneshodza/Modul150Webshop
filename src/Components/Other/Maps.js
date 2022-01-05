import { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
    render() {
        console.log(this.props.pos)
        return (
            <Map
                google = {this.props.google}
                style={{width: "400px", height: "400px"}}
                zoom={this.props.zoom}
                initialCenter={{lat: this.props.pos.latitude, lng: this.props.pos.longitude}}
            />
        )
    }
}
 
export default GoogleApiWrapper({
    apiKey: ("AIzaSyBON_5U9-_WjFHcGO4TKhk8x3M7FW2N2Ik"),
})(MapContainer)


//"AIzaSyBON_5U9-_WjFHcGO4TKhk8x3M7FW2N2Ik"