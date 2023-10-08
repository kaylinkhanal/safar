import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import Map from "../components/Map";
import styles from "../styles/map.module.css";
import { getDistance } from "geolib";
import { useSelector } from "react-redux";
import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Button,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { io } from "socket.io-client";
const socket = io("http://localhost:3005");
const CustomModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
        props.setPhoneInput("");
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="flex text-center justify-center">
          Enter Your Phone Number
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <input
            onChange={(e) => props.setPhoneInput(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full h-12"
          />
        </ModalBody>
        <button
          onClick={() => props.onClose()}
          className="p-2 m-6
        text-white bg-[#37304E] rounded-lg hover:bg-red-800"
        >
          Save
        </button>
      </ModalContent>
    </Modal>
  );
};
export default function Home() {
  useEffect(() => {
    socket.on("connection");
  }, []);
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const [phoneInput, setPhoneInput] = useState("");
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
  const [priceChangeCount, setPriceChangeCount] = useState(10);
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [destinationInputAddress, setDestinationInputAddress] = useState("");
  const [stopInputAddress, setStopInputAddress] = useState("");
  const [pickUpForRider, setPickUpForRider] = useState({});
  const [destForRider, setDestForRider] = useState({});
  const [stopForRider, setStopForRider] = useState({});
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);
  const [stopInputVisible, setStopInputVisible] = useState(false);
  const [pickInputFocus, setPickInputFocus] = useState(false);
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  const [stopPosition, setStopPosition] = useState({});
  const [vehicleTypeList, setVehiclesTypeList] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState({});
  const [finalPrice, setFinalPrice] = useState("");
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });
  const [phoneValidationOpen, setPhoneValidationOpen] = useState(false);
  const getVehicleType = async (values) => {
    const res = await fetch("http://localhost:3005/vehicles/", {
      method: "GET",
    });
    const data = await res.json();
    if (data) {
      setVehiclesTypeList(data);
    }
  };
  useEffect(() => {
    getVehicleType();
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
      setPickUpForRider(data.features[0].properties);
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
      setDestForRider(data.features[0].properties);
    }
  };

  const changeStopAddress = async (e) => {
    setStopPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();

    if (data) {
      setStopInputAddress(data.features[0].properties.formatted);
      setStopForRider(data.features[0].properties);
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

  const generateStopPlaces = async (text) => {
    setStopOpen(true);
    setStopInputAddress(text);
    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
    );
    const data = await res.json();
    if (data.results) {
      setSearchedPlaceList(data.results);
    }
  };

  const calculateEstPrice = () => {
    const distanceToDestination =
      getDistance(currentInputPos, currentDestinationPos) / 1000;

    let estPriceCalculated;

    if (stopPosition.lat) {
      const distanceToStop = getDistance(currentInputPos, stopPosition) / 1000;

      const distanceFromStopToDestination =
        getDistance(stopPosition, currentDestinationPos) / 1000;

      const totalDistance = distanceToStop + distanceFromStopToDestination;

      estPriceCalculated = Math.ceil(
        totalDistance * selectedVehicle.pricePerKm
      );
    } else {
      estPriceCalculated = Math.ceil(
        distanceToDestination * selectedVehicle.pricePerKm
      );
    }

    const basePrice = selectedVehicle.basePrice;

    const estPriceFinal = Math.max(basePrice, estPriceCalculated);

    return estPriceFinal;
  };

  const handleSubmitRequest = () => {
    const rideDetails = {
      phoneNumber: phoneInput,
      currentInputPos,
      currentDestinationPos,
      priceChangeCount,
      pickInputAddress,
      pickUpForRider,
      destForRider,
      stopForRider,
      destinationInputAddress,
      stopInputAddress,
      stopPosition,
      selectedVehicle,
      estimatedPrice: calculateEstPrice(),
      finalPrice: finalPrice || calculateEstPrice(),
      user: userDetails._id,
    };
    socket.emit("rides", rideDetails);
  };
  return (
    <main className="dark:bg-[#37304E] flex">
      <div className="w-2/5 p-4 bg-gray-200 dark:bg-gray-800">
        {/* Enter desitination and pickup  */}
        <div className="flex flex-col justify-center mt-8 w-full h-22 relative">
          {/* Icons Section */}
          <div className="flex mb-2 items-center justify-center">
            {vehicleTypeList.length > 0 &&
              vehicleTypeList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedVehicle(item)}
                  className={`
                     bg-white p-3 rounded-lg shadow-xs mr-2
                      ${
                        item === selectedVehicle
                          ? " border-2 border-slate-600 text-white"
                          : ""
                      }
                  `}
                >
                  <img src={item.iconUrl} width={40} height={40} alt="icon" />
                </div>
              ))}
          </div>

          {/* Pickup Section */}
          <div className="mb-6 flex justify-center flex-col relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="pickup"
                className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
              >
                Pickup Address
              </label>
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
          <div className="flex justify-center flex-col relative">
            <div className="flex justify-between items-center">
              <label
                htmlFor="pickup"
                className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
              >
                Destination Address
              </label>
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
          </div>
          {/* Stop Section */}
          <div className="mb-5">
            <button
              type="button"
              className="px-3 mt-4 mb-4 py-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={() => {
                setStopPosition(stopPosition.lat ? {} : currentDestinationPos);

                setStopInputVisible(!stopPosition.lat);
              }}
            >
              {stopPosition.lat ? "Remove Stop" : "Add Stop"}
            </button>
            {stopInputVisible && (
              <>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="pickup"
                    className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
                  >
                    Stop Address
                  </label>
                </div>
                <input
                  value={stopInputAddress}
                  onBlur={() => {
                    !isSelectionOngoing && setStopOpen(false);
                  }}
                  onChange={(e) => generateStopPlaces(e.target.value)}
                  type="text"
                  id="default-input"
                  placeholder="Enter your Stop point or Locate on Map"
                  className="h-12 w-full bg-red px-4 text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"
                />
              </>
            )}
            {stopOpen && (
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
                          setStopPosition({
                            lat: item.lat,
                            lng: item.lon,
                          });
                          setZoom(14);
                          setStopInputAddress(item.formatted);
                          setStopOpen(false);
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
          <div className="text-[#37304E]">
            {/* Estimated Section */}
            {Object.keys(selectedVehicle).length > 0 &&
              pickInputAddress &&
              destinationInputAddress && (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <h1>Estimated price :</h1>
                      <p className="font-bold"> Rs{calculateEstPrice()}</p>
                    </div>
                    <div className="flex">
                      <h1>Final price :</h1>
                      <p className="font-bold">
                        {" "}
                        Rs{finalPrice || calculateEstPrice()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h1>Change your Offer Price</h1>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          if (
                            finalPrice &&
                            finalPrice - priceChangeCount >=
                              selectedVehicle.basePrice
                          ) {
                            return setFinalPrice(finalPrice - priceChangeCount);
                          } else if (
                            !finalPrice &&
                            calculateEstPrice() - priceChangeCount >=
                              selectedVehicle.basePrice
                          ) {
                            return setFinalPrice(
                              calculateEstPrice() - priceChangeCount
                            );
                          } else if (
                            finalPrice - priceChangeCount <=
                            selectedVehicle.basePrice
                          ) {
                            return setFinalPrice(selectedVehicle.basePrice);
                          }
                        }}
                        className="p-3 m-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        -
                      </button>
                      <input
                        value={priceChangeCount}
                        onChange={(e) =>
                          setPriceChangeCount(Number(e.target.value))
                        }
                        className="w-10 h-10 bg-gray-200 dark:bg-gray-800"
                      />
                      <button
                        onClick={() =>
                          setFinalPrice(
                            finalPrice
                              ? finalPrice + priceChangeCount
                              : calculateEstPrice() + priceChangeCount
                          )
                        }
                        className="p-3 m-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {isLoggedIn || phoneInput ? (
                    <button
                      onClick={() => handleSubmitRequest()}
                      type="button"
                      className="p-3 w-full my-4 text-center text-white bg-[#37304E] rounded-lg hover:bg-red-800"
                    >
                      Submit Request
                    </button>
                  ) : (
                    <button
                      onClick={() => setPhoneValidationOpen(true)}
                      type="button"
                      className="p-3 w-full my-4 text-center text-white bg-[#37304E] rounded-lg hover:bg-red-800"
                    >
                      Enter Your Details
                    </button>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="w-3/5 p-4">
        <CustomModal
          isOpen={phoneValidationOpen}
          onClose={() => setPhoneValidationOpen(false)}
          setPhoneInput={setPhoneInput}
        />

        {/* google map  */}
        <div className="flex justify-center p-2 mt-2">
          {isLoaded && (
            <Map
              currentInputPos={currentInputPos}
              stopPosition={stopPosition}
              changeStopAddress={changeStopAddress}
              changePickUpAddress={changePickUpAddress}
              changeDestinationAddress={changeDestinationAddress}
              zoom={zoom}
              currentDestinationPos={currentDestinationPos}
            />
          )}
        </div>
      </div>
    </main>
  );
}
