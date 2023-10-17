function BargainSection(props) {
  const {
    finalPrice,
    priceChangeCount,
    selectedVehicle,
    setFinalPrice,
    calculateEstPrice,
    setPriceChangeCount,
  } = props;
  const basePrice = selectedVehicle.basePrice;
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1>Change your Offer Price</h1>
      </div>
      <div>
        <button
          onClick={() => {
            if (
              finalPrice &&
              finalPrice - priceChangeCount >= selectedVehicle.basePrice
            ) {
              return setFinalPrice(finalPrice - priceChangeCount);
            } else if (
              !finalPrice &&
              calculateEstPrice() - priceChangeCount >=
                selectedVehicle.basePrice
            ) {
              return setFinalPrice(calculateEstPrice() - priceChangeCount);
            } else if (
              finalPrice - priceChangeCount <=
              selectedVehicle.basePrice
            ) {
              return setFinalPrice(selectedVehicle.basePrice);
            }
          }}
          className="p-3 m-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
        >
          -
        </button>
        <input
          value={priceChangeCount}
          onChange={(e) => setPriceChangeCount(Number(e.target.value))}
          className="w-10 h-10 bg-gray-200 dark:bg-gray-800"
        />
        <button
          onClick={() =>
            setFinalPrice(
              finalPrice
                ? finalPrice + priceChangeCount
                : calculateEstPrice() + priceChangeCount
            )
          }
          className="p-3 m-2 text-sm font-medium text-center items-center text-white bg-[#37304E] rounded-lg hover:bg-red-800 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default BargainSection;
