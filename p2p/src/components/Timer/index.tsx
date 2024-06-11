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
  const [seconds, setSecs] = useState<string | number>("00");
  const [total, setTotal] = useState<number>(10);
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
    setTotal(total);
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
    // setSecs(secs);
  }, [secs]);
  useEffect(() => {
    if (total<=0) {
      if (updateUI) updateUI();
    }
  }, [seconds]);

  return (
    <Flex className="TimerBox" >
      <Flex
        justifyContent="center"
        alignItems="center"
        width={["30px","30px","40px"]}
        height={["30px","30px","40px"]}
        fontSize={["14px","14px","16px"]}
        background={
         total<=0 ? "#CC334F" : "#3CB1D2"
        }
        color="white"
        borderRadius="4px"
      >
        {minutes}
      </Flex>
      <Box mx={2} fontSize={["16px","16px","20px"]} mt={0}>
        :
      </Box>
      <Flex
      
        justifyContent="center"
        alignItems="center"
        width={["30px","30px","40px"]}
        height={["30px","30px","40px"]}
        fontSize={["14px","14px","16px"]}
        background={
         total<=0 ? "#CC334F" : "#3CB1D2"
        }
        borderRadius="4px"
        data-testid="secs"
        color="white"
      >
        {seconds}
      </Flex>
    </Flex>
  );
}
