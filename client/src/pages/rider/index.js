import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MinusIcon } from "@chakra-ui/icons";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import Map from '../../components/Map'
const socket = io("http://localhost:3005");

function Rider() {
  const [availableRides, setAvailableRides] = useState([]);
  const [selectedRideCard, setSelectedRideCard]= useState({})
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });
  const [zoom, setZoom] = useState(13);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    socket.on("rides", (rides) => {
      console.log(rides)
      setAvailableRides(rides);
    });
  }, []);

  const handleAccordionItemClick = (index) => {
    setActiveJob(activeJob === index ? null : index);
  };

  return (
    <div className="flex">
      <div className="w-2/5 p-4 bg-gray-200">
        <Accordion allowToggle>
 
          {availableRides.length > 0 &&
            availableRides.map((item, index) => {

              return (
                <div
                  key={index}
                  className={`w-full p-3 mb-2 text-center text-[#37304E] bg-white rounded-lg shadow-lg ${
                    activeJob === index ? "bg-slate-200" : ""
                  }`}
                >
                  
                  <AccordionItem>
                    <AccordionButton
                      onClick={() =>{ setActiveJob(index)
                        setSelectedRideCard(item)
                      }}
                    >
                      <Box as="span" flex="1">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <h1 className="text-xs font-bold">
                              {item?.pickUpForRider?.suburb ??
                                item?.pickUpForRider?.address_line1}
                            </h1>
                            <p className="text-xs text-left ">
                              {item.pickUpForRider?.county}
                            </p>
                          </div>

                          {!item.stopForRider && (
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/27/27176.png"
                                  width={25}
                                  height={25}
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                            </div>
                          )}

                          {item.stopForRider && (
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/27/27176.png"
                                  width={25}
                                  height={25}
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                            </div>
                          )}

                          {item.stopForRider && (
                            <div className="flex flex-col">
                              <h1 className="text-xs font-bold">
                                {item.stopForRider.suburb ??
                                  item.stopForRider.address_line1}
                              </h1>
                              <p className="text-xs text-left ">
                                {item.stopForRider.county}
                              </p>
                            </div>
                          )}

                          {item.stopForRider && (
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/27/27176.png"
                                  width={25}
                                  height={25}
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col">
                            <h1 className="text-xs font-bold ">
                              {item.destForRider?.suburb ??
                                item.destForRider?.address_line1}
                            </h1>
                            <p className="text-xs text-left ">
                              {item.destForRider?.county}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center border-t-2 border-gray-500 p-1 justify-between w-full text-xs">
                          <div className="flex">
                            <h1>Estimated Price :</h1>
                            <p className="font-bold">
                              Rs {item.estimatedPrice}
                            </p>
                          </div>
                          <div className="flex">
                            <h1>Final Price :</h1>
                            <p className="font-bold">Rs {item.finalPrice}</p>
                          </div>
                        </div>
                      </Box>
                    </AccordionButton>

                    <AccordionPanel className=" bg-slate-200" pb={4}>
                      <div className="flex text-center justify-center">
                        <h1>Customer Number :</h1>
                        <p className="font-bold">{item.phoneNumber || item.user?.phoneNumber}</p>
                      </div>
                      <button
                        type="button"
                        className="px-3 mt-4 mb-4 py-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        Accept Ride
                      </button>
                    </AccordionPanel>
                  </AccordionItem>
                </div>
              );
            })}
        </Accordion>
      </div>

      {/* Map Section */}
      <div className="w-3/5 p-4">
        {isLoaded && (
         <Map
         isRider = {true}
         currentInputPos={selectedRideCard.currentInputPos}
          stopPosition = {selectedRideCard.stopPosition}
         changeStopAddress = {selectedRideCard.changeStopAddress}
         changePickUpAddress ={selectedRideCard.changePickUpAddress}
         changeDestinationAddress = {selectedRideCard.changeDestinationAddress}
         zoom = {13}
         currentDestinationPos={selectedRideCard.currentDestinationPos}
         />
       )}
      </div>
    </div>
  );
}

export default Rider;
