import React  from "react";
import {
  Box,
  Flex,
  useColorModeValue,
   
  useMediaQuery,
} from "@chakra-ui/react";
import RegistrationStep from "./components/RegistrationStep";
import Wallet from "./components/RegistrationBox/Wallet"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { screenId, setActiveBar } from "../../../state/council/index";
 

export default function Index() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const dispatch = useDispatch();
  const councilUI = useSelector((state: RootState) => state.councilUI);
  const mode = useColorModeValue("light", "dark");
  return (
    <>
      <Box fontSize='xl' mb={isMobileDevice ? 20 : 0}>
        <Flex minH='100vh' zIndex={1} mt={10} flexWrap='wrap'>
          <Box
            display={isMobileDevice ? "none" : undefined}
            mx={4}
            w={["100%", "100%", "37%", "29.5%"]}
            mb={4}
          >
            <Flex
              cursor='pointer'
              onClick={() => dispatch(setActiveBar(screenId.WALLET))}
              justifyContent='flex-start'
              alignItems='center'
              mb={5}
            >
            </Flex>
            <RegistrationStep />
          </Box>

          <Box
            mx={isMobileDevice ? 2 : 4}
            mb={isMobileDevice ? 45 : 5}
           w={["90%", "95%", "45%", "30.5%"]}
          >
            {councilUI.activeBar === screenId.WALLET ? (
              <Wallet />
            ) : councilUI.activeBar === screenId.STARTVOTING ? (
              <Wallet />
            ) : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
