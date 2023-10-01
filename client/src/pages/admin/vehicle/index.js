import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function allVehicles() {
  const router = useRouter();
  const [vehicleList, setVehicleList] = useState([]);

  const fetchVehicleList = async (values) => {
    const res = await fetch("http://localhost:3005/vehicles");
    const data = await res.json();
    setVehicleList(data);
  };

  useEffect(() => {
    fetchVehicleList();
  }, []);

  return (
    <>
      <div className="p-5 bg-gray-100">
        <button
          onClick={() => router.push("/admin/vehicle/create")}
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        >
          ADD VEHICLE
        </button>

        <div className="overflow-auto rounded-lg shadow md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Icon
                </th>
                <th className="p-3 text-sm font-semibold text-left">
                  Vehicle Type
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Price Per Km
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Base Price
                </th>
              </tr>
            </thead>
            {vehicleList.map((item) => (
              <tbody className="divide-y divide-gray-100" key={item._id}>
                <tr className="bg-white">
                  <td className="p-3 text-sm w-8 text-gray-700 whitespace-nowrap">
                    <img src={item.iconUrl} alt="vehicle icon" />
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.vehicleType}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.pricePerKm}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.basePrice}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default allVehicles;
