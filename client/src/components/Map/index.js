import React from 'react'
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

  const stopIcon = {
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Red_dot.svg/1024px-Red_dot.svg.png",
    scaledSize: { width: 20, height: 20 },
  };
function index(props) {
    const {currentInputPos,isRider, currentDestinationPos, stopPosition ,changeStopAddress, changePickUpAddress , changeDestinationAddress,zoom} = props
    return (

                 <GoogleMap
              id="circle-example"
              mapContainerStyle={{
                height: "400px",
                width: "800px",
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

              <MarkerF
                onDragEnd={changeDestinationAddress}
                draggable={isRider ? false : true}
                position={currentDestinationPos}
                icon={destinationIcon}
              />
            </GoogleMap>
          
    )
}

export default index
