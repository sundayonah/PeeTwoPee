import {
  
  Modal,
  Box,
  Text,
  Flex,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  
  useColorModeValue,
  Divider,
  Spacer,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USER_INFO } from "../gql/querries";
import { UPDATE_SETTINGS } from "../gql/mutations";

const NotificationPrefModal = ({
  openModal,
  closeModal,
}: {
  openModal: boolean;
  closeModal: () => void;
}) => {
  const mode = useColorModeValue("light", "dark");
  const buttonBgColor = useColorModeValue("#070707", "#213345");
  const textColor = useColorModeValue("#333333", "#fff");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const [userInfo, setuserInfo] = useState<{
    ads: boolean;
    trade: boolean;
    system: boolean;
  }>();

  const {} = useQuery(USER_INFO, {
    onCompleted: (data) => {
      if (data?.userInfo) {
        setuserInfo(data?.userInfo.settings);
      }
    },
  });

  const [updateSettings] = useMutation(UPDATE_SETTINGS);

  const handleChange = (name, value) => {
    setuserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={openModal}
        onClose={closeModal}
        size='sm'
      >
        <ModalOverlay />
        <ModalContent minH={40}>
          <Flex flexDirection='column' my={2} mx={5}>
            <Flex>
              <ModalCloseButton
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
                onClick={() => {
                  updateSettings({
                    variables: {
                      params: {
                        ads: userInfo?.ads,
                        trade: userInfo?.trade,
                        system: userInfo?.system,
                      },
                    },
                  });
                }}
              />
            </Flex>
            <Flex>
              <Text
                pt={1.5}
                fontSize='20px'
                lineHeight='28px'
                color={mode === "dark" ? "#F1F5F8" : "#333333"}
              >
                Notification Preferences
              </Text>
            </Flex>
          </Flex>
          <Divider />

          <Box p={4}>
            <Flex
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              py={4}
              px={3}
              mb={3}
              cursor='pointer'
              justifyContent='space-between'
              alignItems={"center"}
            >
              <Box my={1.5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Interaction Notification
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  Get notified whenever a user interacts with your Ads.
                </Text>
              </Box>
              <Spacer />
              <Switch
                onChange={(e) =>
                  handleChange("ads", userInfo?.ads === true ? false : true)
                }
                isChecked={userInfo?.ads}
                size='lg'
              />
            </Flex>

            <Flex
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              py={4}
              px={3}
              mb={3}
              cursor='pointer'
              justifyContent='space-between'
              alignItems={"center"}
            >
              <Box my={1.5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  Trade Notifications
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  Get notified whenever a user places a BUY or SELL order.{" "}
                </Text>
              </Box>
              <Spacer />
              <Switch
                onChange={(e) =>
                  handleChange("trade", userInfo?.trade === true ? false : true)
                }
                isChecked={userInfo?.trade}
                size='lg'
              />
            </Flex>

            <Flex
              backgroundColor={mode === "dark" ? "#15202B" : "#FFFFFF"}
              border={
                mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"
              }
              borderRadius='6px'
              py={4}
              px={3}
              mb={3}
              cursor='pointer'
              justifyContent='space-between'
              alignItems={"center"}
            >
              <Box my={1.5}>
                <Text fontWeight={500} color={textColor} fontSize={14}>
                  System Prompts
                </Text>
                <Text fontWeight={400} mt={1} color={textColour2} fontSize={12}>
                  Get notified about system, account or support messages.{" "}
                </Text>
              </Box>
              <Spacer />
              <Switch
                onChange={(e) =>
                  handleChange(
                    "system",
                    userInfo?.system === true ? false : true
                  )
                }
                isChecked={userInfo?.system}
                size='lg'
              />
            </Flex>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationPrefModal;
