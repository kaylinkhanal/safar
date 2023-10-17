import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MinusIcon } from "@chakra-ui/icons";

import {
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import axios from 'axios'
import { useSelector } from "react-redux";
import Map from "../../components/Map";
const socket = io("http://localhost:3005");

function Rider() {
  const [availableRides, setAvailableRides] = useState([]);
  const [selectedRideCard, setSelectedRideCard] = useState({});

  const { userDetails } = useSelector((state) => state.user);
  const [activeJob, setActiveJob] = useState(null);

  const fetchExistingRides= async()=> {
    const {data} = await axios.get('http://localhost:3005/rides?status=pending');
    if (data) setAvailableRides(data.rideList)
  }
  useEffect(() => {
    fetchExistingRides()
  
    socket.on("rides", (rides) => {
      setAvailableRides(rides);
    });

 
  }, []);

  const acceptRide = (rideId) => {
    socket.emit("acceptRide", { rideId, riderId: userDetails._id });
    setInterval(()=>{
      navigator.geolocation.getCurrentPosition((latlan) => {
        const { latitude, longitude } = latlan.coords;
        socket.emit('riderPosition' ,{
          position: { lat: latitude, lng: longitude }, 
          rideId: rideId
        }
        )
      });
    
    },3000)
  
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
                      onClick={() => {
                        setActiveJob(index);
                        setSelectedRideCard(item);
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
                              {item?.pickUpForRider?.county}
                            </p>
                          </div>

                          {!item.stopForRider && (
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src={item?.selectedVehicle?.iconUrl}
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
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src={item?.selectedVehicle?.iconUrl}
                                  width={25}
                                  height={25}
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <MinusIcon width={2} />
                              </div>
                            </div>
                          )}

                          {item.stopForRider && (
                            <div className="flex flex-col">
                              <h1 className="text-xs font-bold">
                                {item?.stopForRider?.suburb ??
                                  item?.stopForRider?.address_line1}
                              </h1>
                              <p className="text-xs text-left ">
                                {item?.stopForRider?.county}
                              </p>
                            </div>
                          )}

                          {item.stopForRider && (
                            <div className="flex items-center">
                              <div>
                                <MinusIcon width={2} />
                              </div>
                              <div className="p-2">
                                <img
                                  src={item?.selectedVehicle?.iconUrl}
                                  width={25}
                                  height={25}
                                  alt="icon"
                                />
                              </div>
                              <div>
                                <MinusIcon width={2} />
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col">
                            <h1 className="text-xs font-bold ">
                              {item?.destForRider?.suburb ??
                                item?.destForRider?.address_line1}
                            </h1>
                            <p className="text-xs text-left ">
                              {item?.destForRider?.county}
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
                      <div className="flex flex-col ">
                        <div className="flex flex-col items-start bg-white p-2 rounded-lg mb-1">
                          <p className="text-sm font-semibold leading-8">
                            PickUp :
                          </p>
                          <p className="text-sm text-left">
                            {item.pickInputAddress}
                          </p>
                        </div>
                        {item.stopForRider && (
                          <div className="flex flex-col items-start bg-white p-2 rounded-lg mb-1">
                            <p className="text-sm font-semibold leading-8">
                              Stop :
                            </p>
                            <p className="text-sm text-left">
                              {item.stopInputAddress}
                            </p>
                          </div>
                        )}
                        <div className="flex flex-col items-start bg-white p-2 rounded-lg">
                          <p className="text-sm font-semibold leading-8">
                            Destination :
                          </p>
                          <p className="text-sm text-left">
                            {item.destinationInputAddress}
                          </p>
                        </div>
                      </div>
                      <div className="flex leading-8">
                        <h1>Customer Number :</h1>
                        <p className="font-bold">
                          {item.phoneNumber || item.user?.phoneNumber}
                        </p>
                      </div>
                      <button
                        onClick={() => acceptRide(item._id)}
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
      <div className="w-3/5">

          <Map
            isRider={true}
            currentInputPos={selectedRideCard.currentInputPos}
            stopPosition={selectedRideCard.stopPosition}
            zoom={13}
            currentDestinationPos={selectedRideCard.currentDestinationPos}
          />
 
      </div>
    </div>
  );
}

export default Rider;
