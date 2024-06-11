import React  from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import RegistrationStep from "./components/RegistrationStep";
import CreatAnAccount from "./components/RegistrationBox/CreatAnAccount";
import SelectCrypto from "./components/RegistrationBox/SelectCrypto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { screenId } from "../../../state/merchant/index";
import { setActiveBar } from "../../../state/merchant/index";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Index() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const dispatch = useDispatch();
  const merchantUi = useSelector((state: RootState) => state.merchantUi);
  const mode = useColorModeValue("light", "dark");
  return (
    <>
      <Box fontSize='xl'>
        <Flex minH='100vh' zIndex={1} mt={10} flexWrap='wrap'>
          <Box
            display={isMobileDevice ? "none" : undefined}
            mx={4}
            w={["100%", "100%", "37%", "29.5%"]}
            mb={4}
          >
            <Flex
              cursor='pointer'
              onClick={() => dispatch(setActiveBar(screenId.ACCOUNTINFO))}
              justifyContent='flex-start'
              alignItems='center'
              mb={5}
            >
              <Flex
                color={mode === "light" ? "#666666" : ""}
                // mb={{ base: 5, sm: 10 }}
                alignItems='center'
              >
                <ArrowBackIcon />
                <Text fontSize='14px'>Back</Text>
              </Flex>
            </Flex>
            <RegistrationStep />
          </Box>

          <Box
            mx={4}
            mb={isMobileDevice ? 45 : 5}
            w={["90%", "95%", "37%", "33.5%"]}
          >
            {merchantUi.activeBar === screenId.ACCOUNTINFO ? (
              <CreatAnAccount />
            ) : merchantUi.activeBar === screenId.SELECTCRYPTO ? (
              <SelectCrypto />
            ) : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
