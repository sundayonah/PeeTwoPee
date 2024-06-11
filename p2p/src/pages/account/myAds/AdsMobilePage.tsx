import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  SkeletonText,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import NoOrder from "../../../components/NOOrder";
import { formatMongodbTime } from "../../../utils";
import { CHANGE_ADS_STATUS } from "../gql/mutations";

const AdsMobilePage = ({
  userAds,
  setItemId,
  setOpenDeleteAd,
  setrefetchCounter,
}: {
  userAds: any;
  setItemId?: any;
  setOpenDeleteAd?: any;
  setrefetchCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const background = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const [changeAdsStatus] = useMutation(CHANGE_ADS_STATUS, {
    onCompleted: (data) => {
      if (data?.changeAdsStatus.status === true) {
        setrefetchCounter((prev) => prev + 1);
      }
    },
  });
  let navigate = useNavigate();
  const { t } = useTranslation()
  return (
    <>
      {!userAds ? (
        [1, 2, 3, 4].map((trade: any, index: number) => (
          <Box
            w={["100%", "100%", "310px"]}
            minH='60px'
            key={index}
            borderRadius='6px'
            border='1px solid '
            borderColor={borderColor}
            m={["10px auto", "20px auto", "30px 11px"]}
            p={["20px 15px 10px 15px"]}
            background={background}
            fontSize='12px'
          >
            {[1, 2, 3, 4].map((item, index) => {
              if (item === 2) {
                return <SkeletonText noOfLines={1} width='80px' />;
              } else {
                return (
                  <Box my='20px'>
                    <Flex justifyContent='space-between' color={textColour2}>
                      <SkeletonText noOfLines={1} width='100px' />
                      <SkeletonText noOfLines={1} width='100px' />
                    </Flex>
                    <Flex
                      justifyContent='space-between'
                      color={textColor}
                      fontWeight='500'
                      mt='12px'
                    >
                      <SkeletonText noOfLines={1} width='120px' />
                      <SkeletonText noOfLines={1} width='120px' />
                    </Flex>
                  </Box>
                );
              }
            })}
          </Box>
        ))
      ) : userAds?.length === 0 ? (
        <NoOrder
          text={t('no_ads')}
          subText={t('no_ads_text')}
          button='ads'
        />
      ) : (
        userAds.map((trade: any, index: number) => (
          <Box
            w={["100%", "100%", "310px"]}
            minH='60px'
            key={index}
            borderRadius='6px'
            border='1px solid '
            borderColor={borderColor}
            m={["10px auto", "20px auto", "30px 11px"]}
            p={["20px 15px 10px 15px"]}
            background={background}
            fontSize='12px'
          >
            <Box my='15px'>
              <Flex justifyContent='space-between' color={textColour2} mb='4px'>
                <Text as='p' fontSize='14px'>
                  {t('currencies')}
                </Text>
                <Text as='p'>{t('date')}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  {t('crypto')}: {trade?.asset}
                </Text>
                <Text as='p'>
                  {formatMongodbTime(trade.createdAt, true, "date")}
                </Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  {t('fiat')}: {trade?.fiat}
                </Text>
                <Text as='p'>
                  {formatMongodbTime(trade.createdAt, true, "time")}
                </Text>
              </Flex>
            </Box>
            <Box my='15px'>
              <Flex justifyContent='space-between' color={textColour2} mb='4px'>
                <Text as='p' fontSize='14px'>
                  {t('quantity')}
                </Text>
                <Text as='p'>{t('trade_limits')}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  {t('crypto')}: {trade?.crypto_amount} {trade?.asset}
                </Text>
                <Text as='p'>
                  {trade.limit_min} - {trade.limit_max} {trade?.fiat}
                </Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  Fiat: {trade?.fiat}
                </Text>
                <Text as='p'>
                  {formatMongodbTime(trade.createdAt, true, "time")}
                </Text>
              </Flex>
            </Box>
            <Box my='15px'>
              <Flex justifyContent='space-between' color={textColour2} mb='4px'>
                <Text as='p' fontSize='14px'>
                  {t('trade_limits')}
                </Text>
                <Text as='p'>{t('actions')}</Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  {trade?.type}
                </Text>
                <Text as='p'>
                  <Flex fontSize={14}>
                    <button
                      style={{ cursor: "pointer", background: "none" }}
                      onClick={(event) => {
                        navigate(`/postad/${trade._id}`);
                      }}
                    >
                      {t('edit')}
                    </button>
                    <Text mx={2}>| </Text>
                    <button
                      style={{ cursor: "pointer", background: "none" }}
                      onClick={() => {
                        setOpenDeleteAd(true);
                        setItemId(trade._id);
                      }}
                    >
                      {t('delete')}
                    </button>
                  </Flex>
                </Text>
              </Flex>
            </Box>
            <Box my='15px'>
              <Flex justifyContent='space-between' color={textColour2} mb='4px'>
                <Text as='p' fontSize='14px'>
                  {t('price')}
                </Text>
              </Flex>
              <Flex
                justifyContent='space-between'
                color={textColor}
                fontWeight='500'
              >
                <Text as='p' fontSize='14px'>
                  {trade?.price} {trade?.fiat}/{trade?.asset}
                </Text>
                <Text as='p'>
                  <Flex fontSize={14} mt='-10px'>
                    <Switch
                      size='sm'
                      mx={4}
                      mt={1}
                      onChange={(event) => {
                        changeAdsStatus({
                          variables: {
                            status: event.target.checked ? true : false,
                            id: trade._id,
                          },
                        });
                      }}
                      isChecked={trade.status === "online"}
                    />
                    <Text cursor={"pointer"}>
                      {trade.status == "online" ? t('online') : "OFFLINE"}
                    </Text>
                  </Flex>
                </Text>
              </Flex>
            </Box>
          </Box>
        ))
      )}
    </>
  );
};

export default AdsMobilePage;
