import { Box, Circle, Divider, Flex, Text } from '@chakra-ui/react'
import Wallet from "../../assets/wallet.svg";
import Link from "../../assets/link.svg";
import Bonus from "../../assets/bonus.svg";
import { useTranslation } from 'react-i18next';

const ReferralMap = () => {
    const { t } = useTranslation()
    
    const referralMap = [
        {
            icon:<img src={Wallet} />,
            title:t('connect_wallet'),
            text:t('connect_wallet_text')
        },
        {
            icon:<img src={Link} />,
            title:t('send_ref_link'),
            text:t('send_ref_link_text')
        },
        {
            icon:<img src={Bonus} />,
            title:t('ref_bonus'),
            text:t('ref_bonus_text')
        },
    ]
  return (
    <Flex width={["95%","95%","1100px"]} boxSizing="border-box" justifyContent="space-between" my="60px" flexDirection={["column","column","row"]}
    
    >
        {referralMap.map((item, index) => {
            return (
                <Box position="relative">
                  {index!==0 &&  <Divider
          size='md'
          w='90%'
          variant="dashed"
          borderWidth="4px"
          display={["none","none","block"]}
        //   ml="-150px"
        top="25px"
        left="-160px"
        color=" #ECF8FB"
          position="absolute"
 />}
                 <Flex key={index} justifyContent="center" flexDirection="column" alignItems="center" 
                 px="20px" py={["20px","20px",0]}
                >
                    <Circle size="55px" bg="#ECF8FB">{item.icon}</Circle>
                    <Box my="10px">{item.title}</Box>
                    <Text textAlign="center">{item.text}</Text>
                </Flex>
                
                </Box>
               

            )
        })

        }
    </Flex>
  )
}

export default ReferralMap