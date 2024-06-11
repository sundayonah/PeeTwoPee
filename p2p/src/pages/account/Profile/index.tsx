import { Box, Flex,   useMediaQuery } from '@chakra-ui/react';
import Steps from './Steps';
import EditProfile from './EditProfile';
import VerifyDetail from './VerifyDetail';
 
 
import {   useLogin } from '../../../utils/hooks';
import {   useState } from 'react';
import LoadingPage from '../../../components/LoadingPage/LoadingPage'; 
 

export default function Index() {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
   
  const [activeBar, setActiveBar] = useState(0);
 
  const { loading,  isUsupportedNtwrk } = useLogin();
  const [emailAddress, setEmailAddress] = useState();

  return (
    <>
      {loading && !isUsupportedNtwrk && <LoadingPage />}

      <Box fontSize="xl">
        <Flex minH="100vh" zIndex={1} mt={20} flexWrap="wrap">
          <Box
            display={isMobileDevice ? 'none' : undefined}
            mx={4}
            w={['100%', '100%', '37%', '29.5%']}
            mb={4}
          >
            <Steps activeBar={activeBar} />
          </Box>

          <Box
            mx={4}
            mb={isMobileDevice ? 45 : 5}
            w={['100%', '100%', '37%', '33.5%']}
          >
            {activeBar === 0 ? (
              <EditProfile
                setActiveBar={setActiveBar}
                emailAddress={emailAddress}
                setEmailAddress={setEmailAddress}
              />
            ) : activeBar === 1 ? (
              <VerifyDetail
                setActiveBar={setActiveBar}
                emailAddress={emailAddress}
              />
            ) : null}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
