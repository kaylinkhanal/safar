import { useState, useEffect, useRef } from "react";

import Map from "../components/Map";
import { getDistance } from "geolib";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const lists =["places"]
import RideAcceptedCard from "../components/RideAcceptedCard";
import VehicleIcons from "../components/VehicleIcons";
import PickUpSection from "../components/PickUpSection";
import DestinationSection from "../components/DestinationSection";
import StopSection from "../components/StopSection";
import PriceSection from "../components/PriceSection";
import BargainSection from "../components/BargainSection";
import SubmitCancelButton from "../components/SubmitCancelButton";
import EnterDetailsButton from "../components/EnterDetailsButton";

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
  const [rideAcceptDetails, setRideAcceptDetails] = useState({});
  const [riderPosition, setRiderPosition]= useState(null)
  const [rideId, setRideId] = useState('')
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  useEffect(() => {
    socket.on("acceptRide", (rideAcceptDetails) => {
      if (rideAcceptDetails.user == userDetails._id)
        setRideAcceptDetails(rideAcceptDetails);
    });

    socket.on("riderPosition", (riderPosition) => {
      setRideId(riderPosition.rideId)
      if(riderPosition.rideId){
        setRiderPosition(riderPosition.position)
      }
    });

    
  }, [socket]);
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
  const [submittedReq, setSubmittedReq] = useState(false);
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
    setSubmittedReq(!submittedReq);
    if (!submittedReq) {
      const rideDetails = {
        phoneNumber: phoneInput,
        currentInputPos,
        currentDestinationPos,
        priceChangeCount,
        pickUpForRider,
        destForRider,
        stopForRider,
        pickInputAddress,
        destinationInputAddress,
        stopInputAddress,
        stopPosition,
        selectedVehicle,
        estimatedPrice: calculateEstPrice(),
        finalPrice: finalPrice || calculateEstPrice(),
        user: userDetails._id,
      };

      socket.emit("rides", rideDetails);
    } else {
      alert("your ride has been cancelled");
    }
  };
  return (
    <main className="dark:bg-[#37304E] flex">
      <div className="w-2/5 p-5 bg-gray-200 dark:bg-gray-800">
        {/* Ride Accepted Card */}
{rideId}
        {/* Enter desitination and pickup  */}
         {JSON.stringify(rideAcceptDetails) !== '{}' ? (
        <RideAcceptedCard rideAcceptDetails={rideAcceptDetails} />
         ) : (
          <div className="flex flex-col justify-center mt-8 w-full h-22 relative">
          {/* Icons Section */}
          <VehicleIcons
            vehicleTypeList={vehicleTypeList}
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />

          {/* Pickup Section */}
          <PickUpSection
            pickInputRef={pickInputRef}
            pickInputAddress={pickInputAddress}
            pickUpOpen={pickUpOpen}
            setPickInputFocus={setPickInputFocus}
            generatePickUpPlaces={generatePickUpPlaces}
            searchedPlaceList={searchedPlaceList}
            setPickUpOpen={setPickUpOpen}
            isSelectionOngoing={isSelectionOngoing}
            setIsSelectionOngoing={setIsSelectionOngoing}
            setCurrentInputPos={setCurrentInputPos}
            setPickInputAddress={setPickInputAddress}
            setZoom={setZoom}
          />
          {/* Destination Section */}
          <DestinationSection
            destinationInputAddress={destinationInputAddress}
            isSelectionOngoing={isSelectionOngoing}
            setDestinationOpen={setDestinationOpen}
            generateDestinationPlaces={generateDestinationPlaces}
            destinationOpen={destinationOpen}
            setIsSelectionOngoing={setIsSelectionOngoing}
            searchedPlaceList={searchedPlaceList}
            setCurrentDestinationPos={setCurrentDestinationPos}
            setDestinationInputAddress={setDestinationInputAddress}
            setZoom={setZoom}
          />
          {/* Stop Section */}
          <StopSection
            setStopPosition={setStopPosition}
            stopPosition={stopPosition}
            currentDestinationPos={currentDestinationPos}
            setStopInputVisible={setStopInputVisible}
            stopInputVisible={stopInputVisible}
            stopInputAddress={stopInputAddress}
            isSelectionOngoing={isSelectionOngoing}
            setStopOpen={setStopOpen}
            generateStopPlaces={generateStopPlaces}
            stopOpen={stopOpen}
            setIsSelectionOngoing={setIsSelectionOngoing}
            searchedPlaceList={searchedPlaceList}
            setZoom={setZoom}
            setStopInputAddress={setStopInputAddress}
          />
          <div className="text-[#37304E]">
            {/* Estimated Section */}
            {Object.keys(selectedVehicle).length > 0 &&
              pickInputAddress &&
              destinationInputAddress && (
                <>
                  <PriceSection
                    calculateEstPrice={calculateEstPrice}
                    finalPrice={finalPrice}
                  />

                  <BargainSection
                    finalPrice={finalPrice}
                    priceChangeCount={priceChangeCount}
                    selectedVehicle={selectedVehicle}
                    setFinalPrice={setFinalPrice}
                    calculateEstPrice={calculateEstPrice}
                    setPriceChangeCount={setPriceChangeCount}
                  />


                </>
              )}
          </div>
        </div>
      
        )}
        {isLoggedIn || phoneInput ? (
                    <SubmitCancelButton
                      handleSubmitRequest={handleSubmitRequest}
                      submittedReq={submittedReq}
                    />
                  ) : (
                    <EnterDetailsButton
                      setPhoneValidationOpen={setPhoneValidationOpen}
                    />
                  )}
        <CustomModal
          isOpen={phoneValidationOpen}
          onClose={() => setPhoneValidationOpen(false)}
          setPhoneInput={setPhoneInput}
        />
      </div>

      <div className="w-3/5">
        {/* google map  */}
        <div className="">
       
            <Map
              currentInputPos={currentInputPos}
              stopPosition={stopPosition}
              riderPosition={riderPosition}
              changeStopAddress={changeStopAddress}
              changePickUpAddress={changePickUpAddress}
              changeDestinationAddress={changeDestinationAddress}
              zoom={zoom}
              rideId={rideId}
              currentDestinationPos={currentDestinationPos}
            />
      
        </div>
      </div>
    </main>
  );
}
