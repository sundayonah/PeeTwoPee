import { useState, useEffect } from "react";
import { Box, Flex, useColorModeValue, Text, Button } from "@chakra-ui/react";
import CountDown from "./CountDownTimer";
import { useQuery } from "@apollo/client";
import { USERBYADDRESS } from "../../../Wallet/gql/query";
import { ethers } from "ethers";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";

const EarnMobileBody = ({
  userInfo,
  index,
  remainingTime,
  openStakeModal,
  claimReward,
  claimpRGP,
}: {
  userInfo: any;
  index: number;
  remainingTime: number;
  openStakeModal: () => void;
  claimReward: () => void;
  claimpRGP: () => void;
}) => {
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const background = useColorModeValue("white", "#213345");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const { account } = useActiveWeb3React();
  const {t} = useTranslation()
  const [userData, setuserData] = useState<any>();
  useQuery(USERBYADDRESS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data?.userByAddress.status === true) {
        if (data?.userByAddress.status === true) {
          setuserData(data?.userByAddress.user);
        }
      }
    },
    variables: {
      address: userInfo?.user,
    },
  });
  return (
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
        </Flex>
        <Text color={textColour2} my='7px'>
          {index + 1}
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
            <Text>{userData?.username ? userData.username : "--"}</Text>
            <Flex
              justifyContent='space-between'
              color={textColor}
              fontWeight='500'
              mt='5px'
            >
              {userInfo?.acruedReward
                ? ethers.utils.formatEther(userInfo?.acruedReward.toString())
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
                ? ethers.utils.formatEther(userInfo?.amountDeposit.toString())
                : "0"}{" "}
              pRGP
            </Text>
            --
          </Flex>
        </Box>
        {/* 
        <Flex
          display={account === userInfo?.user ? undefined : "none"}
          mt={5}
          justifyContent={"center"}
        >
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
          >
            {parseFloat(userInfo?.amountDeposit.toString()) !== 0 &&
            remainingTime === 0
              ? "Claim Reward"
              : "{t("claim")} pRGP"}
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
        </Flex> */}
      </Box>
    </>
  );
};

export default EarnMobileBody;
