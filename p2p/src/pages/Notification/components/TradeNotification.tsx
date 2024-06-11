import {
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import NotificationIcon from "../../../components/Navbar/NotificationIcon";

const TradeNotification = () => {
  const mode = useColorModeValue("light", "dark");
  const textColor = useColorModeValue("#333333", "#fff");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");

  const hover = useColorModeValue("rgba(228, 225, 222, 0.74)", "#14181b6c");

  return (
    <>
      <Box py={5}>
        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex>
              <Text mt={1} fontWeight={400} fontSize={12}>
                2 mins ago
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>

        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon isActive={true} />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex>
              <Text mt={1} fontWeight={400} fontSize={12}>
                2 mins ago
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>

        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon isActive={true} />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex>
              <Text mt={1} fontWeight={400} fontSize={12}>
                2 mins ago
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>

        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon isActive={true} />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex>
              <Text mt={1} fontWeight={400} fontSize={12}>
                2 mins ago
              </Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>

        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon isActive={true} />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex
              flexDirection={"column"}
              mt={1}
              fontWeight={400}
              fontSize={12}
            >
              <Text>22022-04-06</Text>

              <Text>14:51:22</Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>

        <Box py={2}>
          <Flex justifyContent='space-between' alignItems={"center"} my={2}>
            <Flex
              cursor={"pointer"}
              py={2}
              justifyContent='space-between'
              alignItems={"center"}
            >
              <NotificationIcon />
              <Box my={1.5} ml={5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Payment complete
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  The system has detected that a user is interacting with your
                  BUY order.
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Flex
              flexDirection={"column"}
              mt={1}
              fontWeight={400}
              fontSize={12}
            >
              <Text>22022-04-06</Text>

              <Text>14:51:22</Text>
            </Flex>
          </Flex>
          <Divider />
        </Box>
      </Box>
    </>
  );
};

export default TradeNotification;
