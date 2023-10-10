import { Card, Heading } from "@chakra-ui/react";

function RideAcceptedCard(props) {
  const { rideAcceptDetails } = props;
  return (
    <div className="flex flex-col">
      <Card className="p-5" align="center">
        <Heading className="pb-3 text-[#37304E]" size="md">
          Your Ride has been Accepted
        </Heading>
        <p className="text-xs">Rider Details</p>
        <p className=" font-semibold text-[#37304E]">
          Rider : {rideAcceptDetails?.rider?.fullName}
        </p>
        <p className=" font-semibold text-[#37304E]">
          Number : {rideAcceptDetails?.rider?.phoneNumber}
        </p>
        <p className=" font-semibold text-[#37304E]">Vehicle No :</p>
        <p>
          Total Price to be Paid :{" "}
          <strong>Rs{rideAcceptDetails?.finalPrice}</strong>
        </p>
        <p className="text-xs mt-5">Have a Safe and Happy Ride</p>
      </Card>
    </div>
  );
}

export default RideAcceptedCard;
