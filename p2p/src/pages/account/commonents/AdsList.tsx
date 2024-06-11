import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Switch,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
//import { FETCH_ORDER_RECORDS, FETCH_ORDER_PER_USER } from "../gql/queries";
import { DELETE_ADS, CHANGE_ADS_STATUS } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import DeleteAd from "../modals/DeleteAd";
import moment from "moment";
import { addToast } from "../../../components/Toast/toastSlice";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useCombinedActiveList } from "../../../state/lists/hooks";
import { CONTRACT_ADDRESSES } from "../../../utils/addresses";
import { formatDecimalNumber, weiToToken } from "../../../utils/functions/util";
import { ERC20Token } from "../../../utils";
import NoOrder from "../../../components/NOOrder";
import { useTranslation } from "react-i18next";

const AdsList = ({
  userAds,
  setItemId,
  setOpenDeleteAd,
  loading,
  setrefetchCounter,
}: {
  userAds: any;
  setItemId?: any;
  setOpenDeleteAd?: any;
  loading?: boolean;
  setrefetchCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const { chainId, library, account } = useActiveWeb3React();
  let navigate = useNavigate();
  const { t } = useTranslation()

  const [adsAllowances, setadsAllowances] = useState({});

  const allTokens = useCombinedActiveList();

  const [changeAdsStatus, { data }] = useMutation(CHANGE_ADS_STATUS, {
    onCompleted: (data) => {
      if (data?.changeAdsStatus.status === true) {
        setrefetchCounter((prev) => prev + 1);
      }
    },
  });

  const allowanceFinder = async () => {
    const xyz = userAds;
    const p2pAddress = CONTRACT_ADDRESSES[chainId.toString()].P2P;
    const tokenByChain = allTokens[chainId];
    let allowances = {};
    let tokenInfo;
    for (let index = 0; index < xyz?.length; index++) {
      const ads = xyz[index];
      for (const key of Object.keys(tokenByChain)) {
        tokenInfo = tokenByChain[key]?.token?.tokenInfo;
        if (tokenInfo?.symbol == ads.asset) {
          break;
        }
      }
      if (tokenInfo?.symbol == ads.asset) {
        const RigelToken = await ERC20Token(tokenInfo?.address, library);
        const allowance = await RigelToken.allowance(account, p2pAddress);
        allowances[tokenInfo?.symbol] = weiToToken(allowance.toString());
      }
    }
    setadsAllowances(allowances);
  };

  useEffect(() => {
    // dispatch(setAdsTotal({ adsTotal: data && data.fetchOrderPerUser?.total }));
  });

  useEffect(() => {});

  useEffect(() => {
    allowanceFinder();
  }, [userAds, chainId, account]);

  // useEffect(() => {
  //   refetch();
  // }, [chainId, account]);
  const getDtae = (_: any) => {
    return new Date(parseFloat(_)).toLocaleString();
  };

  return (
    <>
      {userAds?.length === 0 ? (
        <>
          <NoOrder
            text={t('No Ads Available')}
            subText={t('No Ads Available')}
            button='ads'
          />
        </>
      ) : (
        <TableContainer fontSize={14} mt={6}>
          <Table size='lg' variant='simple'>
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
            {loading ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <Tbody key={item}>
                    <Tr py='20px'>
                      <Td>
                        <SkeletonText
                          noOfLines={1}
                          my='1px'
                          spacing='0'
                          width='120px'
                        />
                        <SkeletonText noOfLines={1} mt='20px' width='80px' />
                      </Td>
                      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <Td>
                          <SkeletonText
                            noOfLines={1}
                            my='1px'
                            spacing='0'
                            width='80px'
                          />
                        </Td>
                      ))}
                    </Tr>
                  </Tbody>
                ))}
              </>
            ) : (
              <Tbody>
                {userAds &&
                  userAds?.map((order: any) => {
                    return (
                      <Tr>
                        <Td>
                          <Flex mt={3} direction={"column"}>
                            <Box>{t('crypto')}: {order.asset} </Box>
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
                            {adsAllowances[order.asset]
                              ? formatDecimalNumber(adsAllowances[order.asset])
                              : "0"}{" "}
                            {order.asset}
                          </Text>
                        </Td>
                        <Td>
                          <Flex mt={3} direction={"column"}>
                            <Box>
                              {moment(parseFloat(order.createdAt)).format(
                                moment.HTML5_FMT.DATE
                              )}
                            </Box>
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
                                onClick={(event) => {
                                  navigate(`/postad/${order._id}`);
                                }}
                              >
                                {t('edit')}
                              </button>
                              <Text mx={2}>| </Text>
                              <button
                                style={{
                                  cursor: "pointer",
                                  background: "none",
                                }}
                                onClick={() => {
                                  setOpenDeleteAd(true);
                                  setItemId(order._id);
                                }}
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
                                  onChange={(event) => {
                                    changeAdsStatus({
                                      variables: {
                                        status: event.target.checked
                                          ? true
                                          : false,
                                        id: order._id,
                                      },
                                    });
                                  }}
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
            )}
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default AdsList;
