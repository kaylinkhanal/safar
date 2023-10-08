import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducerSlices/userSlice";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { userDetails } = useSelector((state) => state.user);
  const [userImage, setUserImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // Fetch and display the user's image
  const fetchUserImage = async () => {
    if (userDetails) {
      const userId = userDetails._id;

      try {
        const response = await fetch(
          `http://localhost:3005/users-image/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Set the userImage state with the fetched image URL
        setUserImage(imageUrl);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    } else {
      // Handle the case where userDetails is null or undefined
      console.error("userDetails is null or undefined");
    }
  };

  // Call the fetchUserImage function to retrieve and set the user's image
  useEffect(() => {
    fetchUserImage();
  }, []);

  return (
    <div className="flex justify-between items-center p-5 w-full  bg-[#37304E] text-white pt-3">
      {/* Logo */}
      <div className="mx-8 p-2">
        <Link href={"/"}>
          <Image src={"/safarLogo.png"} width={"60"} height={"10"} alt="" />
        </Link>
      </div>
      {/* Center Navigation Div  */}

      <div>
        <h1 className="font-mono text-white font-bold">Share the ride</h1>
      </div>

      {!isLoggedIn ? (
        <>
          {/* Login-SignUp Button  */}
          <div className="flex justify-end mx-8">
            <div className="hover:bg-[#CD121F] rounded-l-full w-20 shadow-inner shadow-slate-900 text-center">
              <button className="p-2" onClick={() => router.push("/login")}>
                Login
              </button>
            </div>
            <div className="rounded-r-full hover:bg-[#CD121F] w-20  shadow-inner shadow-slate-900 text-center">
              <button className="p-2" onClick={() => router.push("/register")}>
                SignUp
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-end mx-8">
            <Menu width={"0px"} height={"50px"}>
              <MenuButton
                transition="all 0.1s"
                borderRadius="full"
                borderWidth="none"
              >
                <div className=" w-8 h-8 rounded-full overflow-hidden border">
                  <img
                    className="object-cover w-full h-full cursor-pointer link"
                    src={userImage || "/defaultUserImage.png"}
                    width={32}
                    height={32}
                    alt="User Image"
                  />
                </div>
              </MenuButton>
              <MenuList bgColor={"#37304E"}>
                <div className="flex flex-col justify-center ">
                  <MenuItem
                    onClick={() => router.push("/account")}
                    bgColor={"#37304E"}
                    className=" hover:bg-[#CD121F] p-2"
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(logout());
                      router.push("/");
                      setIsMenuOpen(false);
                    }}
                    bgColor={"#37304E"}
                    className=" hover:bg-[#CD121F] p-2"
                  >
                    Logout
                  </MenuItem>
                </div>
              </MenuList>
            </Menu>
          </div>
        </>
      )}
    </div>
  );
}

export default NavBar;
