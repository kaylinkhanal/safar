import styles from "../../styles/map.module.css";

function DestinationSection(props) {
  const {
    destinationInputAddress,
    isSelectionOngoing,
    setDestinationOpen,
    generateDestinationPlaces,
    destinationOpen,
    setIsSelectionOngoing,
    searchedPlaceList,
    setCurrentDestinationPos,
    setDestinationInputAddress,
    setZoom,
  } = props;
  return (
    <div className="flex justify-center flex-col relative">
      <div className="flex justify-between items-center">
        <label
          htmlFor="pickup"
          className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
        >
          Destination Address
        </label>
      </div>
      <input
        value={destinationInputAddress}
        onBlur={() => {
          !isSelectionOngoing && setDestinationOpen(false);
        }}
        onChange={(e) => generateDestinationPlaces(e.target.value)}
        type="text"
        id="default-input"
        placeholder="Enter your destination point or Locate on Map"
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
                    setCurrentDestinationPos({
                      lat: item.lat,
                      lng: item.lon,
                    });
                    setZoom(14);
                    setDestinationInputAddress(item.formatted);
                    setDestinationOpen(false);
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

export default DestinationSection;
