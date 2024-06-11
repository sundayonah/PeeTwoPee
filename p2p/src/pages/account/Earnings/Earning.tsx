import {
  Box,
  Flex,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  useMediaQuery,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { useEffect, useState, useCallback } from "react";
import Earnings from "./Earnings";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

import { useQuery } from "@apollo/client";

import { useActiveWeb3React } from "../../../utils/hooks";

import YourEarnings from "./YourEarnings";

import { setSellSelectedAsset } from "../../../state/order";

import { useFetchEarnData } from "../../../utils/hooks/useFetchEarnData";
import { USERBYADDRESS } from "../../Wallet/gql/query";
import useGetCurrentEvent from "../../../utils/hooks/useGetCurrentEvent";
import { setOpenModal } from "../../../state/application";
import { TrxState } from "../../../state/application";

import {
  CONTRACT_ADDRESSES,
  RigelDecentralizedP2PSystemContract,
  RigelDecentralizedRewardSystem,
} from "../../../utils";
import { ethers } from "ethers";
import StakeModal from "../../../components/Modals/EarnPage/StakeModal";
import { CheckIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const chainName = { 97: "BSC", 56: "BSC", 8001: "MATIC", 137: "MATIC" };

const Earning = () => {
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const prevActiveBorder = useColorModeValue("#CCCCCC", "#4A739B");
  const prevInactiveBgColor = useColorModeValue("#F2F5F8", "#213345");
  const prevInactiveColor = useColorModeValue("#999999", "#7599BD");
  const prevActiveBgColor = useColorModeValue("#F2F5F8", "#213345");
  const nextBgColor = useColorModeValue("#319EF6", "#4CAFFF");
  const dispatch = useDispatch();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const { chainId, account, library } = useActiveWeb3React();
  const [tabIndex, setTabIndex] = useState(0);
  const [userData, setuserData] = useState<any>();
  const [openStakeModal, setopenStakeModal] = useState(false);
  const [reload, setReload] = useState(1);

  const { currentEvent, allEvents } = useGetCurrentEvent(reload);

  const {t} = useTranslation()
  const [selectedEvent, setselectedEvent] = useState("");
  const [buttonText, setbuttonText] = useState(false);
  const [selectedEventInfo, setselectedEventInfo] = useState<{
    value: string;
    endTime: string;
    startTime: string;
  }>();
  const [eventId, seteventId] = useState<number>();

  useEffect(() => {
    if (allEvents?.length > 0) {
      setselectedEventInfo(allEvents[allEvents.length - 1]);
      seteventId(allEvents.length);
      setselectedEvent(allEvents[allEvents.length - 1].value);
    }
  }, [allEvents]);

  const {} = useQuery(USERBYADDRESS, {
    fetchPolicy: "no-cache",
    variables: {
      address: account,
    },
    onCompleted: (data) => {
      if (data?.userByAddress.status === true) {
        setuserData(data?.userByAddress.user);
      }
    },
  });

  // const [selectedAsset, setSelectedAsset] = useState<string>();

  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const navColor = useColorModeValue("#666666", "#fff");

  const setSelectedAsset = (asset) => {
    dispatch(setSellSelectedAsset({ asset }));
  };

  const switchEvent = (prev: boolean) => {
    if (prev == true) {
      if (eventId !== 1) {
        setselectedEventInfo(allEvents[eventId - 2]);
        setselectedEvent(allEvents[eventId - 2].value);
        seteventId((prev) => prev - 1);
      }
    } else {
      if (allEvents?.length !== eventId) {
        setselectedEventInfo(allEvents[eventId]);
        seteventId((prev) => prev + 1);
        setselectedEvent(allEvents[eventId].value);
      }
    }
  };

  const { data, userInfo, TimeFrame, allInfo } = useFetchEarnData(
    selectedEvent,
    reload
  );


  const claimpRGP = async () => {
    try {
      dispatch(
        setOpenModal({
          message: `Requesting for access from your wallet`,
          trxState: TrxState.WaitingForConfirmation,
        })
      );

      const p2pContract = await RigelDecentralizedP2PSystemContract(
        CONTRACT_ADDRESSES[chainId as number]["P2P"],
        library
      );

      const withdrawTx = await p2pContract.withdrawReward();

      const { confirmations } = await withdrawTx.wait();

      if (confirmations >= 1) {
        setReload((prev) => prev + 1);
        dispatch(
          setOpenModal({
            message: `Transaction Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
      }
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  const claimReward = async () => {
    try {
      dispatch(
        setOpenModal({
          message: `Requesting for access from your wallet`,
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const poolContract = await RigelDecentralizedRewardSystem(
        CONTRACT_ADDRESSES[chainId as number]["REWARD"],
        library
      );

      const claimTx = await poolContract.claimReward(selectedEvent, {
        from: account,
      });

      const { confirmations } = await claimTx.wait();

      if (confirmations >= 1) {
        setReload((prev) => prev + 1);
        dispatch(
          setOpenModal({
            message: `Transaction Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
      }
      setbuttonText(false)
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  const stake = async (stakeValue: string) => {
    try {
      dispatch(
        setOpenModal({
          message: `Requesting for access from your wallet`,
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const poolContract = await RigelDecentralizedRewardSystem(
        CONTRACT_ADDRESSES[chainId as number]["REWARD"],
        library
      );

      const stakeTx = await poolContract.stake(
        ethers.utils.parseEther(stakeValue),
        {
          from: account,
        }
      );

      // const stakeTx = await poolContract.claimReward("1677138346", {
      //   from: account,
      // });

      const { confirmations } = await stakeTx.wait();

      if (confirmations >= 1) {
        setopenStakeModal(false);
        setReload((prev) => prev + 1);
        dispatch(
          setOpenModal({
            message: `Transaction Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
      }
    } catch (err) {
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  return (
    <>
      <Box
        mx={isMobileDevice ? 0 : 16}
        py={isMobileDevice ? "0px" : 10}
        mb={isMobileDevice ? 20 : 7}
      >
        <Tabs
          defaultIndex={1}
          index={tabIndex}
          onChange={(index) => setTabIndex(index)}
        >
          <TabList
            _active={{ color: "#319EF6" }}
            color={inactiveColour}
            fontWeight={400}
            // marginBottom={"40px"}
            mb={5}
            display={isMobileDevice ? "none" : undefined}
          >
            <Tab
              _focus={{ borderLeft: "none" }}
              fontSize={isMobileDevice ? "14px" : "16px"}
            >
             {t('p2p_earn')}
            </Tab>
          </TabList>

          <Flex
            flexDirection={isMobileDevice ? "column" : undefined}
            w='100%'
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Menu>
              <MenuButton
                fontSize={"14px"}
                w='310px'
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                <Text px={2}>
                  {" "}
                  {selectedEventInfo
                    ? `Event ${eventId} - ${selectedEventInfo?.startTime} to ${selectedEventInfo?.endTime}`
                    : "Select Event"}
                </Text>
              </MenuButton>
              <MenuList w='310px'>
                {allEvents?.map((event: any, index) => (
                  <MenuItem
                    fontSize={"14px"}
                    onClick={() => {
                      setselectedEventInfo(event);
                      seteventId(index + 1);
                      setselectedEvent(event.value);
                    }}
                  >
                    <Flex
                      w='100%'
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Text>{`Event ${index + 1} - ${event?.startTime} to ${
                        event?.endTime
                      }`}</Text>
                      <CheckIcon
                        display={eventId === index + 1 ? undefined : "none"}
                      />
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            {/* <Select
              onChange={(e) => setselectedEvent(e.target.value)}
              w='500px'
              variant='outline'
              value={allEvents[0]?.value}
              // placeholder={`Select Event`}
            >
              {allEvents?.map((event: any, index) => (
                <option value={event?.value}>{`Event ${index + 1} - ${
                  event?.startTime
                } to ${event?.endTime}`}</option>
              ))}
            </Select> */}
            <Flex mt={isMobileDevice ? 5 : ""}>
              <Flex
                borderRadius={"3px"}
                py={2}
                px={3}
                bgColor={
                  eventId === 1 ? prevInactiveBgColor : prevActiveBgColor
                }
                border={eventId === 1 ? "" : `1px solid ${prevActiveBorder}`}
                cursor={"pointer"}
                alignItems={"center"}
                color={eventId === 1 ? prevInactiveColor : ""}
                onClick={() => switchEvent(true)}
              >
                <ChevronLeftIcon w='24px' h='24px' />
                <Text>{t("prev_event")}</Text>
              </Flex>
              <Flex
                borderRadius={"3px"}
                py={2}
                px={3}
                bgColor={nextBgColor}
                cursor={"pointer"}
                ml={5}
                alignItems={"center"}
                color='white'
                onClick={() => switchEvent(false)}
              >
                <Text color='white'>{t("next_event")}</Text>
                <ChevronRightIcon w='24px' h='24px' />
              </Flex>
            </Flex>
          </Flex>

          <TabPanels>
            <TabPanel p='0' pb={4}>
              {/* <Transactions /> */}
              <YourEarnings
                claimpRGP={claimpRGP}
                openStakeModal={() => setopenStakeModal(true)}
                currentEvent={selectedEvent}
                userData={userData}
                data={data}
                buttonText={buttonText}
                TimeFrame={TimeFrame}
                userInfo={userInfo}
                claimReward={claimReward}
              />
              <Earnings
                openStakeModal={() => setopenStakeModal(true)}
                currentEvent={selectedEvent}
                claimpRGP={claimpRGP}
                allInfo={allInfo}
                claimReward={claimReward}
                TimeFrame={TimeFrame}
              />
            </TabPanel>
            <TabPanel p='0' pt={4} pb={4}></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <StakeModal
        stake={stake}
        data={data}
        balance={data?.prgpTokenBalance}
        allowance={data?.prgpTokenAllowance}
        isOpen={openStakeModal}
        onClose={() => setopenStakeModal(false)}
        reload={() => setReload((prev) => prev + 1)}
      />
    </>
  );
};

export default React.memo(Earning);
