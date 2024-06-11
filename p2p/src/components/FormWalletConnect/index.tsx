import { useState } from 'react';
import {
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { useActiveWeb3React } from '../../utils/hooks/useActiveWeb3React';
import { shortenAddress } from '../../utils';
import { IoWalletOutline } from 'react-icons/io5';
import NetworkModal from '../Navbar/modals/networkModal';
import WalletModal from '../Navbar/modals/walletModal';

const FormWalletConnect = () => {
  const mode = useColorModeValue("light", "dark");
  const { account } = useActiveWeb3React();
  const bgColor = useColorModeValue("#F2F5F8", "#213345");
  const [displayNetwork, setDisplayNetwork] = useState(false);
  const [displayWallet, setDisplayWallet] = useState(false);

  if(account){
    return(
      <>
        <Flex
          mt={5}
          color='#fff'
          mb='16px'
          flexDirection={'column'}
          justifyContent='center'
          alignItems='center'
          backgroundColor={bgColor}
          border={
            mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
          }
          borderRadius='4px'
        >

          <Text
          py={2}
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            Wallet Connected
          </Text>

          <Button
            onClick={()=>{setDisplayWallet((state) => !state)}}
            mt={3}
            data-tut="reactour__WalletConnect"
            variant="brand"
            width={'50%'}
            my={3}
            bg={'transparent'}
            border={'1px solid #319EF6'}
            color='#319EF6'
            _hover={{backgroundColor: 'transparent'}}
          >
            {shortenAddress(account)}
          </Button>
          <WalletModal
          displayWallet={displayWallet}
          accounts={account}
          setDisplayWallet={setDisplayWallet}
        />
        </Flex>
      </>
    )
  }else{
    return(
      <>
        <Flex
          mt={5}
          color='#fff'
          mb='16px'
          flexDirection={'column'}
          justifyContent='center'
          alignItems='center'
          backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
          border={
            mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
          }
          borderRadius='4px'
        >

          <Text
          py={2}
            fontSize='14px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
          >
            Connect your wallet
          </Text>

          <Button
            mt={3}
            data-tut="reactour__WalletConnect"
            rightIcon={<IoWalletOutline />}
            variant="brand"
            width={'50%'}
            my={3}
            onClick={() => setDisplayNetwork((state) => !state)}
          >
            Connect Wallet
          </Button>
        </Flex>
        <NetworkModal displayNetwork={displayNetwork} setDisplayNetwork={setDisplayNetwork} />
      </>
  )
}
}

export default FormWalletConnect
