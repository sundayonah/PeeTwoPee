import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import CountDown from "./CountDownTimer";
import { useLazyQuery } from "@apollo/client";
import { USERBYADDRESS } from "../../../Wallet/gql/query";
import EarnMobileBody from "./EarnMobileBody";

interface EarnProps {
  openStakeModal: () => void;
  claimpRGP: () => void;
  allInfo: any[];
  claimReward: () => void;
  currentEvent: string;
  TimeFrame: number;
}

const EarningMobilePage = ({
  openStakeModal,
  claimpRGP,
  allInfo,
  claimReward,
  currentEvent,
  TimeFrame,
}: EarnProps) => {
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const background = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const getDtae = (_: any) => {
    return new Date(parseFloat(_)).toLocaleString().split(",").join(" | ");
  };

  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const totalTime = TimeFrame + parseFloat(currentEvent) * 1000;
    const currentTime = new Date().getTime();

    const time = totalTime - currentTime;

    if (time > 0) {
      setRemainingTime(time);
    } else {
      setRemainingTime(0);
    }
  }, [TimeFrame, currentEvent]);

  // const [userData, setuserData] = useState<any>();

  return (
    <>
      <Text mb={3} fontWeight={"700"} fontSize={"14px"} mt={6}>
        {t("30_earn")}
      </Text>
      {!allInfo ? (
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
      ) : allInfo?.length === 0 ? (
        <div>{t("no_earn")}</div>
      ) : (
        allInfo.map((userInfo: any, index: number) => (
          <EarnMobileBody
            userInfo={userInfo}
            index={index}
            remainingTime={remainingTime}
            openStakeModal={openStakeModal}
            claimReward={claimReward}
            claimpRGP={claimpRGP}
          />
        ))
      )}
    </>
  );
};
export default EarningMobilePage;
