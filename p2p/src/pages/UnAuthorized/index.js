import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { IoWalletOutline } from "react-icons/io5";
import ChooseNetwork from "../../components/Modals/NetworkConnection/ChooseNetwork";
import { useActiveWeb3React } from '../../utils/hooks/useActiveWeb3React';
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import NetworkModal from "../../components/Navbar/modals/networkModal";


export default function Index() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)"),
  [openNetModal, setOpneNetModal] = useState(false),
  mode = useColorModeValue("light", "dark"),
  navigate = useNavigate(),
  location = useLocation(),
  from = location.state?.from?.pathname || "/",
  {account} = useActiveWeb3React(),
  auth = localStorage.getItem("authToken");

  /* if(account && auth){
    navigate(from, { replace: true });
  }

  if(account && !auth){
    navigate(from, { replace: true });
  } */

  if(account){
    if(auth !== null){
      navigate(from, { replace: true });
    }
    navigate(from, { replace: true });
  }

  return (
    <>
      <Box fontSize='xl'>
        <Flex minH='100vh' zIndex={1} justifyContent={"center"}  mt={20} flexWrap='wrap'>
          <Box
            mx={4}
            mb={isMobileDevice ? 45 : 5}
            w={["100%", "100%", "37%", "33.5%"]}
          >

        <Text
            fontSize='16px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            pt={2}
        >
            You need to connect your wallet to continue.
        </Text>

            <Button
                mt={3}
                data-tut='reactour__WalletConnect'
                rightIcon={<IoWalletOutline />}
                variant='brand'
                width={"50%"}
                my={3}
                onClick={() => setOpneNetModal(!openNetModal)}
            >
                Connect Wallet
            </Button>

          </Box>
        </Flex>
      </Box>
      <NetworkModal displayNetwork={openNetModal} setDisplayNetwork={setOpneNetModal} />

    </>
  );
}
