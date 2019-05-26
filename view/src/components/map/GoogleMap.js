import React from 'react'; 
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";


   

const MapComponent = ({coordinates}) => {

  return(
    <GoogleMap
    defaultZoom={8}
    defaultCenter={coordinates}
    center={coordinates}
  >
    <Marker
      position={coordinates}
    />
  </GoogleMap>
)
}; 

const withGeoCode = (WrapperComponent) => {

  return class extends React.Component {
    state = {
      coordinates: {
        lat: 0,
        lng: 0
      }
    }; 

    componentWillMount(){
      this.geoCodeLocation(); 
    }; 

    geoCodeLocation(){
      //     GETTING THE LAT AND LNG PROCESSS START
      const location = this.props.location; 
      const geocoder = new window.google.maps.Geocoder(); 
      geocoder.geocode({address: location},(result, status) => {
        if(status === 'OK'){
          const geometry = result[0].geometry.location; 
          const coordinates = {
            lat: geometry.lat(),
            lng: geometry.lng()
          }; 
   //     GETTING THE LAT AND LNG PROCESSS START


          // UPDATE THE COORDINATES 
          this.setState({
            coordinates : coordinates
          })
        }
      }); 
    }; 
    render(){
      return(
        <WrapperComponent {...this.state} />
      ); 
    }
  }
}; 


  
export const MapWithGeoCode = withScriptjs(withGoogleMap(withGeoCode(MapComponent)));
  
