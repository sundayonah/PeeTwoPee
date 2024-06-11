import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text, 
  HStack, 
  SimpleGrid,
  GridItem,
  Icon,
  Tooltip,
  Spacer,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  InfoOutlineIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import ChatBox from "../../../components/ChatBox";
import BackComponent from "../../../components/BackComponent";
import { InfoBulletIcon } from './../../../icons';
import { useTranslation } from 'react-i18next';

export default function OrderCompleted({sendMessage}:{sendMessage:(type:string,text:string) => void}){
 
  const borderColor = useColorModeValue('#DEE6ED','#213345');
  const textColor1 = useColorModeValue('#666666', '#ffffff');
  const textColor2 = useColorModeValue('#333333', '#ffffff');
  const {t} = useTranslation()

  return(
    <>
      <BackComponent text="Wallet" link="/account/balance" />
      <Box p={10}>
        <Flex justifyContent="space-between" mb={5} direction={['column', 'column', 'row' ]} gap={{base: 4}}>
          <Box>
            <Heading as="h3" fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'24px'} color={'#textColor2'}>Order Completed</Heading>
            <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Successfully sold 250 USDT</Text>
          </Box>
          <Box>
            <Flex gap='1'>
              <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Order Number: </Text>
              <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'14px'} color={textColor2}>203342112345668989990 <CopyIcon cursor="pointer"/></Text>
            </Flex>
            <Flex gap='1'>
              <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Time Created:</Text>
              <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'14px'} color={textColor2}>2022-04-06 14:51:22</Text>
            </Flex>
          </Box>
        </Flex>
        <Flex direction={['column', 'column', 'row' ]} gap={{base: 4, md: 2}}>
          <Box px={5} py={5} border={`1px solid ${borderColor}`} borderRadius="8px" width={'100%'}>
            <HStack mb={3}>
              <Icon as={InfoBulletIcon}/>
              <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2} mr={2}>
                {t('trade_detail')}
                <Tooltip hasArrow label={t('trade_detail')}>
                  <InfoOutlineIcon ml={2}/>
                </Tooltip>
              </Text>
            </HStack>
            <SimpleGrid pl={6} columns={3} columnGap={3} rowGap={3} mb={5}>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>{t('quantity')}</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2}>300.87 <span style={{fontWeight: 500}}>RGP</span></Text>
                </Box>
                <Box mt={5}>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Seller</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={'#319EF6'}>RyanTradingCorp</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Price</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2}>500 <span style={{fontWeight: 500}}>NGN/RGP</span></Text>
                </Box>
                <Box mt={5}>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Buyer</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={'#319EF6'}>GabrielS</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>{t('amount')}</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2}>500,000 <span style={{fontWeight: 500}}>NGN</span></Text>
                </Box>
                <Box mt={5}>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Status</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2}>Completed</Text>
                </Box>
              </GridItem>
            </SimpleGrid>

            <HStack mb={3}>
              <InfoBulletIcon />
              <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor1} mr={2}>
                Payment Details
                <Tooltip hasArrow label="Payment Details">
                  <InfoOutlineIcon ml={2}/>
                </Tooltip>
              </Text>
            </HStack>
            <Box ml={6} bg={'#F2F5F8'} p={1}>
              <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'14px'} color={'#666666'}>Bank Transfer</Text>
            </Box>
            <SimpleGrid pl={6} columns={3} columnGap={3} mt={5}>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Bank Name</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={'#319EF6'}>RyanTradingCorp</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Account Name</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={'#319EF6'}>GabrielS</Text>
                </Box>
              </GridItem>
              <GridItem>
                <Box>
                  <Text fontFamily={'Cera Pro'} fontWeight={'400'} fontSize={'14px'} color={textColor1}>Account Number</Text>
                  <Text fontFamily={'Cera Pro'} fontWeight={'500'} fontSize={'16px'} color={textColor2}>02930402912</Text>
                </Box>
              </GridItem>
            </SimpleGrid>
          </Box>
          <Spacer/>
          <Box border={`1px solid ${borderColor}`} borderRadius="8px" p={5}>
            <ChatBox 
            messages={[]} 
            sendMessage={sendMessage}
            dispute={false} page="sell"/>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
