import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function TopBar({ showNav, setShowNav }) {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div
      className={`fixed w-full bg-gray-400 h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src="/defaultUserImage.png"
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                {userDetails.fullName}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
            <div className="p-1">
              <Menu.Item>
                <Link
                  href="#"
                  className="flex hover:bg-red-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
