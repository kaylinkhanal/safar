import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect } from "react";
import SportsMotorsportsIcon from "@mui/icons-material/SportsMotorsports";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3005");
const Rider = () => {
  useEffect(() => {
    socket.on("rides", (rides) => {
      console.log(rides);
    });
  }, []);
  const [riderPos, setRiderPos] = useState({ lat: "", lng: "" });
  const [selectedRequest, setSelectedRequest] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setRiderPos({ lat: latitude, lng: longitude });
    });
  }, []);
  console.log(selectedRequest);
  const riderIcon = {
    url: "https://static.thenounproject.com/png/4779060-200.png",
    scaledSize: { width: 50, height: 50 },
  };

  return (
    <div className="flex justify-between overscroll-y-none">
      <div className="bg-gray-300 w-3/6 mr-5 ">
        <form className="max-w-sm px-4 mb-10 mx-4 my-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
        <div className="overflow-y-auto max-h-screen">
          <Stack spacing="4" className="mr-5 antialiased  gap-8 px-10 py-2 ">
            <Card
              variant="filled"
              className={`  border-2 hover:bg-red-400 cursor-pointer ${
                selectedRequest ? "bg-red-800" : ""
              } max-h-60 py-3`}
              onClick={() => setSelectedRequest(!selectedRequest)}
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md" className="">
                  <img
                    src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-three-dimensional-bicycle-bicycle-mountain-bike-png-image_4488350.jpg"
                    width={100}
                    height={40}
                    alt="icon"
                  />
                </Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className={`hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer max-h-60 py-3  `}
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md"> -&gt;</Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer "
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md"> -&gt;</Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer"
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md"> -&gt;</Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer"
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md"> -&gt;</Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer"
            >
              <CardHeader className="flex justify-around">
                <Heading size="md"> From</Heading>
                <Heading size="md"> -&gt;</Heading>

                <Heading size="md"> To</Heading>
              </CardHeader>
              <CardBody className="flex justify-between items-center">
                <Text>Distance: 1.2 KM</Text>
                <div>
                  <Heading size="md"> Final Price: Rs. 2000</Heading>
                  <Text>Estimated Price: Rs. 2050</Text>
                </div>
              </CardBody>
            </Card>

            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer"
            >
              <CardHeader>
                <Heading size="md"> "filled"</Heading>
              </CardHeader>
              <CardBody>
                <Text>variant = "filled"</Text>
              </CardBody>
            </Card>
            <Card
              variant="filled"
              className="hover:border-red-800  border-2 hover:bg-red-400 cursor-pointer"
            >
              <CardHeader>
                <Heading size="md"> "filled"</Heading>
              </CardHeader>
              <CardBody>
                <Text>variant = "filled"</Text>
              </CardBody>
            </Card>
          </Stack>
        </div>
      </div>

      <div className="mt-5">
        {isLoaded && (
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "700px",
              width: "1000px",
            }}
            zoom={14}
            center={
              riderPos.lat
                ? riderPos
                : {
                    lat: 27.700769,
                    lng: 85.30014,
                  }
            }
          >
            {riderPos.lat && (
              <MarkerF
                // onDragEnd={changePickUpAddress}
                draggable={true}
                position={riderPos}
                icon={riderIcon}
              />
            )}

            {/* <MarkerF
                onDragEnd={changeStopAddress}
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
            />  */}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default Rider;
