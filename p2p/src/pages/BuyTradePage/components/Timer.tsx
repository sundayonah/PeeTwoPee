import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

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
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        background={
          minutes === "00" && seconds === "00" ? "#CC334F" : "#3CB1D2"
        }
        color='white'
        borderRadius='4px'
        fontSize={"14px"}
      >
        {minutes}
      </Flex>
      <Box mx={2} fontSize='20px' mt={1}>
        :
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='30px'
        height='30px'
        background={
          minutes === "00" && seconds === "00" ? "#CC334F" : "#3CB1D2"
        }
        borderRadius='4px'
        data-testid='secs'
        color='white'
        fontSize={"14px"}
      >
        {seconds}
      </Flex>
    </Flex>
  );
}
