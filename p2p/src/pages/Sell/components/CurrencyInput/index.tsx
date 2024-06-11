import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  useMediaQuery,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem, 
  Img,
  Button,
  InputGroup,
  InputRightAddon,
  Input,
  useColorModeValue, 
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RefreshIcon } from "../../../../assets/Icons"; 
import CustomModal from "../../../../components/Modals/CustomModal"; 
import { RootState } from "../../../../state/store";
import {  fiatCurrencies } from "../../../../utils/constants/constants";
import { useActiveWeb3React } from "../../../../utils/hooks";
import useLocalStorage from "../../../../utils/hooks/useLocalStorage";

interface IFiat {name:string,currency:string,logo:string}

export default function CurrencyInput({
  selectedFiat,
  setSelectedFiat,
  reFetchInfo,
  onChange,
}: {
  selectedFiat:IFiat;
  setSelectedFiat: (fiat: IFiat) => void;
  reFetchInfo: () => void;
  onChange: (value: any) => void;
}) {

  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const activeTextColor = useColorModeValue("#333333", "");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");
  const [showMobile,setShowMobile] = useState({show:false,tab:0});
  const [selectedAssetLocalStore, setSelectedAssetLocalStore] =
  useLocalStorage<IFiat>("selectedFiat", selectedFiat);
  const {t} = useTranslation()
  // const CustomModal = lazy(() => import("../../../../components/Modals/CustomModal"));
  
  const [openModal, setOpenModal] = useState(false);

  const paymentMethods = useSelector(
    (state: RootState) => state.user.paymentMethods
  );
  useEffect(() => {
    if (selectedAssetLocalStore) {
      setSelectedFiat(selectedAssetLocalStore);
    }
  }, []);


  
    return (
      <>
      {isMobileDevice ? null : (
        <Flex
        my='40px'
        justifyContent='space-between'
        flexDirection="row"
      >
        <Flex flexDirection="row">
          <Box mr={["0", "0", "30px"]} color={textColor}>
            <Text mb='12px'>{t('fiat_currency')}</Text>
         
            <Flex
                mt={{ base: 2 }}
                px={{ base: 2 }}
                className='FIatCurrency'
                alignItems='center'
                justifyContent='space-between'
                h='45px'
                border='1px'
                borderColor={borderColor}
                borderRadius='4px'
                onClick={() => setOpenModal(true)}
                cursor='pointer'
              >
                <Text
                  color={selectedFiat ? activeTextColor : inactiveTextColor}
                  fontSize='14px'
                  display="flex"
                >
                  {selectedFiat.logo !== "" && <Img
    src={selectedFiat.logo}
    width="24px"
    height="20px"
    mr="10px"
    mt="0px"
     alt={selectedFiat?.name?.slice(0,2)} />} {selectedFiat.currency}
                </Text>
                <ChevronDownIcon color={inactiveTextColor} />
              </Flex>
            <CustomModal
              data={fiatCurrencies}
              isOpen={openModal}
              onClose={setOpenModal}
              selectedItem={selectedFiat}
              setSelectedItem={(country:IFiat)=>{
                setSelectedFiat(country)
                setSelectedAssetLocalStore(country);
              }}
              placeholder="Search for currency"
              title="Select Currency"
            />
            
          </Box>
          <Box mr={["0", "0", "30px"]} mt={["30px", "0", "0"]} color={textColor}>
    <Text mb='12px'>{t('amount')}</Text>
            <InputGroup className="Amount">
            
              <Input
                type='number'
                h="45px"
                placeholder={t('p_amt')}
                borderColor={borderColor}
                onChange={(value) => onChange(value)}
              />
               {/* <InputRightElement children={<Box color="#DCE6EF" borderRadius="4px" border="1px solid #324D68">{selectedFiat.currency}</Box>} /> */}
              <InputRightAddon children={t('search')} background="transparent" border="1px"  h="45px" borderColor={borderColor} color="#4CAFFF"/> 
            </InputGroup>
          </Box>
          <Box mr={["0", "0", "30px"]} mt={["30px", "0", "0"]} color={textColor}>
            <Text mb='12px'>{t('payment_method')}</Text>
            <Menu>
              <MenuButton
               className="PayMethod"
                variant='ghost'
                as={Button}
                transition='all 0.2s'
                rightIcon={<ChevronDownIcon />}
                fontWeight={400}
                h="45px"
                _focus={{ color: "#319EF6" }}
                fontSize='13px'
                textTransform={"capitalize"}
                border={`1px solid ${borderColor}`}
                width='200px'
                textAlign='left'
              >
                <Box>{t('payment_method')}</Box>
              </MenuButton>
              <MenuList>
                {paymentMethods?.map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Box mt='35px'>
          <Button
            borderRadius='4px'
            width='153px'
            border={`1px solid ${borderColor}`}
            background='transparent'
            color={textColor}
            h="45px"
            fontSize='14px'
            display={["none", "none", "block"]}
            onClick={() => reFetchInfo()}
          >
            <Flex justifyContent="center">
                 <RefreshIcon /> <Text mt="1px">{t('refresh')}</Text>
            </Flex>
         
          </Button>
        </Box>
      </Flex>
      )

      }
      </>
      
    ); 
  
  
}
