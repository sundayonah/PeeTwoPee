import { useState } from "react";
import { Tbody, Tr, Td, Text, Flex, Button } from "@chakra-ui/react";

import { earning } from "../../../../state/earning";
import { shortenAddress } from "../../../../utils";
import { Link } from "react-router-dom";
import { RootState } from "../../../../state/store";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { useQuery } from "@apollo/client";
import { USERBYADDRESS } from "../../../Wallet/gql/query";
import { useActiveWeb3React } from "../../../../utils/hooks";

interface EarnBodyProps {
  earning: any;

  index: any;
  openStakeModal: () => void;
  claimpRGP: () => void;
}

function EarnBody({
  earning,
  index,
  openStakeModal,
  claimpRGP,
}: EarnBodyProps) {
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
      address: earning?.user,
    },
  });
  const { account } = useActiveWeb3React();
  return (
    <Tbody>
      <Tr>
        <Td>
          <Text fontSize='14px'>{index + 1}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>
            {userData?.username ? userData.username : "--"}
          </Text>
        </Td>
        <Td>
          <Text fontSize='14px'>
            {/* {earning.rank === "" ? "--" : earning.rank} */}
            {ethers.utils.formatEther(earning?.acruedReward.toString())} RGP
          </Text>
        </Td>
        <Td>
          <Text fontSize='14px'>
            {ethers.utils.formatEther(earning?.amountDeposit.toString())} pRGP
          </Text>
        </Td>
        <Td>
          <Text fontSize='14px'>--</Text>
        </Td>
        <Td>
          <Flex>
            <Text>--</Text>
          </Flex>
        </Td>
      </Tr>
    </Tbody>
  );
}

export default EarnBody;
