import React, {useEffect,useState} from 'react'
import { io } from "socket.io-client";
import { Card, CardHeader, CardBody,Heading, CardFooter, Text } from '@chakra-ui/react'
const socket = io("http://localhost:3005");
function index() {
    const [availableRides, setAvailableRides]= useState([])
    useEffect(()=>{
        socket.on('rides',(rides)=>{
            setAvailableRides(rides)
        })
    })
    return (
        <div>
           


    {availableRides.length> 0 && availableRides.map((item)=>{
        return (
            <Card maxW='sm' className="m-10" variant={"filled"}>
            <CardHeader>
              <Heading size='md'> {item.pickInputAddress.substring(0,20) + '...' }  {"->"} { item.destinationInputAddress.substring(0,20)+ '...' }</Heading>
            </CardHeader>
            <CardBody>
              <Text>Estimated Price: {item.estimatedPrice}</Text> 
              <Text>Final Price: <strong>{item.finalPrice}</strong></Text>
            </CardBody>
          </Card>
        )
    }

    )}
            {JSON.stringify(availableRides)}
        </div>
    )
}

export default index
