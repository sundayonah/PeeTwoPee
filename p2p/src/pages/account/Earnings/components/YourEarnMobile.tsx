import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Text,
  Heading,
  Tooltip,
  Button,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { shortenAddress } from "../../../../utils";
import { ethers } from "ethers";
import CountDown from "./CountDownTimer";
import { useTranslation } from "react-i18next";

interface EarnProps {
  earnList: { prgpTokenAllowance: string; prgpTokenBalance: string }[];
  userData: any;
  claimpRGP: () => void;

  userInfo: any;
  TimeFrame: number;
  openStakeModal: () => void;
  claimReward: () => void;
  currentEvent: string;
}

const YourEarnMobile = ({
  earnList,
  userData,
  claimpRGP,
  userInfo,
  TimeFrame,
  openStakeModal,
  claimReward,
  currentEvent,
}: EarnProps) => {
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const background = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const getDtae = (_: any) => {
    return new Date(parseFloat(_)).toLocaleString().split(",").join(" | ");
  };

  const [remainingTime, setRemainingTime] = useState(0);
  const [timerComplete, setTimerComplete] = useState(false);
  const {t} = useTranslation()

  useEffect(() => {
    const endTime = TimeFrame + parseFloat(currentEvent);
    const endTimeDate = new Date(endTime * 1000);

    const currentTime = new Date();

    if (currentTime.getTime() > endTimeDate.getTime()) {
      setRemainingTime(0);
    } else if (currentTime.getTime() < endTimeDate.getTime()) {
      setRemainingTime(endTimeDate.getTime() - currentTime.getTime());
    }
  }, [TimeFrame, userInfo?.timeDeposit, currentEvent, timerComplete]);

  return (
    <>
      <Text mb={3} fontWeight={"700"} fontSize={"14px"} mt={6}>
        {t("y_earn")}
      </Text>
      {!earnList ? (
        [1, 2, 3, 4].map((earning: any, index: number) => (
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
      ) : earnList?.length === 0 ? (
        <div>No Staking Info yet</div>
      ) : (
        earnList?.map((earning: any, index: number) => (
          <>
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
              <Flex justifyContent='space-between'>
                <Flex>
                  <Text as='p' fontSize='14px'>
                    S/N
                  </Text>
                </Flex>
                {/* <Text as='p'>{allRecords?.indexOf(earning) + 1}</Text> */}
              </Flex>
              <Text color={textColour2} my='7px'>
                {1}
              </Text>
              <Box my='20px'>
                <Flex justifyContent='space-between' color={textColour2}>
                  <Text>{t('un')}</Text>
                  <Text>{t("rew_bal")}</Text>
                </Flex>
                <Flex
                  justifyContent='space-between'
                  color={textColor}
                  fontWeight='500'
                  mt='5px'
                >
                  <Text>
                    {/* {earning.username === null ? "--" : earning.username} */}
                    {userData?.username ? userData.username : "--"}
                  </Text>
                  <Flex
                    justifyContent='space-between'
                    color={textColor}
                    fontWeight='500'
                    mt='5px'
                  >
                    {userInfo?.acruedReward
                      ? ethers.utils.formatEther(
                          userInfo?.acruedReward.toString()
                        )
                      : "0"}{" "}
                    pRGP
                  </Flex>
                </Flex>
              </Box>

              <Box my='10px'>
                <Flex justifyContent='space-between' color={textColour2}>
                  <Text>{t("amt_staked")}</Text>
                  <Text>{t("staking_countdown")}</Text>
                </Flex>
                <Flex
                  justifyContent='space-between'
                  color={textColor}
                  fontWeight='500'
                  mt='5px'
                >
                  <Text fontSize='14px'>
                    {userInfo?.amountDeposit
                      ? ethers.utils.formatEther(
                          userInfo?.amountDeposit.toString()
                        )
                      : "0"}{" "}
                    pRGP
                  </Text>
                  <CountDown
                    setTimerComplete={() => setTimerComplete(!timerComplete)}
                    secs={remainingTime}
                  />
                </Flex>
              </Box>

              <Flex mt={5} justifyContent={"center"}>
                <Button
                  onClick={() => {
                    if (
                      parseFloat(userInfo?.amountDeposit.toString()) !== 0 &&
                      remainingTime === 0
                    ) {
                      claimReward();
                    } else {
                      claimpRGP();
                    }
                  }}

                  // variant={"outline"}
                >
                  {parseFloat(userInfo?.amountDeposit.toString()) !== 0 &&
                  remainingTime === 0
                    ? "Claim Reward"
                    : `${t("claim")} pRGP`}
                </Button>
                <Button
                  ml={3}
                  variant={"brand"}
                  onClick={() => {
                    openStakeModal();
                  }}
                >
                  {t("stae")} pRGP
                </Button>
              </Flex>
            </Box>
          </>
        ))
      )}
    </>
  );
};
export default YourEarnMobile;
