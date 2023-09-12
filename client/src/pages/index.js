import Image from 'next/image'
import { Inter } from 'next/font/google'
import { TriangleDownIcon } from '@chakra-ui/icons'

import Login from './login'
import {useEffect, useState} from 'react'
import {addWishList} from '../redux/reducerSlices/productSlice'
import { HamburgerIcon, AddIcon,IconButton, ExternalLinkIcon } from '@chakra-ui/icons'
import {useSelector, useDispatch} from 'react-redux'
import {logout } from '../redux/reducerSlices/userSlice'
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
const CustomMenu= ()=>{
  const dispatch = useDispatch()
  const router = useRouter()
  return(
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
        <button onClick={()=>router.push('/account')}>My Account</button>
        <button onClick={()=> dispatch(logout())}>Logout</button>
      </div>
    </MenuList>
  </Menu>
)
}

export default function Home() {
  const {isLoggedIn ,userDetails} = useSelector(state=>state.user)

  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  >
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      {isLoggedIn  && userDetails.role != 'Guest-User'  ? (<CustomMenu/>) : (<div>
      <button>
        Login
      </button>
        <button>
        Register
      </button>
      </div>)}
      <Input
          color='teal'
          placeholder='enter your pickup'
          _placeholder={{ color: 'inherit' }}
        />
            <Input
          color='teal'
          placeholder='enter your destination'
          _placeholder={{ color: 'inherit' }}
        />
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
           
          
          <Image
            src="/safarlogo.jpeg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </div>

  
  </main>
  )
}


