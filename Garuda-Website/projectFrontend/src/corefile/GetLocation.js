import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import logo from "../images/drone.png";

export default function GetLocation({ setCoordinates }) {
  const [currentPosition, setCurrentPosition] = useState({});
  const [show, setShow] = useState(false);

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setCurrentPosition({ lat, lng });
    setCoordinates({ lat, lng });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const currentPosition = {
        lat: latitude,
        lng: longitude,
      };
      setShow(true);
      setCurrentPosition(currentPosition);
      setCoordinates(currentPosition);
    });
  }, []);

  const mapStyles = () => {
    return {
      marginTop: "5vh",
      marginBottom: "5vh",
      height: "70vh",
      width: "100%",
    };
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Get Location
      </Typography>
      <Grid container spacing={3}>
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyCoxQ_iHl99X8phgb14kxZ_P0lUu6jCBhk"
        >
          <GoogleMap
            id="example-map"
            mapContainerStyle={mapStyles()}
            zoom={15}
            center={currentPosition}
            // onClick={(e) => addMarker(e)}
          >
            <Marker
              position={currentPosition}
              draggable={true}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              icon={logo}
              onClick={(e) => setShow(true)}
            >
              {show && (
                <InfoWindow onCloseClick={() => setShow(false)}>
                  <h6 className="text-dark">
                    Coordinates: <br />
                    {currentPosition.lat} <br />
                    {currentPosition.lng}
                  </h6>
                </InfoWindow>
              )}
            </Marker>
          </GoogleMap>
        </LoadScript>
      </Grid>
    </React.Fragment>
  );
}
