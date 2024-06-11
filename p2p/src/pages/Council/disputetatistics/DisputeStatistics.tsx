import {
  Box, 
  Table,
  TableContainer,
  Tbody,
   
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import Stat from "./componens/Stat"; 

export type voteType = {
  buyer: string;
  disputeId: number;
  account: string;
  chainId: number;
  seller: string;
  councilVote: string;
  voterEarning: number;
  finalWinner: string;
  createdAt: any;
};

type voteStateProps = {
  loading: boolean;
  votes: voteType[];
};

const DisputeStatistics = ({ votes, loading }: voteStateProps) => {
  const mode = useColorModeValue("light", "dark");

  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <TableContainer fontSize={14}>
      <Table size="lg" variant="simple">
        <Thead
          background={
            mode === LIGHT_THEME
              ? "#F2F5F8  !important"
              : mode === DARK_THEME
              ? "#213345"
              : mode === DARK_THEME
              ? "#213345"
              : mode === LIGHT_THEME
              ? "#F2F5F8"
              : "#F2F5F8 !important"
          }
        >
          <Tr>
            <Th>Dispute ID</Th>
            <Th>Seller</Th>
            <Th>Buyer</Th>
            <Th>Voter Earning</Th>
            <Th>Date</Th>
            <Th>Your Vote</Th>
            <Th>Final Result</Th>
            <Th>Performance</Th>
          </Tr>
        </Thead>

        {votes?.length === 0 ? (
          <Box
            fontSize={"18px"}
            textAlign="center"
            padding="20px"
            fontWeight={400}
          >
            No Stat Found
          </Box>
        ) : (
          <Tbody>
            {votes &&
              votes?.filter((voteObj)=> voteObj.finalWinner != "none").map((stat, index) => {
                return <Stat key={index} {...stat} />;
              })}
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
};

export default DisputeStatistics;
