import styles from "../../styles/map.module.css";

function PickUpSection(props) {
  const {
    pickInputRef,
    pickInputAddress,
    pickUpOpen,
    setPickInputFocus,
    generatePickUpPlaces,
    searchedPlaceList,
    setPickUpOpen,
    isSelectionOngoing,
    setIsSelectionOngoing,
    setCurrentInputPos,
    setPickInputAddress,
    setZoom,
  } = props;
  return (
    <div className="mb-6 flex justify-center flex-col relative">
      <div className="flex justify-between items-center">
        <label
          htmlFor="pickup"
          className=" font-mono pb-1 text-gray-500 antialiased font-semibold line-clamp-1"
        >
          Pickup Address
        </label>
      </div>
      <input
        ref={pickInputRef}
        value={pickInputAddress}
        onFocus={() => setPickInputFocus(true)}
        onBlur={() => {
          !isSelectionOngoing && setPickUpOpen(false);
          setPickInputFocus(false);
        }}
        onChange={(e) => generatePickUpPlaces(e.target.value)}
        type="text"
        id="default-input"
        placeholder="Enter your pickup point or Locate on Map"
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
                    setCurrentInputPos({
                      lat: item.lat,
                      lng: item.lon,
                    });
                    setZoom(14);
                    setPickInputAddress(item.formatted);
                    setPickUpOpen(false);
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

export default PickUpSection;
