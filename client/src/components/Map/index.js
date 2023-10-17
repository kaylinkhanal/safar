import React from "react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const destinationIcon = {
  url: "https://cdn-icons-png.flaticon.com/512/10049/10049568.png",
  scaledSize: { width: 50, height: 50 },
};

const pickupIcon = {
  url: "https://cdn-icons-png.flaticon.com/512/76/76865.png",
  scaledSize: { width: 50, height: 50 },
};

const helicopterIcon = {
  url: "https://png.pngtree.com/png-clipart/20220216/ourmid/pngtree-realistic-3d-blue-helicopter-on-transparent-png-image_4388420.png",
  scaledSize: { width: 50, height: 50 },
};

const stopIcon = {
  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/1024px-Red_dot.svg.png",
  scaledSize: { width: 20, height: 20 },
};
const list =['places']
function index(props) {
const { isLoaded, loadError } = useJsApiLoader({
  googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
  libraries: list,
});
  const {
    currentInputPos,
    rideId,
    isRider,
    currentDestinationPos,
    stopPosition,
    riderPosition,
    changeStopAddress,
    changePickUpAddress,
    changeDestinationAddress,
    zoom,
  } = props;
  return (
    <>
    {isLoaded&& (
        <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "800px",
          width: "100%",
        }}
        zoom={zoom}
        center={
          currentInputPos?.lat
            ? currentInputPos
            : {
                lat: 27.700769,
                lng: 85.30014,
              }
        }
      >
        {stopPosition?.lat && (
          <MarkerF
            onDragEnd={changeStopAddress}
            draggable={isRider ? false : true}
            position={stopPosition}
            icon={stopIcon}
          />
        )}
        <MarkerF
          onDragEnd={changePickUpAddress}
          draggable={isRider ? false : true}
          position={currentInputPos}
          icon={pickupIcon}
        />
        
        {!isRider && riderPosition && (
            <MarkerF
            onDragEnd={changePickUpAddress}
            position={riderPosition}
            icon={helicopterIcon}
          />
        )}
      
        <MarkerF
          onDragEnd={changeDestinationAddress}
          draggable={isRider ? false : true}
          position={currentDestinationPos}
          icon={destinationIcon}
        />
      </GoogleMap>
    
    )}
    </>
  );
}

export default index;
