import { useEffect, useState } from "react";
import MultiCall from "@indexed-finance/multicall";
import { CONTRACT_ADDRESSES } from "../addresses";
import { useActiveWeb3React } from "./useActiveWeb3React";
import rewardabi from "../abis/reward.json";
import { formatDate } from "../utilsFunctions";

export default function useGetCurrentEvent(reload: number) {
  const [currentEvent, setCurrentEvent] = useState("");
  const [allEvents, setallEvents] = useState<any[]>();
  const { chainId, library } = useActiveWeb3React();
  useEffect(() => {
    const getEvents = async () => {
      const multi = new MultiCall(library);

      const eventLength = await multi.multiCall(rewardabi, [
        {
          target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
          function: "AllEventLenght",
          args: [],
        },
      ]);

      const timeFrameReq = await multi.multiCall(rewardabi, [
        {
          target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
          function: "timeFrame",
          args: [],
        },
      ]);

      const eventLengthValue = parseFloat(eventLength[1][0].toString());

      const currentEvent = await multi.multiCall(rewardabi, [
        {
          target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
          function: "getAllEventsTime",
          args: [eventLengthValue - 1],
        },
      ]);

      const currentEventValue = currentEvent[1][0].toString();

      const eventArray = [];
      const allEventValue = [];

      for (let i = 0; i < eventLengthValue; i++) {
        eventArray.push(i);
      }

      for (let i = 0; i < eventArray.length; i++) {
        const eventTime = await multi.multiCall(rewardabi, [
          {
            target: CONTRACT_ADDRESSES[chainId as number]["REWARD"],
            function: "getAllEventsTime",
            args: [eventArray[i]],
          },
        ]);

        const totalTime =
          parseFloat(eventTime[1][0].toString()) +
          parseFloat(timeFrameReq[1][0].toString());

        allEventValue.push({
          value: eventTime[1][0].toString(),
          startTime: formatDate(parseFloat(eventTime[1][0].toString()) * 1000),
          endTime: formatDate(totalTime * 1000),
        });
      }

      setallEvents(allEventValue);
      setCurrentEvent(currentEventValue);
    };

    getEvents();
  }, [chainId, reload]);

  return { currentEvent, allEvents };
}
