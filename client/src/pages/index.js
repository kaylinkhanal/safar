import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import styles from "../styles/map.module.css";
import { getDistance } from 'geolib';

export default function Home() {
  const [currentInputPos, setCurrentInputPos] = useState({
    lat: 27.700769,
    lng: 85.30014,
  });
  const [currentDestinationPos, setCurrentDestinationPos] = useState({
    lat: 27.700769,
    lng: 85.30014,
  });
  const pickInputRef = useRef(null);
  const [zoom, setZoom] = useState(13);
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [destinationInputAddress, setDestinationInputAddress] = useState("");
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [pickInputFocus, setPickInputFocus] = useState(false);
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const [stopPosition, setStopPosition] = useState({});
  const [vehicleTypeList, setVehiclesTypeList] = useState([])
  const [selectedVehicle,setSelectedVehicle ]= useState({})
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });
  const getVehicleType = async (values) => {
    const res = await fetch("http://localhost:3005/vehicles/", {
      method: "GET",
    });
    const data = await res.json();
    if (data) {
      setVehiclesTypeList(data)
    }
  };
  useEffect(() => {
    getVehicleType()
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setCurrentInputPos({ lat: latitude, lng: longitude });
    });
    pickInputRef?.current?.focus();
  }, []);


  const generatePickUpPlaces = async (text) => {
    setPickUpOpen(true);
    setPickInputAddress(text);
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data.results) {
      setSearchedPlaceList(data.results);
    }
  };

  const changePickUpAddress = async (e) => {
    setCurrentInputPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data) {
      setPickInputAddress(data.features[0].properties.formatted);
      setZoom(14);
    }
  };

  const changeDestinationAddress = async (e) => {
    setCurrentDestinationPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data) {
      setDestinationInputAddress(data.features[0].properties.formatted);
    }
  };

  const generateDestinationPlaces = async (text) => {
    setDestinationOpen(true);
    setDestinationInputAddress(text);
    const res = await fetch(
      `https://api.priceMap.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data.results) {
      setSearchedPlaceList(data.results);
    }
  };

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

  return (
    <main className={"min-h-screen dark:bg-[#37304E] flex"}>
      <div className="w-2/5 p-4 bg-gray-200 dark:bg-gray-800">
        {/* Enter desitination and pickup  */}
        <div className="flex flex-col justify-center mt-8 w-full h-22 relative">
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-mono pb-5 text-gray-500 antialiased font-semibold line-clamp-1">
              Share the ride
            </h1>
          </div>
          {/* Pickup Section */}
          {vehicleTypeList.length > 0 && vehicleTypeList.map(item=>{
            return (
              <button onClick={()=> setSelectedVehicle(item)}>{item.vehicleType}</button>
            )
          })}
          <div className="mb-6 flex justify-center flex-col relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="pickup"
                className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
              >
                Pickup Address
              </label>
              <img
                src={pickupIcon.url}
                alt="Pickup Icon"
                width={25}
                height={25}
              />
            </div>
            <input
              ref={pickInputRef}
              value={pickInputAddress}
              onFocus={() => setPickInputFocus(true)}
              onBlur={() => {
                !isSelectionOngoing && setPickUpOpen(false);
                setPickInputFocus(false);
              }}
              onChange={(e) => generatePickUpPlaces(e.target.value)}
              type="text"
              id="default-input"
              placeholder="Enter your pickup point or Locate on Map"
              className="h-12 bg-red px-4 text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"
            />
            {pickUpOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md z-10"
                onMouseLeave={() => setIsSelectionOngoing(false)}
                onMouseOver={() => setIsSelectionOngoing(true)}
              >
                {searchedPlaceList.length > 0 &&
                  searchedPlaceList.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentInputPos({
                            lat: item.lat,
                            lng: item.lon,
                          });
                          setZoom(14);
                          setPickInputAddress(item.formatted);
                          setPickUpOpen(false);
                        }}
                        className={styles.autocompleteList}
                      >
                        {item.formatted.length > 15
                          ? item.formatted.substring(0, 50) + "..."
                          : item.formatted}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          {/* Destination Section */}
          <div className="mb-6 flex justify-center flex-col relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="pickup"
                className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
              >
                Destination Address
              </label>
              <img
                src={destinationIcon.url}
                alt="Pickup Icon"
                width={25}
                height={25}
              />
            </div>
            <input
              value={destinationInputAddress}
              onBlur={() => {
                !isSelectionOngoing && setDestinationOpen(false);
              }}
              onChange={(e) => generateDestinationPlaces(e.target.value)}
              type="text"
              id="default-input"
              placeholder="Enter your destination point or Locate on Map"
              className="h-12 bg-red px-4 text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"
            />
            {destinationOpen && (
              <div
                className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md"
                onMouseLeave={() => setIsSelectionOngoing(false)}
                onMouseOver={() => setIsSelectionOngoing(true)}
              >
                {searchedPlaceList.length > 0 &&
                  searchedPlaceList.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentDestinationPos({
                            lat: item.lat,
                            lng: item.lon,
                          });
                          setZoom(14);
                          setDestinationInputAddress(item.formatted);
                          setDestinationOpen(false);
                        }}
                        className={styles.autocompleteList}
                      >
                        {item.formatted.length > 15
                          ? item.formatted.substring(0, 50) + "..."
                          : item.formatted}
                      </div>
                    );
                  })}
              </div>
            )}
           <button onClick={()=>setStopPosition(stopPosition.lat  ? {} : currentDestinationPos)}>{stopPosition.lat ? 'Remove Stop' : 'Add Stop'}</button> 
          </div>

          {(getDistance(currentInputPos, currentDestinationPos)/1000 )*selectedVehicle.pricePerKm}
        </div>
        <button
          type="button"
          class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={() =>
            setStopPosition(stopPosition.lat ? {} : currentDestinationPos)
          }
        >
          {stopPosition.lat ? "Remove Stop" : "Add Stop"}
        </button>
      </div>
      <div className="w-3/5 p-4">
        <p className="text-1xl text-center text-gray-500 antialiased font-semibold">
          Safar is a safe and reliable ride sharing application based in Nepal.
        </p>
        {/* google map  */}
        <div className="flex justify-center p-2 mt-2">
          {isLoaded && (
            <GoogleMap
              id="circle-example"
              mapContainerStyle={{
                height: "400px",
                width: "800px",
              }}
              zoom={zoom}
              center={
                currentInputPos.lat
                  ? currentInputPos
                  : {
                      lat: 27.700769,
                      lng: 85.30014,
                    }
              }
            >
              {stopPosition.lat && (
                <MarkerF
                  draggable={true}
                  position={stopPosition}
                  icon={stopIcon}
                />
              )}
              <MarkerF
                onDragEnd={changePickUpAddress}
                draggable={true}
                position={currentInputPos}
                icon={pickupIcon}
              />

              <MarkerF
                onDragEnd={changeDestinationAddress}
                draggable={true}
                position={currentDestinationPos}
                icon={destinationIcon}
              />
            </GoogleMap>
          )}
        </div>
      </div>
    </main>
  );
}
