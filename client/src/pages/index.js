import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from './login'
import {useState,useEffect} from 'react'
import { HamburgerIcon, AddIcon, IconButton, ExternalLinkIcon } from '@chakra-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/reducerSlices/userSlice'
const inter = Inter({ subsets: ['latin'] })
import { useRouter } from 'next/router'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  Input,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { GoogleMap,MarkerF,Autocomplete, useJsApiLoader } from '@react-google-maps/api'
import styles from "../styles/map.module.css"

// Import of NavBar 
import NavBar from '../components/NavBar/index'

const PlacesCard = (props)=> {

    return (
      <div 
      onMouseLeave={()=>props.setIsSelectionOngoing(false)}
      onMouseOver={()=>props.setIsSelectionOngoing(true)}
      className={styles.autocompleteBox}>
        {props.searchedPlaceList.length> 0 && props.searchedPlaceList.map((item)=>{
          return <div
          onClick={()=> {
             props.setPickInputAddress(item.formatted)
             props.setPickUpOpen(false)
          }}
          className={styles.autocompleteList}>{item.formatted.length>15 ? item.formatted.substring(0,15) + '...' : item.formatted}</div>
        })}
      </div>
    )
 
}

const CustomMenu = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <Menu width={'0px'} height={'50px'}>
      <MenuButton
        transition='all 0.1s'
        borderRadius='full'
        borderWidth='none'
      >
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ring-2 ring-gray-300 dark:ring-gray-500">
          <svg className="absolute w-10 h-10 text-gray-400 -left-1" focusable="flase" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
        </div>
      </MenuButton>
      <MenuList>
        <div className='flex flex-col justify-center '>
          <button onClick={() => router.push('/account')}>My Account</button>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </MenuList>
    </Menu>
  )
}

export default function Home() {
  const [currentPos , setCurrentPos ] = useState({
    lat: 27.700769,
    lng: 85.300140
  })
  const [isSelectionOngoing, setIsSelectionOngoing]= useState(false)
  const [pickInputAddress,setPickInputAddress] = useState('')
  const [pickUpOpen,setPickUpOpen] = useState(false)
  const [searchedPlaceList, setSearchedPlaceList]= useState([])
  const { isLoggedIn, userDetails } = useSelector(state => state.user)
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCBYY-RtAAYnN1w_wAFmsQc2wz0ReCjriI", // ,
    libraries:["places"]
  })
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(latlan=>{
      const {latitude, longitude} = latlan.coords
      setCurrentPos({lat:latitude, lng:longitude })
    })
    
  },[])

  const generatePlaces = async(text)=> {
    setPickUpOpen(true)
    setPickInputAddress(text)
   const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`)
  const data = await res.json()
   if(data.results){
      setSearchedPlaceList(data.results)
    }
  
  }
  return (
    <main className={'min-h-screen dark:bg-[#37304E]'}>
      <NavBar />

      {/* Background Image  */}
      <div className='flex justify-center p-2 mt-2'>
        <Image src={'/bg.jpeg'} width={'600'} height={'600'} alt='' />
      </div>
      {isLoaded && (
         <GoogleMap
         id="circle-example"
         mapContainerStyle={{
           height: "400px",
           width: "800px"
         }}
         zoom={13}
         center={{
           lat: 27.700769,
           lng: 85.300140
         }}
       >
           <MarkerF
           draggable= {true}
      position={currentPos}
    />
 
   
         </GoogleMap>
      )}

         
      {/* Share the Ride  */}
      <div className='flex justify-center items-center flex-col'>
        <h1 className='font-mono text-5xl text-gray-200 antialiased font-semibold line-clamp-1'>Share the ride</h1>
        <p className='text-1xl text-gray-200 antialiased font-semibold line-clamp-1'>Safar is a safe and reliable ride sharing application based in Nepal.</p>
      </div>

      {/* Enter desitination and pickup  */}
      <div className='flex justify-center mt-8 px-32 space-x-5 w-full h-22'>
        <div className="mb-6 flex justify-center flex-col w-1/3">
          <input 
          value={pickInputAddress}
          onBlur={()=> !isSelectionOngoing && setPickUpOpen(false)}
          onChange={e=>generatePlaces(e.target.value)}
          type="text" id="default-input" placeholder='Enter your pickup point' className="h-12 bg-red px-4 text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"></input>
          {pickUpOpen &&  <PlacesCard
          isSelectionOngoing={isSelectionOngoing}
          setIsSelectionOngoing= {setIsSelectionOngoing}
          setPickUpOpen={setPickUpOpen} setPickInputAddress={setPickInputAddress} chocolate="kitkat" searchedPlaceList={searchedPlaceList}/>}
       
        </div>
        <div className="mb-6 flex justify-center flex-col w-1/3 ">
          <input type="text" id="default-input" placeholder='Enter your destination point' className="h-12 px-4 bg-[#37304E] text-gray-900 text-center text-sm rounded-full shadow-inner shadow-slate-900"></input>
          
        </div>
      </div>

      {/* Book my Ride  */}
      <div className='flex justify-center items-center text-center'> {/* rounded-full shadow-inner shadow-slate-900 hover:bg-[#CD121F] p-2 rounded-l-full w-20*/}
        <div className='rounded-full shadow-inner shadow-slate-900 hover:bg-[#8D7AEC] p-2 w-1/6 text-white '>
          <div className='flex justify-center'>
            <button onClick={() => router.push('/login')}>Find my &nbsp;</button>
            <Image src={'/safarLogo.png'} width={'50'} height={'50'} alt='' />
          </div>
        </div>
      </div>

    </main>
  )
}

// import {useState,useEffect} from 'react'
// import Image from 'next/image'
// const App = ()=> {
//   const [productList, setProductList] = useState([])
//   const fetchProductList = async()=> {
//     try{
//       const res = await fetch("http://localhost:3005/products")
//       const data = await res.json()
//        if(data.productList){
//           setProductList(data.productList)
//         }
//     }catch(err){
//       console.log(err)
//     }

//   }
//   useEffect(() => {
//     fetchProductList()
//   }, [])
// return (
//   <div>
//     {productList.map(item=>{
//       return <div style={{backgroundColor: 'aqua', width:'200px', height:'190px', margin:'10px'}}>
//         <Image
//             src={'http://localhost:3005/products-image/'+item._id+'?key='+item.productName}
//              width={'60'} height={'10'} alt='' />
//           {item.productName}
//           {item.productPrice}
//         </div>
//     })}
//   </div>
// )
// }
// export default App