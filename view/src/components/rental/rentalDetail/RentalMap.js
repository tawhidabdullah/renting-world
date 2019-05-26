import React, { Component } from 'react'; 
import {  MapWithGeoCode  } from "../../map/GoogleMap";

class RentalMap extends Component { 
    render() {
        const location  = this.props.location; 
        return (
            <MapWithGeoCode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBdfcdBVbsnMf8F-XOFosh-mr4-g-hiJUA&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `360px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}

export default RentalMap;