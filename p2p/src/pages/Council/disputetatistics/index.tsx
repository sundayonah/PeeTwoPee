import React from "react";
import {
  Tabs,
  TabList, 
  Tab, 
  Box, 
  useMediaQuery,
  
} from "@chakra-ui/react";
import DisputeStatistics from "./DisputeStatistics";
import BailOutModals from "./componens/BailOutModals";
import DisputeHeader from "../dispute/components/DisputeHeader";
import { useQuery } from "@apollo/client";
import { GETCOUNCILVOTES } from "./gql/queries";
import { useActiveWeb3React } from "../../../utils/hooks";

const Index = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const {account, chainId} = useActiveWeb3React()

  const {
    data, 
    loading
 
  } = useQuery(GETCOUNCILVOTES, {
    variables: {
      params: {
        account: account,
        chainId: chainId,
      },
    },
  });


  return (
  <>
  <DisputeHeader/>
    <Box mb={10} m={10} mx={isMobileDevice ? 4 : 20}>
      <Tabs isLazy>
        <TabList>
          <Tab fontWeight={500} fontSize={16}>
            Dispute statistics
          </Tab>
        </TabList>
       { /** 
       <TabPanels>
          <TabPanel>
            <Flex my={5} flexDirection={isMobileDevice ? "column" : "row"}>
              <Box
                mr={isMobileDevice ? 0 : 20}
                borderColor="#DEE5ED"
                borderRadius={6}
                fontSize={16}
                color={"#666666"}
                padding={3}
                backgroundColor={"#FEF8E7"}
                my={isMobileDevice ? 5 : 0}
              >
                You can not participate in disputes anymore due to bad voting
                performance. To participate, you have to bail out.
              </Box>
              <BailOutModals/>
              <Spacer />
            </Flex>
          </TabPanel>
        </TabPanels>
        */
      }
      </Tabs>
      <DisputeStatistics votes={data?.CouncilVotes?.councilVotes} loading={loading}/>
    </Box>
    </>
  );
};

export default Index;
