import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Timer({
  secs,
  updateUI,
}: {
  secs: string;
  updateUI?: () => void;
}) {
  const Ref = useRef<null | NodeJS.Timer>(null);

  // The state for our timer
  const [minutes, setMins] = useState<string | number>("00");
  const [seconds, setSecs] = useState<string | number>("0");
  const textColor = useColorModeValue("black", "#ffffff");
  const timeColor = useColorModeValue("#319EF6", "#4CAFFF");
  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date() as any);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setMins(minutes > 9 ? minutes : "0" + minutes);
      setSecs(seconds > 9 ? seconds : "0" + seconds);
    }
  };

  const {t} = useTranslation()
  const clearTimer = (e: any) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    if (id) Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + parseInt(secs));
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
    setSecs(secs);
  }, [secs]);
  useEffect(() => {
    if (minutes === "00" && seconds === "00") {
      if (updateUI) {
        updateUI();
      }
    }
  }, [seconds]);

  return (
    <Flex alignItems={"center"}>
      <Text fontSize={"14px"} whiteSpace={"nowrap"} mr={2}>
        {t('otp_req')}
      </Text>

      <Flex
        justifyContent='center'
        alignItems='center'
        color={timeColor}
        borderRadius='4px'
        fontSize={"14px"}
      >
        {minutes}
      </Flex>
      <Box color={timeColor} mx={1} fontSize='14px'>
        :
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        borderRadius='4px'
        data-testid='secs'
        color={timeColor}
        fontSize={"14px"}
      >
        {seconds}
      </Flex>
    </Flex>
  );
}
