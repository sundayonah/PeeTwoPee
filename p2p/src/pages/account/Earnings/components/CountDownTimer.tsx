import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export default function CountDown({
  secs,
  setTimerComplete,
}: {
  secs: number;
  setTimerComplete: () => void;
}) {
  const Ref = useRef<null | NodeJS.Timer>(null);
  const [secondsValue, setsecondsValue] = useState<number>(secs);

  //   useEffect(() => {
  //     setsecondsValue(secs);
  //   }, [secs]);

  function calculateTimeLeft() {
    // let init = 1

    const year = new Date().getFullYear();
    const deadline = new Date().getTime() + secondsValue * 1000;

    // setsecondsValue((prev) => prev - 1);
    const difference = +new Date(deadline) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    // init++
    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());

  useEffect(() => {
    if (secondsValue > 0) {
      const id = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
        setsecondsValue((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(id);
      };
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      setTimerComplete();
    }
  }, [secondsValue]);

 

  return (
    <Flex alignItems={"center"}>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        borderRadius='4px'
        fontSize={"14px"}
      >
        {timeLeft?.days > 9 ? timeLeft?.days : `0${timeLeft?.days}`}d
      </Flex>
      <Box fontSize='20px' mb={1}>
        :
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        borderRadius='4px'
        data-testid='secs'
        fontSize={"14px"}
      >
        {timeLeft?.hours > 9 ? timeLeft?.hours : `0${timeLeft?.hours}`}h
      </Flex>
      <Box mx={1} fontSize='20px' mb={1}>
        :
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        borderRadius='4px'
        data-testid='secs'
        fontSize={"14px"}
      >
        {timeLeft?.minutes > 9 ? timeLeft?.minutes : `0${timeLeft?.minutes}`}m
      </Flex>
      <Box mx={1} fontSize='20px' mb={1}>
        :
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        borderRadius='4px'
        data-testid='secs'
        fontSize={"14px"}
      >
        {timeLeft?.seconds > 9 ? timeLeft?.seconds : `0${timeLeft?.seconds}`}s
      </Flex>
    </Flex>
  );
}
