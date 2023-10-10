import React from "react";

function VehicleIcons(props) {
  const { vehicleTypeList, selectedVehicle, setSelectedVehicle } = props;
  return (
    <div className="flex mb-2 items-center justify-center">
      {vehicleTypeList.length > 0 &&
        vehicleTypeList.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedVehicle(item)}
            className={`
                     bg-white p-3 rounded-lg shadow-xs mr-2
                      ${
                        item === selectedVehicle
                          ? " border-2 border-slate-600 text-white"
                          : ""
                      }
                  `}
          >
            <img src={item.iconUrl} width={40} height={40} alt="icon" />
          </div>
        ))}
    </div>
  );
}

export default VehicleIcons;
