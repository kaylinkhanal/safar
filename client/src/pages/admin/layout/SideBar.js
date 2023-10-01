import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-gray-300 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <Link href="/">
          <img
            className="w-32 h-auto"
            src="/safarLogo-black.png"
            alt="company logo"
          />
        </Link>
      </div>

      <div className="flex flex-col">
        <Link href="/admin/dashboard">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/admin/dashboard"
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div>
              <p className=" text-gray-900">Dashboard</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/vehicle">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname.startsWith("/admin/vehicle")
                ? "bg-red-100 text-red-500"
                : "text-gray-400 hover:bg-red-100 hover:text-red-500"
            }`}
          >
            <div>
              <p className=" text-gray-900 ">Vehicles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

export default SideBar;
