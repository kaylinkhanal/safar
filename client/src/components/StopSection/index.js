import styles from "../../styles/map.module.css";

function StopSection(props) {
  const {
    setStopPosition,
    stopPosition,
    currentDestinationPos,
    setStopInputVisible,
    stopInputVisible,
    stopInputAddress,
    isSelectionOngoing,
    setStopOpen,
    generateStopPlaces,
    stopOpen,
    setIsSelectionOngoing,
    searchedPlaceList,
    setZoom,
    setStopInputAddress,
  } = props;

  return (
    <div className="mb-5">
      <button
        type="button"
        className="px-3 mt-4 mb-4 py-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
        onClick={() => {
          setStopPosition(stopPosition.lat ? {} : currentDestinationPos);

          setStopInputVisible(!stopPosition.lat);
        }}
      >
        {stopPosition.lat ? "Remove Stop" : "Add Stop"}
      </button>
      {stopInputVisible && (
        <>
          <div className="flex justify-between items-center">
            <label
              htmlFor="pickup"
              className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
            >
              Stop Address
            </label>
          </div>
          <input
            value={stopInputAddress}
            onBlur={() => {
              !isSelectionOngoing && setStopOpen(false);
            }}
            onChange={(e) => generateStopPlaces(e.target.value)}
            type="text"
            id="default-input"
            placeholder="Enter your Stop point or Locate on Map"
            className="h-12 w-full bg-red px-4 text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"
          />
        </>
      )}
      {stopOpen && (
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
                    setStopPosition({
                      lat: item.lat,
                      lng: item.lon,
                    });
                    setZoom(14);
                    setStopInputAddress(item.formatted);
                    setStopOpen(false);
                  }}
                  className={styles.autocompleteList}
                >
                  {item.formatted.length > 15
                    ? item.formatted.substring(0, 50) + "..."
                    : item.formatted}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default StopSection;
