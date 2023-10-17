function SubmitCancelButton(props) {
  const { handleSubmitRequest, submittedReq } = props;
  return (
    <button
      onClick={() => handleSubmitRequest()}
      type="button"
      className="p-3 w-full my-4 text-center text-white bg-[#37304E] rounded-lg hover:bg-red-800"
    >
      {submittedReq ? "Cancel Ride" : "Submit Request"}
    </button>
  );
}

export default SubmitCancelButton;
