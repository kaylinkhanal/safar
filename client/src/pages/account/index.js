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
import UserForm from '../../components/userForm'

function index() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {userDetails} = useSelector(state=>state.user)
    return (
        <div>
            <h1>Account</h1>
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
            <input onChange={e=>console.log(e.target.files[0])} type="file"/>
            </div>

        </div>
    )
}

export default index
