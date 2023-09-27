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

function Admin() {
   
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
     <h1>Vehicle options</h1>
     Vehicle Type: <input/>
     PricePerUnitKm <input/>
    </div>
  );
}

export default Admin;
