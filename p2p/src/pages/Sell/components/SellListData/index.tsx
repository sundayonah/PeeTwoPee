import { Box, Flex, Image, Switch, Table, TableContainer, Text, useColorModeValue } from "@chakra-ui/react";
import {   useState } from "react";
import SellListItemComponent from "./SellListItemComponent"; 
import RGPImage from '../../../../assets/rgp.svg';
import { IOrder } from "../../../../state/order";
import NOOrder from "../../../../components/NOOrder";
import { useTranslation } from "react-i18next";
import {

  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  SkeletonText,
} from "@chakra-ui/react";
import moment from "moment";
import { formatDecimalNumber, weiToToken } from "../../../../utils/functions/util";



type IPageProps = {
  page: string;
  orders: IOrder[];
  setOrderInfo: React.Dispatch<React.SetStateAction<IOrder>>;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suggestions?:any
  selectAsset:(asset:any) => void
};

export default function SellListData({
  page,
  orders,
  setOrderInfo,
  setisOpen,
  suggestions,
  selectAsset
}: IPageProps) { 
  const [showNoAccountModal, setShowNoAccountModal] = useState(false);
  const mode = useColorModeValue("light", "dark");

  const { t } = useTranslation()
  const checkForConnection = (page: string) => {
   
    setShowNoAccountModal(true);
  };
 //  
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");


  
  // Define static ads data
  const staticAdsData = [
    {
      _id: '1',
      asset: 'BTC',
      fiat: '$10000',
      crypto_amount: 0.01,
      type: 'buy',
      price: 100000,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 5000,
      limit_max: 15000,
    },
    {
      _id: '2',
      asset: 'ETH',
      fiat: '$2000',
      crypto_amount: 0.02,
      type: 'sell',
      price: 200,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 1000,
      limit_max: 3000,
    },
        {
      _id: '3',
      asset: 'XRP',
      fiat: '$10000',
      crypto_amount: 0.01,
      type: 'buy',
      price: 100000,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 5000,
      limit_max: 15000,
    },
    {
      _id: '4',
      asset: 'SOL',
      fiat: '$2000',
      crypto_amount: 0.02,
      type: 'sell',
      price: 200,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 1000,
      limit_max: 3000,
    },
        {
      _id: '5',
      asset: 'BASE',
      fiat: '$10000',
      crypto_amount: 0.01,
      type: 'buy',
      price: 100000,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 5000,
      limit_max: 15000,
    },
    {
      _id: '6',
      asset: 'WETH',
      fiat: '$2000',
      crypto_amount: 0.02,
      type: 'sell',
      price: 200,
      createdAt: '1640995200', // Unix timestamp for Jan 1, 2022
      limit_min: 1000,
      limit_max: 3000,
    },
    // Add more static ads as needed
  ];

    const LIGHT_THEME = "light";
  const DARK_THEME = "dark";



  return (
    <Box className="BuyAds">
     

      {orders?.length === 0 ? (
        // <Box >
        //  <NOOrder
        // text={t("no_ads")}
        // subText={t('no_ads_text')}
        // button="none"
     
        // >
        //   <Box my="30px">
        //     <Text textAlign="center"  fontSize="14px" color="#319EF6">{t('available_ads')}</Text>
        //   <Flex
        //   justifyContent="center"
        //   gap="20px"
        //   flexWrap="wrap"
        //   my="10px"
         
        //   >
        //     {suggestions.map((item,index)=>{
        //       return (
        //         <Flex key={index}
        //         // borderColor={inputBorderColor}
        //         justifyContent="space-between"
        //         boxSizing="border-box"
        //         cursor="pointer"
        //         onClick={()=>selectAsset(item)}
        //         >
        //          {item.image || item.asset==="RGP" ? <Image src={item.asset ==="RGP" ? RGPImage : item.asset==="BUSD" ? "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BUSD-BD1/logo.png" : item?.image} width="30px" alt={item.asset} fontSize="11px"/>
        //           :  <Text fontSize="16px" mt="10px" textDecoration="underline">{item.asset}</Text>}
        //         </Flex>
        //       )
        //     })}
        //   </Flex>
        //   </Box>
          
        // </NOOrder>
   
        //   </Box>
      
        <Box>
          
          <TableContainer>
            <Table variant="simple">
           <Thead
              style={{ textTransform: "none" }}
              textTransform={"none"}
              background={
                mode === LIGHT_THEME
                  ? "#F2F5F8  !important"
                  : mode === DARK_THEME
                  ? "#213345"
                  : mode === DARK_THEME
                  ? "#213345"
                  : mode === LIGHT_THEME
                  ? "#F2F5F8"
                  : "#F2F5F8 !important"
              }
            >
              <Tr style={{ textTransform: "none" }} textTransform={"none"}>
                <Th style={{ textTransform: "none" }}>{t('currencies')}</Th>
                <Th style={{ textTransform: "none" }}>{t('quantity')}</Th>
                <Th style={{ textTransform: "none" }}>{t('trade_type')}</Th>
                <Th style={{ textTransform: "none" }}>{t('price')}</Th>
                <Th style={{ textTransform: "none" }}>{t('allowance')}</Th>
                <Th style={{ textTransform: "none" }}>{t('date')}</Th>
                <Th style={{ textTransform: "none" }}>{t('trade_limits')}</Th>
                <Th style={{ textTransform: "none" }}>{t('actions')}</Th>
              </Tr>
            </Thead>
         <Tbody>
                
                {staticAdsData?.map((order: any) => {
                  return (
                    <Tr>
                      <Td>
                        <Flex mt={3} direction={"column"}>
                          {/* <Box>{t('crypto')}: {order.asset} </Box> */}
                          <Box>{t('fiat')}: {order.fiat}</Box>
                        </Flex>
                      </Td>
                      <Td>
                        <Text>
                          {formatDecimalNumber(order.crypto_amount)} {order.asset}
                        </Text>
                      </Td>
                      <Td textAlign="center">
                        <Text>{t(`${order.type}`)}</Text>
                      </Td>
                      <Td>
                        <Text>
                          {formatDecimalNumber(order.price)} {order.fiat}/{order.asset}
                        </Text>
                      </Td>
                      <Td>
                        <Text>
                          {/* {adsAllowances[order.asset]
                            ? formatDecimalNumber(adsAllowances[order.asset])
                            : "0"}{" "} */}
                          {order.asset}
                        </Text>
                      </Td>
                      <Td>
                        <Flex mt={3} direction={"column"}>
                          {/* <Box>
                            {moment(parseFloat(order.createdAt)).format(
                              moment.HTML5_FMT.DATE
                            )}
                          </Box> */}
                          <Box>
                            {moment(parseFloat(order.createdAt)).format(
                              "LTS"
                            )}
                          </Box>
                        </Flex>
                      </Td>
                      <Td>
                        <Box>
                          {formatDecimalNumber(order.limit_min)} - {formatDecimalNumber(order.limit_max)} {order.fiat}
                        </Box>
                      </Td>
                      <Td>
                        <Flex>
                          <Flex fontSize={14}>
                            <button
                              style={{
                                cursor: "pointer",
                                background: "none",
                              }}
                            // onClick={(event) => {
                            //   navigate(`/postad/${order._id}`);
                            // }}
                            >
                              {t('edit')}
                            </button>
                            <Text mx={2}>| </Text>
                            <button
                              style={{
                                cursor: "pointer",
                                background: "none",
                              }}
                            // onClick={() => {
                            //   setOpenDeleteAd(true);
                            //   setItemId(order._id);
                            // }}
                            >
                              {t('delete')}
                            </button>
                          </Flex>
                          <Box>
                            <Flex fontSize={14}>
                              <Switch
                                size='sm'
                                mx={4}
                                mt={1}
                                // onChange={(event) => {
                                //   changeAdsStatus({
                                //     variables: {
                                //       status: event.target.checked
                                //         ? true
                                //         : false,
                                //       id: order._id,
                                //     },
                                //   });
                                // }}
                                isChecked={order.status === "online"}
                              />
                              <Text cursor={"pointer"}>
                                {order.status == "online"
                                  ? t('online')
                                  : t("offline")}
                              </Text>
                            </Flex>
                          </Box>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
      </Box>
      
       
      ) : (
        <Box mb="30px">
        {orders?.map((item, index) => {
          return (
            <SellListItemComponent
              // termsAndConditions={termsAndConditions}
              setOrderInfo={setOrderInfo}
              setisOpen={setisOpen}
              key={index}
              page={page}
              checkForConnection={checkForConnection}
              data={item}
            />
          );
        })}
        </Box>
        
      )}
    </Box>
  );
}
