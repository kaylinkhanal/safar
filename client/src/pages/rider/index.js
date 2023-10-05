import React, {useEffect} from 'react'
import { io } from "socket.io-client";
const socket = io("http://localhost:3005");
function index() {
    useEffect(()=>{
        socket.on('rides',(rides)=>{
            console.log(rides)
        })
    })
    return (
        <div>
            hi
        </div>
    )
}

export default index
