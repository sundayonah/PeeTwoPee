import {
  Box,
  Circle,
  Flex,
  Img,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { StatusTag } from "../../../components/TagComponents";

import Rank from "../../../components/Rank";
import { useTranslation } from "react-i18next";

type ISeller = {
  username: string;
  img: string;
  badge: any;
  orderCompleted: number;
  orderPercentage: string;
  status: string;
};
type SellerInfo = {
  seller: ISeller;
};

export default function SellerInformation({ seller }: SellerInfo) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#666666", "#fff");
  const {t} = useTranslation()
  if (isMobileDevice) {
    return (
      <Flex flexDirection='column'>
        
         
          <Flex justifyContent="space-between">
            <Flex>
{seller.img ? ( 
 <Img src={seller.img} data-testid='profilePicture' />):(
 <Circle
            backgroundColor='#319EF6'
            size="50px"
            data-testid='profilePicture'
            color="#15202B"
            fontSize='16px'
            fontWeight="500"
          >
             {seller?.username[0]} 
          </Circle>
          )}
          <Text
              fontSize='14px'
              mx="18px"
              data-testid='profileUsername'
              mt="11px"
              color="#4CAFFF"

            >
              {seller.username.split(" ")[0]}{" "}
              {seller.username.split(" ")[1]?.toUpperCase()}
            </Text>
            <StatusTag status={true} mt='5' />
            </Flex>
         {seller.badge && (
              <Rank rank={seller.badge} margin="10px" />
            )}
            
          </Flex>
          

        
        <Box ml={3} mt='10px'>
          <Flex mt={1}>
            
          </Flex>
          <Text
            color={textColor}
            mt={1}
            fontSize='12px'
            data-testid='profileInformation'
          >
            {seller.orderCompleted} {" "} {t('order(s)')} | {seller.orderPercentage}%
            {" "} {t('completion')}
          </Text>
        </Box>
      </Flex>
    );
  } else {
    return (
      <Flex>
        {seller.img ? (
          <Img src={seller.img} data-testid='profilePicture' />
        ) : (
         <Circle
            backgroundColor='#319EF6'
            size="37px"
            data-testid='profilePicture'
            color="#15202B"
            fontSize='16px'
            mt="6px"
            fontWeight="500"
          >
             {seller?.username[0]} 
          </Circle>
        )}
        <Box ml={3}>
          <Flex mt={1}>
            <Text
              color='#319EF6'
              fontSize='14px'
              mr={2}
              data-testid='profileUsername'
            >
              {seller.username.split(" ")[0]}{" "}
              {seller.username.split(" ")[1]?.toUpperCase()}
            </Text>
            <StatusTag
              status={seller.status === "online" ? true : false}
              mt='2'
              mr="7px"
              
            />
            {seller.badge && (
              <Rank rank={seller.badge} />
            )}
          </Flex>
          <Text
            color={textColor}
            mt={1}
            fontSize='12px'
            data-testid='profileInformation'
          >
            {seller.orderCompleted}{" "} {t('order(s)')} | {seller.orderPercentage}%{" "}
            {t('completion')}
          </Text>
        </Box>
      </Flex>
    );
  }
}
