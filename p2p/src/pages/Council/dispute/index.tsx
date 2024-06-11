import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  useMediaQuery,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/LoadingPage/LoadingPage";
import OrderSkeletonPage from "../../../components/skeleton/OrderSkeletonPage";
import { useIsWhitelisted } from "../../../utils/hooks/useCouncilDispute";
import useIsCouncilMember from "../../../utils/hooks/useIsCouncilMember";
import { useRank } from "../../../utils/hooks/useRigelBadge";
import DisputeDropdown from "./components/DisputeDropdown";
import EndedDisputes from "./components/EndedDisputes";
import JoinedDispute from "./components/JoinedDispute";
import OngoingDispute from "./components/OngoingDispute";

const Index = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const {isWhitelistEnabled, isWhitelistedUser} = useIsWhitelisted()

 const { rank, loading } = useIsCouncilMember();
 const {loading: loadMarch,   merchantRank } = useRank(reload, setReload);


  if ((!loading && !loadMarch ) && (rank.rank == "" && merchantRank?.rank == "")) {
    navigate("/council/register");
  }

  return (
    <>
         <Box m={10}  mx={isMobileDevice ? 4 : 20}>
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <Spacer />
            <DisputeDropdown />
          </Flex>
          <Tabs  mt={-10}>
            <TabList>
              <Tab>Ongoing</Tab>
              <Tab>Ended</Tab>
              <Tab>Joined</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <OngoingDispute />
              </TabPanel>
              <TabPanel>
                <EndedDisputes />
              </TabPanel>
              <TabPanel>
                <JoinedDispute />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
     
    </>
  );
};

export default Index;
