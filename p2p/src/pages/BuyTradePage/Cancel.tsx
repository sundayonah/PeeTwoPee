import { InfoOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import InformationTag from "../../components/InformationTag";
import { FETCH_USER_BY_ADDRESS } from "../Home/gql/mutations";
import { useQuery } from "@apollo/client";
import { ITradeInfo } from "../../utils/hooks/useOrder";
import { useState } from "react";
import { ParseFloat } from "../../utils";
import { useTranslation } from "react-i18next";

type IPayment = {
  tradeInfo: ITradeInfo;
};

export default function Cancel({
  tradeInfo,
}: //   setTransactionState,
IPayment) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColor = useColorModeValue("#333333", "#fff");
  const cancelledText = useColorModeValue("#FF3358", "#FF3358");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");

  //   const backgroundColor = useColorModeValue("#F2F5F8", "#213345");

  const [toUser, settoUser] = useState<any>();
  const [fromUser, setFromUser] = useState<any>();
  const {
    loading: toLoading,
    data: toData,
    error: toError,
  } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: tradeInfo?.to,
    },
    onCompleted: (data) => {
      settoUser(data?.userByAddress.user);
    },
    fetchPolicy: "no-cache",
  });

  const {
    loading: fromLoading,
    data: fromData,
    error: fromError,
  } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: tradeInfo?.from,
    },
    onCompleted: (data) => {
      setFromUser(data?.userByAddress.user);
    },
    fetchPolicy: "no-cache",
  });
  const { t } = useTranslation()

  return (
    <Box minWidth='100%'>
      <Flex my={3}>
        {!isMobileDevice && <InformationTag />}
        <Box w='100%' ml={[0, 0, 4]} mt={-1}>
          <Text color={textColor} fontSize='16px' fontWeight='500'>
            {t('trade_detail')} <InfoOutlineIcon ml={2} />
          </Text>
          <Box my={5}>
            <Flex flexDirection={"column"}>
              <Flex w='100%' justifyContent={"space-between"}>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('quantity')}</Text>
                    <Text fontWeight={"500"} mt={5}>
                      {ParseFloat(tradeInfo?.crypto_amount, 4)}{" "}
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        {tradeInfo?.asset}
                      </span>
                    </Text>
                  </Flex>
                  <Flex mt={10} flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('seller')}</Text>
                    <Text fontWeight={"500"} mt={5}>
                      {fromUser?.username ? fromUser?.user : fromUser?.fullname}
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('price')}</Text>
                    <Text fontWeight={"500"} mt={5}>
                      {tradeInfo?.price}{" "}
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        {tradeInfo?.fiat}/{tradeInfo?.asset}
                      </span>
                    </Text>
                  </Flex>
                  <Flex mt={10} flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('buyer')}</Text>
                    <Text fontWeight={"500"} mt={5}>
                      {toUser?.username ? toUser?.user : toUser?.fullname}
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDirection={"column"}>
                  <Flex flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('amount')}</Text>
                    <Text fontWeight={"500"} mt={5}>
                      {tradeInfo?.crypto_amount * tradeInfo?.price}{" "}
                      <span style={{ fontSize: "14px", fontWeight: "400" }}>
                        {tradeInfo?.fiat}
                      </span>
                    </Text>
                  </Flex>
                  <Flex mt={10} flexDirection={"column"}>
                    <Text fontSize={"14px"}>{t('status')}</Text>
                    <Text color={cancelledText} fontWeight={"500"} mt={5}>
                      {t('cancelled')}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Flex my={3}>
        {!isMobileDevice && <InformationTag />}
        <Box w='100%' ml={[0, 0, 4]} mt={-1}>
          <Text color={textColor} fontSize='16px' fontWeight='500'>
            {t('payment_detail')} <InfoOutlineIcon ml={2} />
          </Text>
          <Box my={6}>
            <Flex flexDirection={"column"}>
              <Flex
                borderRadius={"4px"}
                pl={2}
                py={4}
                bgColor={backgroundColor}
              >
                <Text>{t('bank_transfer')}</Text>
              </Flex>
              <Flex
                justifyContent={"space-between"}
                w={isMobileDevice ? "100%" : "80%"}
              >
                <Flex mt={10} flexDirection={"column"}>
                  <Text fontSize={"14px"}>{t('bank_name')}</Text>
                  <Text fontWeight={"500"} mt={5}>
                    {fromUser?.banks[0].bank_name}
                  </Text>
                </Flex>

                <Flex mt={10} flexDirection={"column"}>
                  <Text fontSize={"14px"}>{t('acct_name')}</Text>
                  <Text fontWeight={"500"} mt={5}>
                    {fromUser?.banks[0].account_name}
                  </Text>
                </Flex>

                <Flex mt={10} flexDirection={"column"}>
                  <Text fontSize={"14px"}>{t('acct_no')}</Text>
                  <Text fontWeight={"500"} mt={5}>
                    {fromUser?.banks[0].account_number}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
