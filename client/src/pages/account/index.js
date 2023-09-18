import React from 'react'
import {useSelector} from 'react-redux'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Button,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import Image from 'next/image'
import UserForm from '../../components/userForm'

function index() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {userDetails} = useSelector(state=>state.user)
    const uploadImage = async(file)=> {
      const formData = new FormData()
      formData.append('avatar', file)
      const res =  await fetch('http://localhost:3005/users-image/'+userDetails._id, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
    }
    return (
        <div>
            <h1>Account</h1>
            <Image
            src={'http://localhost:3005/users-image/'+userDetails._id+'?key='+Math.random()}
             width={'60'} height={'10'} alt='' />
            <div style={{padding:'30px', backgroundColor:'pink'}}>
            <Button onClick={onOpen}>Edit</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <UserForm/>
            </ModalBody>
  
          </ModalContent>
        </Modal>
      
            <p>{userDetails.fullName}</p>
            <p>{userDetails.role}</p>
            <p>{userDetails.phoneNumber}</p>
            <input onChange={e=>uploadImage(e.target.files[0])} type="file"/>
            </div>

        </div>
    )
}

export default index
