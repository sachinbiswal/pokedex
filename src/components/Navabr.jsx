import {
  Box,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Image,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiMenu } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const pc = useBreakpointValue({ base: false, lg: true, md: false, sm: false })
  const { isOpen, onOpen, onClose } = useDisclosure()
  let navigationx = useNavigate()
  const btnRef = React.useRef()

  function navigate() {
    console.log("oooo")
    return navigationx("/")
  }

  return (
    <Box
      borderColor='red'
      as="nav"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      bgColor="#c3d9c9" 
      height="50px"
      display="flex"
      justifyContent={{ lg: "center" }}
      alignItems="center"
      position="fixed"
      zIndex={1000}
      top="0px"
      w="100%"
    >
      {pc ? (
        <Box textDecoration="none" textAlign="center" display="flex" w="100%" color="rgb(114,127,148)" p="10px">
          <Image cursor="pointer" onClick={navigate} w="200px" h="50px" src="https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png" />
          <Spacer />
          <ButtonGroup w="100%" variant="link" display="flex" gap="10px" justifyContent="flex-end" alignItems="center">
            <Button variant="ghost" _hover={{ bgColor: "green",color:'white'}}>
              <NavLink to={`/pokemons`}>Pokemons</NavLink>
            </Button>
            <Button variant="ghost" _hover={{ bgColor: "green",color:'white' }}>
              <NavLink to={`/bookmarks`}>Bookmarks</NavLink>
            </Button>
          </ButtonGroup>
          <Spacer />
        </Box>
      ) : (
        <Box color="rgb(114,127,148)" display="flex" justifyContent="space-between" w="100%">
          <IconButton
            onClick={onOpen}
            icon={<FiMenu fontSize="1.25rem" _hover={{ bgColor: "white" }} />}
            aria-label="Open Menu"
            placement='left'
            _hover={{ bgColor: "white" }}
            variant="ghost"
            bgColor="white"
          />
          <Box cursor="pointer" onClick={navigate}>
            <Image w="150px" h="50px" src="https://www.freepnglogos.com/uploads/black-pokemon-logo-transparent-27.png" />
          </Box>
        </Box>
      )}

      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton _hover={{ bgColor: "white" }} />

          <DrawerBody>
            <VStack alignItems="flex-start">
              <Button variant="ghost" onClick={onClose} _hover={{ bgColor: "white" }}>
                <Link to={`/pokemons`}>Pokemons</Link>
              </Button>
              <Button variant="ghost" onClick={onClose} _hover={{ bgColor: "white" }}>
                <Link to={`/bookmarks`}>Bookmarks</Link>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar;
