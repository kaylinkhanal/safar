function EnterDetailsButton(props) {
  const { setPhoneValidationOpen } = props;
  return (
    <button
      onClick={() => setPhoneValidationOpen(true)}
      type="button"
      className="p-3 w-full my-4 text-center text-white bg-[#37304E] rounded-lg hover:bg-red-800"
    >
      Enter Your Details
    </button>
  );
}

export default EnterDetailsButton;
