import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/reducerSlices/userSlice';
import { Button } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuDivider } from '@chakra-ui/react'

function NavBar() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.user)
    const { userDetails } = useSelector(state => state.user)

    return (
        <nav>
            <div className='flex justify-between items-center w-full md:h-12 bg-[#37304E] text-white pt-3'>
                {/* Logo */}
                <div className='mx-8 p-2 w-1/3'>
                    <Link href={"/"}>
                        <Image src={'/safarLogo.png'} width={'60'} height={'10'} alt='' />
                    </Link>
                </div>
                {/* Center Navigation Div  */}
                <div className='flex justify-center text-center rounded-full w-1/3'>
                    <div className=' w-1/4 p-2 rounded-l-full dark: hover:bg-[#CD121F] shadow-inner shadow-slate-900'>
                        <button>Home</button>
                    </div>
                    <div className=' w-1/4 p-2 hover:bg-[#CD121F] shadow-inner shadow-slate-900'>
                        <button>Services</button>
                    </div>
                    <div className='w-1/4 p-2  hover:bg-[#CD121F] shadow-inner shadow-slate-900'>
                        <button>Safety</button>
                    </div>
                    <div className='w-1/4 p-2 rounded-r-full hover:bg-[#CD121F] shadow-inner shadow-slate-900'>
                        <button>Help</button>
                    </div>
                </div>

                {!isLoggedIn ?
                    <>
                        {/* Login-SignUp Button  */}
                        <div className='flex justify-end w-1/3 mx-8'>
                            <div className='hover:bg-[#CD121F] rounded-l-full w-20 shadow-inner shadow-slate-900 text-center'>
                                <button className='p-2' onClick={() => router.push('/login')}>Login</button>
                            </div>
                            <div className='rounded-r-full hover:bg-[#8D7AEC] bg-[#CD121F] w-20  shadow-inner shadow-slate-900 text-center'>
                                <button className='p-2' onClick={() => router.push('/register')}>SignUp</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className='flex justify-end w-1/3 mx-8'>
                            <Menu width={'0px'} height={'50px'}>
                                <MenuButton
                                    transition='all 0.1s'
                                    borderRadius='full'
                                    borderWidth='none'
                                >
                                    <div className='flex justify-between space-x-5 ml-10'>
                                        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-[#37304E] ring-2 ring-gray-300 dark:ring-gray-500">
                                            <svg className="absolute w-10 h-10 text-gray-400 -left-1" focusable="flase" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                        </div>
                                    </div>
                                </MenuButton>
                                <MenuList bgColor={'#37304E'}>
                                    <div className='flex flex-col justify-center '>
                                        <button onClick={() =>router.push('/account')} className='bg-[#37304E] hover:bg-[#8D7AEC] p-2'>My Account</button>
                                        <button
                                            onClick={() => {
                                                dispatch(logout());
                                                router.push('/');
                                            }}
                                            className='bg-[#37304E] hover:bg-[#8D7AEC] p-2'
                                        >
                                            Logout
                                        </button>

                                    </div>
                                </MenuList>
                            </Menu>
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default NavBar