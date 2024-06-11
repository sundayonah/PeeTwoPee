import { Box, Flex,   useMediaQuery } from "@chakra-ui/react";
import RegistrationStep from "./components/RegistrationBox/RegistrationStep";
import CreatAnAccount from "./components/RegistrationBox/CreatAnAccount";
import {   useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { screanId } from "../../state/accountUi";
import PaymentMethod from "./components/RegistrationBox/PaymentMethod";
import VerifyNumber from "./components/RegistrationBox/VerifyNumber";
import {   useLogin } from "../../utils/hooks";
 
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import UnsupportedNetwork from "../../components/unsupportedNetwork/UnsupportedNetwork";
import { Navigate } from "react-router-dom";

export default function Index() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
   
  const accountUi = useSelector((state: RootState) => state.accountUi);
  
  const { loading, authenticated, isUsupportedNtwrk } = useLogin();

  return (
    <>
      {loading && !isUsupportedNtwrk && <LoadingPage />}

      {isUsupportedNtwrk ? (
        <UnsupportedNetwork />
      ) : authenticated ? (
        <Navigate to='/trade/buy' replace />
      ) : (
        <Box fontSize='xl'>
          <Flex minH='100vh' zIndex={1} mt={20} flexWrap='wrap'>
            <Box
              display={isMobileDevice ? "none" : undefined}
              mx={4}
              w={["100%", "100%", "37%", "29.5%"]}
              mb={4}
            >
              <RegistrationStep />
            </Box>

            <Box
              mx={4}
              mb={isMobileDevice ? 45 : 5}
              w={["100%", "100%", "37%", "33.5%"]}
            >
              {accountUi.activeBar === screanId.CREATEACCOUNT ? (
                <CreatAnAccount />
              ) : accountUi.activeBar === screanId.VERIFYNUMBER ? (
                <VerifyNumber />
              ) : accountUi.activeBar === screanId.PAYMETHOD ? (
                <PaymentMethod />
              ) : null}
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
}
