import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import styles from "../styles/map.module.css";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import styles1 from "../styles/register.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const [selectBike, setSelectBike] = useState(false);
  const [selectCar, setSelectCar] = useState(false);
  const [vehicleFare, setVehicleFare] = useState([
    { bikeFare: "" },
    { carFare: "" },
  ]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });
  useEffect(() => {
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
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data.results) {
      setSearchedPlaceList(data.results);
    }
  };

  const pickupIcon = {
    url: "https://cdn1.iconfinder.com/data/icons/real-estate-building-flat-vol-3/104/house__location__home__map__Pin-512.png",
    scaledSize: { width: 50, height: 50 },
  };

  const destinationIcon = {
    url: "https://cdn-icons-png.flaticon.com/512/76/76865.png",
    scaledSize: { width: 50, height: 50 },
  };
  const theme = createTheme({
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      fontSize: 22,
    },
  });
  function handleBikeFare() {
    setSelectBike(true);
    setSelectCar(false);
  }
  function handleCarFare() {
    setSelectBike(false);
    setSelectCar(true);
  }
  const VehicleType = async (values) => {
    // if (values === "Bike") {
    const res = await fetch("http://localhost:3005/vehicleType/", {
      method: "GET",
    });
    const data = await res.json();
    if (data) {
      console.log(data.data[0].vehicleFare);
      console.log(data.data[1].vehicleFare);
      setVehicleFare([
        { bikeFare: data.data[0].vehicleFare },
        { carFare: data.data[1].vehicleFare },
      ]);
    }
  };

  return (
    <main className={"min-h-screen dark:bg-[#37304E] flex"}>
      <div className="w-2/5 p-4 bg-gray-200 dark:bg-gray-800">
        {/* Enter desitination and pickup  */}
        <div className="flex flex-col justify-center mt-8 w-full h-22 relative">
          <div className="flex justify-center text-white m-3 p-3">
            {selectBike ? (
              <div
                className={`p-4   ${styles1.vehicleSelected}`}
                onClick={() => {
                  handleBikeFare(), VehicleType();
                }}
              >
                <TwoWheelerIcon theme={theme} />
              </div>
            ) : (
              <div
                className={`p-4   ${styles1.vehicleIcon}`}
                onClick={() => {
                  handleBikeFare();
                  if (!vehicleFare) {
                    VehicleType();
                  }
                }}
              >
                <TwoWheelerIcon theme={theme} />
              </div>
            )}
            {selectCar ? (
              <div
                className={`p-4   ${styles1.vehicleSelected}`}
                onClick={() => {
                  handleCarFare();
                  if (!vehicleFare) {
                    VehicleType();
                  }
                }}
              >
                <LocalTaxiIcon theme={theme} />
              </div>
            ) : (
              <div
                className={`p-4   ${styles1.vehicleIcon}`}
                onClick={() => {
                  handleCarFare();
                  if (!vehicleFare) {
                    VehicleType();
                  }
                }}
              >
                <LocalTaxiIcon theme={theme} />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="font-mono pb-5 text-gray-500 antialiased font-semibold line-clamp-1">
              Share the ride
            </h1>
          </div>
          {/* Pickup Section */}
          <div className="mb-6 flex justify-center flex-col relative">
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
            <input
              value={destinationInputAddress}
              onBlur={() => !isSelectionOngoing && setDestinationOpen(false)}
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
          </div>
        </div>
        {selectBike && currentDestinationPos?.lat && (
          <div className="text-white center text-xl flex justify-evenly mt-20 text-center p-5 content-center">
            <div className="bg-gray-400 p-10 text-black">
              <h1>Your Total Fare:</h1>
              Rs. {vehicleFare[0].bikeFare}
            </div>
            <div>
              <h1>Your Total Distance:</h1>
              10000 m
            </div>
          </div>
        )}
        {selectCar && currentDestinationPos?.lat && (
          <div className="text-white center text-xl flex justify-evenly mt-20 text-center p-5 content-center">
            <div className="bg-gray-400 p-10 text-black">
              <h1>Your Total Fare:</h1>
              Rs. {vehicleFare[1].carFare}
            </div>
            <div>
              <h1>Your Total Distance:</h1>
              1000 m
            </div>
          </div>
        )}
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
