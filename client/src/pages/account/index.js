import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import Image from "next/image";
import EditAccount from "../../components/EditAccountModal";
import Link from "next/link";

function account() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails } = useSelector((state) => state.user);
  const uploadInputRef = useRef(null);
  const [userImage, setUserImage] = useState(null);

  const handleUploadClick = () => {
    uploadInputRef.current.click();
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await fetch(
      "http://localhost:3005/users-image/" + userDetails._id,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
  };

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-xl font-bold leading-tight tracking-tight pb-3 text-gray-900 md:text-2xl dark:text-white">
          Account Details
        </h1>
        <div className="w-24 h-24 overflow-hidden rounded-full">
          <img src={userImage || "/defaultUserImage.png"} alt="" />
        </div>
        <div>
          <input
            ref={uploadInputRef}
            onChange={(e) => uploadImage(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
          />
          <button
            className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
            onClick={handleUploadClick}
          >
            Change Profile Picture
          </button>
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
            {userDetails.fullName}
          </h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>{userDetails.role}</p>
          </div>
          <table className="text-xs my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td className="px-2 py-2">{userDetails.phoneNumber}</td>
              </tr>
            </tbody>
          </table>

          <div className="text-center my-3">
            <Link
              onClick={onOpen}
              className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
              href="#"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditAccount onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default account;
