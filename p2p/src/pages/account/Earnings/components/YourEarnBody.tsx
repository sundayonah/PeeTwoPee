import { useEffect, useState } from "react";
import {
  Tbody,
  Tr,
  Td,
  Text,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import StakeModal from "../../../../components/Modals/EarnPage/StakeModal";
import CountDown from "./CountDownTimer";
import { useTranslation } from "react-i18next";

// [{rewardTokenAllowance: string, rewardTokenBalance: string}]

interface EarnBodyProps {
  earnData: { prgpTokenAllowance: string; prgpTokenBalance: string };
  userData: any;
  claimpRGP: () => void;

  userInfo: any;
  TimeFrame: number;
  openStakeModal: () => void;
  claimReward: () => void;
  currentEvent: string;
  buttonText: boolean;
}

function YourEarnBody({
  openStakeModal,
  userData,
  claimpRGP,
  earnData,
  userInfo,
  buttonText,
  TimeFrame,
  claimReward,
  currentEvent,
}: EarnBodyProps) {


  const [remainingTime, setRemainingTime] = useState(0);
  const [timerComplete, setTimerComplete] = useState(false);

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
  const {t} = useTranslation()

  return (
    <>
      <Tbody>
        <Tr>
          <Td>
            <Text fontSize='14px'>-</Text>
          </Td>
          <Td>
            <Text fontSize='14px'>
              {userData?.username ? userData.username : "--"}
            </Text>
          </Td>
          <Td>
            <Text fontSize='14px'>
              {userInfo?.acruedReward
                ? ethers.utils.formatEther(userInfo?.acruedReward.toString())
                : "0"}{" "}
              pRGP
            </Text>
          </Td>
          <Td>
            <Text fontSize='14px'>
              {userInfo?.amountDeposit
                ? ethers.utils.formatEther(userInfo?.amountDeposit.toString())
                : "0"}{" "}
              pRGP
            </Text>
          </Td>
          <Td>
            <Text fontSize='14px'>
              {remainingTime > 0 ? (
                <CountDown
                  setTimerComplete={() => setTimerComplete(!timerComplete)}
                  secs={Math.round(remainingTime / 1000)}
                />
              ) : (
                "0d : 0h : 0m : 0s"
              )}
            </Text>
          </Td>

          <Td>
            <Flex>
              <Button
                onClick={() => {
                  if (buttonText) {
                    claimReward();
                  } else {
                    claimpRGP();
                  }
                }}
                my={3}
                // variant={"outline"}
                isFullWidth
                disabled={parseInt(userInfo.acruedReward) <= 0 && !buttonText ? true:false}
              >
                {buttonText
                  ? "Claim Reward"
                  : `${t("claim")} pRGP`}
              </Button>
              <Button
                ml={3}
                my={3}
                variant={"brand"}
                onClick={() => {
                  openStakeModal();
                }}
                disabled= {parseInt(earnData.prgpTokenBalance) <= 0 ? true : false}
                isFullWidth
              >
                {t("stae")} pRGP
              </Button>
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </>
  );
}

export default YourEarnBody;
