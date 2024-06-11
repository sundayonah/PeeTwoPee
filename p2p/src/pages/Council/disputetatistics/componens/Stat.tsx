import React from "react";
import { voteType } from "../DisputeStatistics";
import {
  Box,
  Flex,
  
  Td,
  Text,
   
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFetchUserName } from "../../../../utils/hooks/useFetchUserName";
import { formatMongodbTime } from "../../../../utils";

const Stat = ({
  buyer,
  disputeId,
  seller,
  councilVote,
  voterEarning,

  finalWinner,
  createdAt,
}: voteType) => {
  const activeColour = useColorModeValue("#333333", "#F1F5F8");
  const { userName: sellerName } = useFetchUserName(seller);

  const { userName: buyerName } = useFetchUserName(buyer);

  return (
    <Tr key={disputeId} color={activeColour}>
      <Td>
        <Flex mt={3} direction={"column"}>
          <Box>#{disputeId} </Box>
        </Flex>
      </Td>
      <Td>
        <Text color={"#319EF6"}>{sellerName}</Text>
      </Td>
      <Td>
        <Text color={"#319EF6"}>{buyerName}</Text>
      </Td>
      <Td>
        <Text>{voterEarning}</Text>
      </Td>
      <Td>
        <Box>
          <Text>{formatMongodbTime(createdAt)}</Text>
          {
            // <Text>{stat.time}</Text>
          }
        </Box>
      </Td>
      <Td>
        <Text>{councilVote}</Text>
      </Td>
      <Td>
        <Box> {finalWinner === "none" ? "-" : finalWinner + " " + " won"} </Box>
      </Td>
      <Td>
        {councilVote == finalWinner ? (
          <Text color={"#22BB33"}>Good</Text>
        ) : (
          <Text color={"#CC334F"}>Bad</Text>
        )}
      </Td>
    </Tr>
  );
};

export default Stat;
