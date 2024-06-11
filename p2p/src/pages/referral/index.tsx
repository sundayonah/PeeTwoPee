import { CopyIcon } from '@chakra-ui/icons';
import { Box,Button, Flex,Icon,IconButton, SkeletonText, Table,TableContainer, Tbody,Text,Th,Thead,Tooltip,Tr,useClipboard,useColorModeValue,useMediaQuery,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
 import DatePicker from 'react-datepicker';
import { RootState } from '../../state/store';
import ReferralBody from './ReferralBody';
import ReferralMap from './ReferralMap';
import { FETCH_REFERRALS } from './gql/queries';
import { useActiveWeb3React } from '../../utils/hooks';
import { useQuery } from '@apollo/client';
import { shortenAddress, shortenInfo } from '../../utils';
import NoOrder from '../../components/NOOrder';
import { MdEditCalendar } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const Referral = () => {
  const { chainId,   account } = useActiveWeb3React();
  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin.toString()}/app/${account}`
  );
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const { t } = useTranslation()
 // const inactiveColour = useColorModeValue('#666666', '#999999');
  const border = useColorModeValue(
    ' rgba(222, 229, 237, 1)',
    'rgba(50, 77, 104, 1)'
  ); 
 
  const {
    
  } = useSelector((state: RootState) => state.referral);
  const { loading, error, data, refetch } = useQuery(FETCH_REFERRALS);
  const LIGHT_THEME = 'light';
  const DARK_THEME = 'dark';
  const mode = useColorModeValue('light', 'dark');
  const textColour2 = useColorModeValue("#666666", "#F1F5F8"); 
  const closeBtnColour = useColorModeValue('#666666', '#DCE5EF');
  const background= useColorModeValue("white", "#213345");
  const textColor= useColorModeValue("#333333","#fff")
  const referColor= useColorModeValue("#22BB33","#22BB33")
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");



  useEffect(() => {
    refetch();
  }, [chainId, account]);

  return (
    <Box mx={isMobileDevice ? 3 : 16} py={10} mb={isMobileDevice ? 20 : 7}>
      <Flex justifyContent="space-between" borderBottom={`2px solid ${border}`}>
        <Box pb="5px" color="#319EF6" borderBottom="2px solid #319EF6">
          {t('ref_stat')}
        </Box>
        <Flex display={['none', 'none', 'flex']}>
          <Text>Referral link: </Text>
          <Text color="#319EF6" ml="4px">
           {shortenInfo(`${window.location.origin.toString()}/app/${account}`)}
          </Text>
          <Tooltip
            hasArrow
            label={hasCopied ? 'Copied!' : 'Copy'}
            bg="gray.300"
            color="black"
          >
            <IconButton
              onClick={onCopy}
              backgroundColor="transparent"
              border="none"
              padding="0"
              mt="-8px"
              aria-label="Copy address"
              icon={<CopyIcon />}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Flex display={['flex', 'flex', 'none']} fontSize="14px" mt="10px">
        <Text>{t('ref_link')} </Text>
        <Text color="#319EF6" ml="4px">
         {shortenInfo(`${window.location.origin.toString()}/app/${account}`)}
        </Text>
        <Tooltip
          hasArrow
          label={hasCopied ? 'Copied!' : 'Copy'}
          bg="gray.300"
          color="black"
        >
          <IconButton
            onClick={onCopy}
            backgroundColor="transparent"
            border="none"
            padding="0"
            mt="-8px"
            aria-label="Copy address"
            icon={<CopyIcon />}
          />
        </Tooltip>
      </Flex>
      <ReferralMap />
      <Box borderTop={`2px solid ${border}`} py="25px"></Box>
      <Box>
       {isMobileDevice ?
        <>
         <Box mb="20px" mt="-20px" cursor="pointer">
        <Text fontSize="12px" color={closeBtnColour} >{t('start_date')}</Text>
<Box border="1px solid" width="160px" py="6px" px="7px" borderRadius="4px" mt="10px">
    <DatePicker
                isClearable
                selected={new Date("2022-04-06")}
                selectsStart
                startDate={new Date("2022-04-06")}
                endDate={new Date("2022-06-06")}
                onChange={(date: any) => {
                  // setStartDate(date);
                  // dispatch(
                  //   setAllTradesStartDate({
                  //     AllTradesStartDate: date,
                  //   })
                  // );
                  // dispatch(setAllPageNumber({page:1}));
                }}
                wrapperClassName="date-picker"
                customInput={<Text fontSize="14px" fontWeight="700">2022-04-06<Icon as={MdEditCalendar} ml="6px" fontSize="18px" pt="3px"/></Text>}
              />
</Box>
      
          
        </Box>
         {loading ? (
             [1,2,3,4].map((trade: any, index: number) => (
              <Box
              w={["100%","100%","310px"]}
              minH="60px"
              key={index}
              borderRadius="6px"
              border="1px solid "
              borderColor={borderColor}
              m={['10px auto', '20px auto', '30px 11px']}
              p={['20px 15px 10px 15px']}
              background={background}
              fontSize="12px"
            >
              {[1,2,3,4].map((item,index)=>{
              if(item===2){
                return (
                  <SkeletonText noOfLines={1} width="80px" />
                )
              }else {
                  return (
                    <Box my="20px">
                    <Flex justifyContent="space-between" >
                    <SkeletonText noOfLines={1} width="100px"  />
                    <SkeletonText noOfLines={1} width="100px"  />
                 </Flex>
                 <Flex justifyContent="space-between" color={textColor}  fontWeight="500" mt="12px">
                 <SkeletonText noOfLines={1} width="120px"  />
                    <SkeletonText noOfLines={1} width="120px"  />
                 </Flex>
       
                  </Box>   
                  )
                }
              })}   
            </Box>
               ))
         ) :
         data?.length === 0 ? (
          <Tooltip
          hasArrow
          label={hasCopied ? 'Copied!' : 'Copy'}
          bg="gray.300"
          color="black"
        >
          <NoOrder
          text="No Referral"
          subText="You have not received any award on referral, Refer someone to earn some tokens">
           <Button
          width='235px'
          height='40px'
          onClick={onCopy}
          color="white"
          background='#319EF6'
          box-shadow='0px 1px 7px -2px rgba(24, 39, 75, 0.06), 0px 2px 2px rgba(24, 39, 75, 0.06)'
          border-radius='6px'
          
        >
          Copy Referral Link
        </Button>
            </NoOrder>
            </Tooltip>
          ) : (
           [1,2,3,4].map((trade: any, index: number) => (
           <Box
           w={["100%","100%","310px"]}
           minH="60px"
           key={index}
           borderRadius="6px"
           border="1px solid "
           borderColor={borderColor}
           m={['10px auto', '20px auto', '30px 11px']}
           p={['20px 15px 10px 15px']}
           background={background}
           fontSize="12px"
         >
           <Box>
            <Text color={textColor} fontSize="14px" fontWeight="500">Trader</Text>
            <Text color={textColour2} fontSize="12px" mt="3px">2022-04-06 | 14:51:22</Text>
           </Box>
          <Flex justifyContent="space-between" my="15px">
            <Box>
              <Text color={textColour2} fontSize="12px">{t('address')}</Text>
              <Text color={textColor} fontSize="14px" fontWeight="500">{shortenAddress(account)}</Text>
            </Box>
            <Box>
              <Text color={textColour2} fontSize="12px">{t('rank')}</Text>
              <Text color={textColor} fontSize="14px" fontWeight="500">Gold</Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box>
              <Text color={textColour2} fontSize="12px">{t('ref_earning')}</Text>
              <Text color={referColor} fontSize="14px" fontWeight="500">5 RGP</Text>
            </Box>
          </Flex>
          </Box>
            ))
          )}  
        </> :
       <TableContainer fontSize={14} mt={6}>
          <Table size="lg" variant="simple">
            <Thead
              textTransform={'none'}
              background={
                mode === LIGHT_THEME
                  ? '#F2F5F8  !important'
                  : mode === DARK_THEME
                  ? '#213345'
                  : mode === DARK_THEME
                  ? '#213345'
                  : mode === LIGHT_THEME
                  ? '#F2F5F8'
                  : '#F2F5F8 !important'
              }
            >
              <Tr fontSize="14px" fontWeight="light" textTransform="none">
                <Th fontWeight="400" fontSize="14px" textTransform="none">
                  {t('acc_ref')}
                </Th>
                <Th fontWeight="400" fontSize="14px" textTransform="none">
                  {t('address')}
                </Th>
                <Th fontWeight="400" fontSize="14px" textTransform="none">
                  {t('rank')}
                </Th>
                <Th fontWeight="400" fontSize="14px" textTransform="none">
                  {t('ref_earning')}
                </Th>
                <Th fontWeight="400" fontSize="14px" textTransform="none">
                  Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.fetchUserReferrals?.users.length > 0 ? (
                data?.fetchUserReferrals?.users.map((item, index) => (
                  <ReferralBody key={index} referral={item} />
                ))
              ) : (
                <Flex  padding="20px">{t('no_ref')}</Flex>
              )}
            </Tbody>
          </Table>
        </TableContainer>}
      </Box>
    </Box>
  );
};

export default Referral;
