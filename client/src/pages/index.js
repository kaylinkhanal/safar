import Image from "next/image";
import { Inter } from "next/font/google";
import Login from "./login";
import { useState, useEffect, useRef } from "react";
import {
  HamburgerIcon,
  AddIcon,
  IconButton,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducerSlices/userSlice";
const inter = Inter({ subsets: ["latin"] });
import { useRouter } from "next/router";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  Input,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import {
  GoogleMap,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import styles from "../styles/map.module.css";

const PlacesCard = (props) => {
  return (
    <div
      onMouseLeave={() => props.setIsSelectionOngoing(false)}
      onMouseOver={() => props.setIsSelectionOngoing(true)}
      className={styles.autocompleteBox}
    >
      {props.searchedPlaceList.length > 0 &&
        props.searchedPlaceList.map((item) => {
          return (
            <div
              onClick={() => {
                props.setPickInputAddress(item.formatted);
                props.setPickUpOpen(false);
              }}
              className={styles.autocompleteList}
            >
              {item.formatted.length > 20
                ? item.formatted.substring(0, 20) + "..."
                : item.formatted}
            </div>
          );
        })}
    </div>
  );
};

const CustomMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Menu width={"0px"} height={"50px"}>
      <MenuButton transition="all 0.1s" borderRadius="full" borderWidth="none">
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            focusable="flase"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </MenuButton>
      <MenuList>
        <div className="flex flex-col justify-center ">
          <button onClick={() => router.push("/account")}>My Account</button>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </MenuList>
    </Menu>
  );
};

export default function Home() {
  const [currentPos, setCurrentPos] = useState({
    lat: 27.700769,
    lng: 85.30014,
  });
  const pickInputRef = useRef(null)
  const [zoom, setZoom] = useState(13)
  const [isSelectionOngoing, setIsSelectionOngoing] = useState(false);
  const [pickInputAddress, setPickInputAddress] = useState("");
  const [destinationInputAddress, setDestinationInputAddress] = useState("");
  const [pickUpOpen, setPickUpOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [pickInputFocus,setPickInputFocus ] = useState(false)
  const [searchedPlaceList, setSearchedPlaceList] = useState([]);
  
  
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries: ["places"],
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((latlan) => {
      const { latitude, longitude } = latlan.coords;
      setCurrentPos({ lat: latitude, lng: longitude });
    });
    pickInputRef?.current?.focus()
  
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

  const changePickUpAddress = async(e)=> {
    setCurrentPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })

   const res= await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
   const data= await res.json()
   if(data){
    setPickInputAddress(data.features[0].properties.formatted)
   }
  }
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
          <div className="mb-6 flex justify-center flex-col relative">
            <input
            ref={pickInputRef}
              value={pickInputAddress}
              onFocus={()=> setPickInputFocus(true) }
              onBlur={() =>{ !isSelectionOngoing && setPickUpOpen(false)
                setPickInputFocus(false)
              }}
              onChange={(e) => generatePickUpPlaces(e.target.value)}
              type="text"
              id="default-input"
              placeholder="Enter your pickup point"
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
                          setCurrentPos({
                            lat: item.lat,
                            lng: item.lon
                          })
                          setZoom(14)
                          setPickInputAddress(item.formatted);
                          setPickUpOpen(false);
                        }}
                        className={styles.autocompleteList}
                      >
                        {item.formatted.length > 15
                          ? item.formatted.substring(0, 32) + "..."
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
              placeholder="Enter your destination point"
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
                          setDestinationInputAddress(item.formatted);
                          setDestinationOpen(false);
                        }}
                        className={styles.autocompleteList}
                      >
                        {item.formatted.length > 15
                          ? item.formatted.substring(0, 15) + "..."
                          : item.formatted}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
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
              center={currentPos.lat ? currentPos :{
                lat: 27.700769,
                lng: 85.30014,
              }}
            >
             <MarkerF
                onDragEnd={changePickUpAddress}
                draggable={true}
                position={currentPos} />
            
            {!pickInputFocus && <MarkerF
                onDragEnd={changePickUpAddress}
                draggable={true}
                position={currentPos} />
            }
        
            </GoogleMap>
          )}
        </div>
      </div>

      {/* Share the Ride  */}
      {/* <div className="flex justify-center items-center flex-col">
        <h1 className="font-mono text-5xl text-gray-500 antialiased font-semibold line-clamp-1">
          Share the ride
        </h1>
        <p className="text-1xl text-gray-400 antialiased font-semibold line-clamp-1">
          Safar is a safe and reliable ride sharing application based in Nepal.
        </p>
      </div> */}
    </main>
  );
}
