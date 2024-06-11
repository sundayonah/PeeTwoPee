import {
  Box,
  Flex,
  HStack,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AllNotification from "./components/AllNotification";
import NotificationPrefModal from "./components/NotificationPrefModal";
import SystemPrompts from "./components/SystemPrompts";
import TradeNotification from "./components/TradeNotification";

const Index = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const bg = useColorModeValue("#15202B", "#FFFFFF");
  const {t} = useTranslation()
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <NotificationPrefModal
        openModal={openModal}
        closeModal={() => setOpenModal(!openModal)}
      />
      <Box px={5} pb={3} background={"#15202B"} pt={4}>
        <Flex
          mx={isMobileDevice ? 2 : 10}
          justifyContent="space-between"
          alignItems={"center"}
          pt={4}
        >
          <Text
            display={isMobileDevice ? "none" : undefined}
            fontSize={isMobileDevice ? "14px" : 16}
            fontWeight="500px"
            color={"white"}
          >
            P2P Home
          </Text>
          <HStack
            spacing={isMobileDevice ? 3 : 5}
            color={"white"}
            fontSize={isMobileDevice ? "14px" : 16}
          >
            <Link to={"/profile/account"}>{t('trades')}</Link>
            <Link to={"/profile/account"}>{t('referrals')}</Link>
            <Link to={"/profile/account"}>{t('my_ads')}</Link>
            <Link to={"/profile/account"}>{t('FAQ')}</Link>
            <Link to={"/profile/account"}>{t('my_p2p_acct')}</Link>
          </HStack>
        </Flex>
      </Box>

      <Box
        fontSize={isMobileDevice ? "14px" : 16}
        m={ isMobileDevice ? 5 :10}
        mx={isMobileDevice ? 5 : 20}
      >
        <Flex mx={isMobileDevice ? 2 : 0} mb={2} alignItems="center" gap="2">
          <Spacer />
          <HStack
            //display={isMobileDevice ? "none" : "flex"}
            //mr={5}
            // mt={2}
            onClick={() => setOpenModal(true)}
            cursor="pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z"
                fill={bg}
              />
              <path
                d="M15.21 22.1898C15 22.1898 14.79 22.1598 14.58 22.1098C13.96 21.9398 13.44 21.5498 13.11 20.9998L12.99 20.7998C12.4 19.7798 11.59 19.7798 11 20.7998L10.89 20.9898C10.56 21.5498 10.04 21.9498 9.42 22.1098C8.79 22.2798 8.14 22.1898 7.59 21.8598L5.87 20.8698C5.26 20.5198 4.82 19.9498 4.63 19.2598C4.45 18.5698 4.54 17.8598 4.89 17.2498C5.18 16.7398 5.26 16.2798 5.09 15.9898C4.92 15.6998 4.49 15.5298 3.9 15.5298C2.44 15.5298 1.25 14.3398 1.25 12.8798V11.1198C1.25 9.6598 2.44 8.4698 3.9 8.4698C4.49 8.4698 4.92 8.2998 5.09 8.0098C5.26 7.7198 5.19 7.2598 4.89 6.7498C4.54 6.1398 4.45 5.4198 4.63 4.7398C4.81 4.0498 5.25 3.4798 5.87 3.1298L7.6 2.1398C8.73 1.4698 10.22 1.8598 10.9 3.0098L11.02 3.2098C11.61 4.2298 12.42 4.2298 13.01 3.2098L13.12 3.0198C13.8 1.8598 15.29 1.4698 16.43 2.1498L18.15 3.1398C18.76 3.4898 19.2 4.0598 19.39 4.7498C19.57 5.4398 19.48 6.1498 19.13 6.7598C18.84 7.2698 18.76 7.7298 18.93 8.0198C19.1 8.3098 19.53 8.4798 20.12 8.4798C21.58 8.4798 22.77 9.6698 22.77 11.1298V12.8898C22.77 14.3498 21.58 15.5398 20.12 15.5398C19.53 15.5398 19.1 15.7098 18.93 15.9998C18.76 16.2898 18.83 16.7498 19.13 17.2598C19.48 17.8698 19.58 18.5898 19.39 19.2698C19.21 19.9598 18.77 20.5298 18.15 20.8798L16.42 21.8698C16.04 22.0798 15.63 22.1898 15.21 22.1898ZM12 18.4898C12.89 18.4898 13.72 19.0498 14.29 20.0398L14.4 20.2298C14.52 20.4398 14.72 20.5898 14.96 20.6498C15.2 20.7098 15.44 20.6798 15.64 20.5598L17.37 19.5598C17.63 19.4098 17.83 19.1598 17.91 18.8598C17.99 18.5598 17.95 18.2498 17.8 17.9898C17.23 17.0098 17.16 15.9998 17.6 15.2298C18.04 14.4598 18.95 14.0198 20.09 14.0198C20.73 14.0198 21.24 13.5098 21.24 12.8698V11.1098C21.24 10.4798 20.73 9.9598 20.09 9.9598C18.95 9.9598 18.04 9.5198 17.6 8.7498C17.16 7.9798 17.23 6.9698 17.8 5.9898C17.95 5.7298 17.99 5.4198 17.91 5.1198C17.83 4.8198 17.64 4.5798 17.38 4.4198L15.65 3.4298C15.22 3.1698 14.65 3.3198 14.39 3.7598L14.28 3.9498C13.71 4.9398 12.88 5.4998 11.99 5.4998C11.1 5.4998 10.27 4.9398 9.7 3.9498L9.59 3.7498C9.34 3.3298 8.78 3.1798 8.35 3.4298L6.62 4.4298C6.36 4.5798 6.16 4.8298 6.08 5.1298C6 5.4298 6.04 5.7398 6.19 5.9998C6.76 6.9798 6.83 7.9898 6.39 8.7598C5.95 9.5298 5.04 9.9698 3.9 9.9698C3.26 9.9698 2.75 10.4798 2.75 11.1198V12.8798C2.75 13.5098 3.26 14.0298 3.9 14.0298C5.04 14.0298 5.95 14.4698 6.39 15.2398C6.83 16.0098 6.76 17.0198 6.19 17.9998C6.04 18.2598 6 18.5698 6.08 18.8698C6.16 19.1698 6.35 19.4098 6.61 19.5698L8.34 20.5598C8.55 20.6898 8.8 20.7198 9.03 20.6598C9.27 20.5998 9.47 20.4398 9.6 20.2298L9.71 20.0398C10.28 19.0598 11.11 18.4898 12 18.4898Z"
                fill={bg}
              />
            </svg>

            <Text display={isMobileDevice ? "none" : "flex"} ml={2}>
              Notification preferences
            </Text>
          </HStack>
        </Flex>
        <Tabs mt={-10}>
          
          <TabList>
            <Flex>
              <HStack>
                <Tab>All</Tab>
                <Tab isDisabled>
                  Trade{" "}
                  <Text display={isMobileDevice ? "none" : "flex"}>
                    Notifications
                  </Text>{" "}
                </Tab>
                <Tab mr={10} isDisabled>
                  System prompts
                </Tab>
              </HStack>
            </Flex>
          </TabList>


          <TabPanels>
            <TabPanel>
              <AllNotification />
            </TabPanel>
            <TabPanel>
              <TradeNotification />
            </TabPanel>
            <TabPanel>
              <SystemPrompts />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default Index;
