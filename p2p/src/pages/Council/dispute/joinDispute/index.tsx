import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Timer from "../../../../components/Timer";
import { useActiveWeb3React } from "../../../../utils/hooks";
import {
  useCouncilDispute,
  useViewStateMgt,
} from "../../../../utils/hooks/useCouncilDispute";
import { useFetchUserName } from "../../../../utils/hooks/useFetchUserName";
import useGetDisputeRaised from "../../../../utils/hooks/useGetDisputeRaised";

import LeaveDisputeModal from "../components/Modals/LeaveDisputeModal";
import VoteDisputeModal from "../components/Modals/VoteDisputeModal";
import {
  PUSHOUTNONEVOTEDCOUNCILMEMBER,
  UPDATEDISPUTESTATUS,
  UPDATEDISPUTEVOTINGTIME,
} from "../gql/mutation";
import { FETCHDISPUTES } from "../gql/queries";
import AppealBox from "./AppealBox";

const Index = () => {
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const activeColour = useColorModeValue("#333333", "#F1F5F8");
  let { disputeId } = useParams();
  const { chainId, account } = useActiveWeb3React();

  const { stateMgt } = useViewStateMgt();
  const navigate = useNavigate();

  const { data, error, refetch, startPolling, stopPolling } = useQuery(
    FETCHDISPUTES,
    {
      variables: {
        params: {
          dispute_id: Number(disputeId),
          chainId: chainId,
        },
      },
    }
  );

  const [
    updateDIsputeStatus,
    { loading: updatingStatus, error: errorAdd, data: dataAdd },
  ] = useMutation(UPDATEDISPUTESTATUS);

  const [
    pushOutNoneVotedCouncilMember,
    { loading: loadPushOut, error: errorPushOut, data: dataPushOut },
  ] = useMutation(PUSHOUTNONEVOTEDCOUNCILMEMBER);

  const [
    startVote,
    { loading: loadingVotestart, error: startVoteerr, data: startVoteData },
  ] = useMutation(UPDATEDISPUTEVOTINGTIME);

  const getRemainingVoteTime = (dateGiven: any) => {
    const createdDate = new Date(dateGiven);
    if (createdDate !== undefined) {
      const timeDifference = Math.abs(
        Number(new Date(createdDate.getTime() + 0 * 60000)) - Number(new Date())
      );
      const seconds = Math.floor(timeDifference / 1000);
      const remaningTime = stateMgt?.votingEllapseTime - seconds;

      return remaningTime;
    }
  };

  const getWaitingRemainingTime = (dateGiven: any) => {
    const createdDate = new Date(dateGiven);
    if (createdDate !== undefined) {
      const timeDifference = Math.abs(
        Number(new Date(createdDate.getTime() + 0 * 60000)) - Number(new Date())
      );
      const seconds = Math.floor(timeDifference / 1000);

      const remaningTime = stateMgt?.beforeVotesStart - seconds;
      return remaningTime;
    }
  };

  useEffect(() => {
    startPolling(3000);
  }, []);

  useEffect(() => {
    if (data?.fetchDisputes?.disputs[0]?.disputeStatus == "VOTINGENDED") {
      stopPolling();
    }
  }, [data]);

  const [shouldRecheck, setShouldrefetch] = useState(false);
  const { iVoted: isCouncilVoted } = useCouncilDispute(
    data?.fetchDisputes?.disputs[0]?.productId,
    shouldRecheck,
    account
  );

  const handleReffetch = () => {
    refetch();
  };

  const disputeRaised = useGetDisputeRaised(
    data?.fetchDisputes?.disputs[0]?.productId
  );

  function isSellerOrBuyer(address: string) {
    if (address === data?.fetchDisputes?.disputs[0]?.transactionId?.to) {
      return "Buyer";
    } else if (
      address === data?.fetchDisputes?.disputs[0]?.transactionId?.from
    ) {
      return "Seller";
    }
  }

  const { userName: disputeInitiator } = useFetchUserName(
    data?.fetchDisputes?.disputs[0]?.disputeInitiator
  );
  const { userName: secondDisputePerson } = useFetchUserName(
    data?.fetchDisputes?.disputs[0]?.secondPartyAddress
  );

  useMemo(() => {
    if (
      !data?.fetchDisputes?.disputs[0]?.JoinedMembers?.includes(account) ||
      !account
    ) {
      navigate("/council/dispute");
    }
  }, [data, account]);

  const handleVoteEnd = () => {
    try {
      //check if all cuncil has voted,
      if (
        data?.fetchDisputes?.disputs[0]?.firstPartyVotes +
          data?.fetchDisputes?.disputs[0]?.secondPartyVotes <
        stateMgt.maxNumbersofCouncils
      ) {
        //PushOutUnvotedCouncilMembers
        pushOutNoneVotedCouncilMember({
          variables: {
            params: {
              dispute_id: data?.fetchDisputes?.disputs[0]?.dispute_id,
              chainId: chainId,
              productId: data?.fetchDisputes?.disputs[0]?.productId,
            },
          },
        });
      } else {
        //if the all voted cal updateDisput with VOTEND
        ////else if  3 haas joined and number of people that vted is not upto 3
        //find the joined address and check the one that has not voted
        //remove him from the joined, then update the voteElapse time with current time.
        updateDIsputeStatus({
          variables: {
            params: {
              productId: data?.fetchDisputes?.disputs[0]?.productId,
              disputeStatus: "VOTINGENDED",
              chainId: chainId,
            },
          },
        });
      }
    } catch (error) {
    }
  };

  useMemo(() => {
    if (
      data?.fetchDisputes?.disputs[0]?.firstPartyVotes +
        data?.fetchDisputes?.disputs[0]?.secondPartyVotes ==
      stateMgt?.maxNumbersofCouncils
    ) {
      updateDIsputeStatus({
        variables: {
          params: {
            productId: data?.fetchDisputes?.disputs[0]?.productId,
            disputeStatus: "VOTINGENDED",
            chainId: chainId,
          },
        },
      });
    }
  }, [data, stateMgt]);

  useMemo(() => {
    if (
      data?.fetchDisputes?.disputs[0]?.firstPartyVotes >
        stateMgt?.maxNumbersofCouncils / 2 ||
      data?.fetchDisputes?.disputs[0]?.secondPartyVotes >
        stateMgt?.maxNumbersofCouncils / 2
    ) {
      updateDIsputeStatus({
        variables: {
          params: {
            productId: data?.fetchDisputes?.disputs[0]?.productId,
            disputeStatus: "VOTINGENDED",
            chainId: chainId,
          },
        },
      });
    }
  }, [data, stateMgt]);

  const date = new Date(
    parseFloat(data?.fetchDisputes?.disputs[0]?.createdAt)
  ).toLocaleString();

  const handleVoteStart = () => {
    try {
      startVote({
        variables: {
          params: {
            productId: data?.fetchDisputes?.disputs[0]?.productId,
            disputeStatus: "VOTING",
            chainId: chainId,
          },
        },
      });
    } catch (error) {
    }
  };

  const remainingTime = getRemainingVoteTime(
    data?.fetchDisputes?.disputs[0]?.voteCommenceTime
  );

  useEffect(() => {
    if(data?.fetchDisputes?.disputs[0]?.disputeStatus == "VOTING"){
      setTimeout(() => {
        handleVoteEnd()
      }, remainingTime * 1000);
    }
  }, [remainingTime])

  const waitTime = getWaitingRemainingTime(
    data?.fetchDisputes?.disputs[0]?.lastCouncilJoinTime
  )

  useEffect(() => {
    if(data?.fetchDisputes?.disputs[0]?.disputeStatus == "WAITTIME"){
      setTimeout(() => {
        handleVoteStart()
      }, waitTime * 1000);
    }
  }, [waitTime])
  

  return (
    <Box mx={isMobileDevice ? 5 : 20} mt={isMobileDevice ? 3 : 10}>
      <Flex justifyContent="space-between" alignItems={"center"} mb={"10px"}>
        <Link to="/council/dispute">
          <Flex cursor={"pointer"} alignItems={"center"}>
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5675 13.8191C7.3775 13.8191 7.1875 13.7491 7.0375 13.5991L0.9675 7.52914C0.6775 7.23914 0.6775 6.75914 0.9675 6.46914L7.0375 0.399141C7.3275 0.109141 7.8075 0.109141 8.0975 0.399141C8.3875 0.689141 8.3875 1.16914 8.0975 1.45914L2.5575 6.99914L8.0975 12.5391C8.3875 12.8291 8.3875 13.3091 8.0975 13.5991C7.9575 13.7491 7.7575 13.8191 7.5675 13.8191Z"
                fill="#666666"
              />
              <path
                d="M18.5019 7.75H1.67188C1.26188 7.75 0.921875 7.41 0.921875 7C0.921875 6.59 1.26188 6.25 1.67188 6.25H18.5019C18.9119 6.25 19.2519 6.59 19.2519 7C19.2519 7.41 18.9119 7.75 18.5019 7.75Z"
                fill="#666666"
              />
            </svg>

            <Text color={inactiveColour} px={2}>
              Back to Disputes
            </Text>
          </Flex>
        </Link>
        <Flex
          my={2}
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"row"}
        >
          <Text color={inactiveColour} px={2}>
            Dispute Number:
          </Text>

          <Text fontWeight="bold" color={activeColour} px={1}>
            #{disputeId}{" "}
          </Text>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.4026 15.1673H4.6026C1.99594 15.1673 0.835938 14.0073 0.835938 11.4007V8.60065C0.835938 5.99398 1.99594 4.83398 4.6026 4.83398H7.4026C10.0093 4.83398 11.1693 5.99398 11.1693 8.60065V11.4007C11.1693 14.0073 10.0093 15.1673 7.4026 15.1673ZM4.6026 5.83398C2.53594 5.83398 1.83594 6.53398 1.83594 8.60065V11.4007C1.83594 13.4673 2.53594 14.1673 4.6026 14.1673H7.4026C9.46927 14.1673 10.1693 13.4673 10.1693 11.4007V8.60065C10.1693 6.53398 9.46927 5.83398 7.4026 5.83398H4.6026Z"
              fill="#666666"
            />
            <path
              d="M11.4026 11.1673H10.6693C10.3959 11.1673 10.1693 10.9407 10.1693 10.6673V8.60065C10.1693 6.53398 9.46927 5.83398 7.4026 5.83398H5.33594C5.0626 5.83398 4.83594 5.60732 4.83594 5.33398V4.60065C4.83594 1.99398 5.99594 0.833984 8.6026 0.833984H11.4026C14.0093 0.833984 15.1693 1.99398 15.1693 4.60065V7.40065C15.1693 10.0073 14.0093 11.1673 11.4026 11.1673ZM11.1693 10.1673H11.4026C13.4693 10.1673 14.1693 9.46732 14.1693 7.40065V4.60065C14.1693 2.53398 13.4693 1.83398 11.4026 1.83398H8.6026C6.53594 1.83398 5.83594 2.53398 5.83594 4.60065V4.83398H7.4026C10.0093 4.83398 11.1693 5.99398 11.1693 8.60065V10.1673Z"
              fill="#666666"
            />
          </svg>
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end" alignItems={"center"} mb={"10px"}>
        <Flex
          my={2}
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"row"}
        >
          <Text color={inactiveColour} px={2}>
            Time:
          </Text>

          <Text px={1} fontWeight="bold" color={activeColour}>
            {" "}
            {date}
          </Text>

          {/*<Text fontWeight="bold" px={1} color={activeColour}>
            17:45
  </Text>*/}
        </Flex>
      </Flex>
      <Flex
        flexDirection={isMobileDevice ? "column" : "row"}
        justifyContent={isMobileDevice ? "flex-start" : "space-between"}
        alignItems={"center"}
        mb={"10px"}
      >
        <Box>
          <Text fontSize={20}>
            Dispute between{" "}
            <span style={{ color: "#319EF6" }}>{disputeInitiator}</span> &{" "}
            <span style={{ color: "#319EF6" }}>{secondDisputePerson}</span> For{" "}
            <span style={{ color: "#319EF6" }}>
              {data?.fetchDisputes?.disputs[0]?.transactionId?.crypto_amount}
              {data?.fetchDisputes?.disputs[0]?.transactionId?.asset}{" "}
            </span>
            <span style={{ color: activeColour }}>
              ({data?.fetchDisputes?.disputs[0]?.transactionId?.fiat}{" "}
              {data?.fetchDisputes?.disputs[0]?.transactionId?.crypto_amount *
                data?.fetchDisputes?.disputs[0]?.transactionId?.price}
              )
            </span>
          </Text>

          <Text py={1.5}>
            Projected earnings from voting: ${disputeRaised?.payment}
          </Text>
        </Box>

        <HStack pt={isMobileDevice ? 4 : 0}>
          <VoteDisputeModal
            buyerAddress={data?.fetchDisputes?.disputs[0]?.transactionId?.to}
            sellerAddress={data?.fetchDisputes?.disputs[0]?.transactionId?.from}
            voterEarning={disputeRaised?.payment}
            loadingState={updatingStatus || loadingVotestart}
            disputeStatus={data?.fetchDisputes?.disputs[0]?.disputeStatus}
            disputeID={data?.fetchDisputes?.disputs[0]?.dispute_id}
            handleRefetch={handleReffetch}
            isDisabled={
              !data?.fetchDisputes?.disputs[0]?.JoinedMembers?.includes(account)
            }
            prodID={data?.fetchDisputes?.disputs[0]?.productId}
            disputeParties={[
              {
                name: `${disputeInitiator} - (${
                  data?.fetchDisputes?.disputs[0]?.transactionId?.to ==
                  data?.fetchDisputes?.disputs[0]?.disputeInitiator
                    ? "Buyer"
                    : "seller"
                })`,
                address: data?.fetchDisputes?.disputs[0]?.disputeInitiator,
              },
              {
                name: `${secondDisputePerson} - (${
                  data?.fetchDisputes?.disputs[0]?.transactionId?.to ==
                  data?.fetchDisputes?.disputs[0]?.secondPartyAddress
                    ? "Buyer"
                    : "seller"
                })`,
                address: data?.fetchDisputes?.disputs[0]?.secondPartyAddress,
              },
            ]}
          />
          <Spacer />
          <LeaveDisputeModal
            disputeID={data?.fetchDisputes?.disputs[0]?.dispute_id}
            handleRefetch={handleReffetch}
            prodID={data?.fetchDisputes?.disputs[0]?.productId}
            disputeParties={[
              {
                name: disputeInitiator,
                address: data?.fetchDisputes?.disputs[0]?.disputeInitiator,
              },
              {
                name: secondDisputePerson,
                address: data?.fetchDisputes?.disputs[0]?.secondPartyAddress,
              },
            ]}
          />
        </HStack>
      </Flex>
      {data?.fetchDisputes?.disputs[0]?.disputeStatus == "VOTING" ? (
        <Flex my={4} alignItems={"flex-start"}>
          <Box
            rounded="sm"
            border="1px"
            borderColor={"#F4BC00"}
            backgroundColor={"#FEF8E7"}
            p={1}
          >
            <Text fontSize={"16px"} p={1} fontWeight={"500px"} color="#F4BC00">
              Voting Ellapse Time
            </Text>
          </Box>
          <Box mx={3}>
            <Timer secs={remainingTime.toString()} updateUI={handleVoteEnd} />
          </Box>
        </Flex>
      ) : data?.fetchDisputes?.disputs[0]?.disputeStatus == "VOTINGENDED" ? (
        <>
          <Flex alignItems={"flex-start"}>
            <Box
              my={3}
              rounded="sm"
              border="1px"
              borderColor={"#F4BC00"}
              backgroundColor={"#FEF8E7"}
            >
              <Text
                fontSize={"16px"}
                p={1}
                fontWeight={"500px"}
                color="#F4BC00"
              >
                Voting Ended
              </Text>
            </Box>
          </Flex>
        </>
      ) : data?.fetchDisputes?.disputs[0]?.disputeStatus == "WAITTIME" ? (
        <Flex my={4} alignItems={"flex-start"}>
          <Box
            rounded="sm"
            border="1px"
            borderColor={"#F4BC00"}
            backgroundColor={"#FEF8E7"}
            p={1}
          >
            <Text fontSize={"16px"} p={1} fontWeight={"500px"} color="#F4BC00">
              All council members have joined, Voting Will commence :
            </Text>
          </Box>
          <Box mx={3}>
            <Timer secs={waitTime.toString()} updateUI={handleVoteStart} />
          </Box>
        </Flex>
      ) : (
        <Flex alignItems={"flex-start"}>
          <Box
            my={3}
            rounded="sm"
            border="1px"
            borderColor={"#F4BC00"}
            backgroundColor={"#FEF8E7"}
          >
            <Text fontSize={"16px"} p={1} fontWeight={"500px"} color="#F4BC00">
              All Council Members need to join before Voting can commence,
              current joined Council members:{" "}
              {data?.fetchDisputes?.disputs[0]?.JoinedMembers.length}
            </Text>
          </Box>
        </Flex>
      )}

      <Flex
        alignContent={"space-between"}
        flexDirection={isMobileDevice ? "column" : "row"}
        mb={isMobileDevice ? 5 : 2}
      >
        <AppealBox
          isWinner={
            data?.fetchDisputes?.disputs[0]?.firstPartyVotes >
            data?.fetchDisputes?.disputs[0]?.secondPartyVotes
          }
          votes={data?.fetchDisputes?.disputs[0]?.firstPartyVotes}
          disputeStatus={data?.fetchDisputes?.disputs[0]?.disputeStatus}
          apealReason={
            data?.fetchDisputes?.disputs[0]?.disputeAppeal?.apealreason
          }
          appealMessage={
            data?.fetchDisputes?.disputs[0]?.disputeAppeal?.appealDescription
          }
          appealUser={disputeInitiator}
          appealproofs={
            data?.fetchDisputes?.disputs[0]?.disputeAppeal?.appealProofs
          }
          traderType={isSellerOrBuyer(
            data?.fetchDisputes?.disputs[0]?.disputeInitiator
          )}
          responses={data?.fetchDisputes?.disputs[0]?.firstPartyResponses}
        />

        <Box m={10}>
          <Spacer />
        </Box>

        <AppealBox
          isWinner={
            data?.fetchDisputes?.disputs[0]?.secondPartyVotes >
            data?.fetchDisputes?.disputs[0]?.firstPartyVotes
          }
          votes={data?.fetchDisputes?.disputs[0]?.secondPartyVotes}
          apealReason={
            data?.fetchDisputes?.disputs[0]?.secondPartyAppeal?.apealreason
          }
          disputeStatus={data?.fetchDisputes?.disputs[0]?.disputeStatus}
          appealMessage={
            data?.fetchDisputes?.disputs[0]?.secondPartyAppeal
              ?.appealDescription
          }
          appealUser={secondDisputePerson}
          appealproofs={
            data?.fetchDisputes?.disputs[0]?.secondPartyAppeal?.appealProofs
          }
          traderType={isSellerOrBuyer(
            data?.fetchDisputes?.disputs[0]?.secondPartyAddress
          )}
          responses={data?.fetchDisputes?.disputs[0]?.secondPartyResponses}
        />
      </Flex>
    </Box>
  );
};

export default Index;
