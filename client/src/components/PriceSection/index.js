function PriceSection(props) {
  const { calculateEstPrice, finalPrice } = props;
  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        <h1>Estimated price :</h1>
        <p className="font-bold"> Rs{calculateEstPrice()}</p>
      </div>
      <div className="flex">
        <h1>Final price :</h1>
        <p className="font-bold"> Rs{finalPrice || calculateEstPrice()}</p>
      </div>
    </div>
  );
}

export default PriceSection;
