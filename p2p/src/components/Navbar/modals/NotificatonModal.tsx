import {
  Box,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Moment from "react-moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { notification } from "../../../state/notification";
import { RootState } from "../../../state/store";
import NotificationIcon from "../NotificationIcon";
import { useMutation } from "@apollo/client";
import { READ_NOTIFICATION } from "../../../pages/Notification/gql/mutations";

const NotificatonModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const mode = useColorModeValue("light", "dark");
  const textColor = useColorModeValue("#333333", "#fff");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const navigate = useNavigate();
  const hover = useColorModeValue("rgba(228, 225, 222, 0.74)", "#14181b6c");

  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const [readNotification, { loading, error, data: resData }] = useMutation(
    READ_NOTIFICATION
  );

  let { txID } = useParams();
  const location = useLocation();

  const includes = (parrams: string[]) => {
    return (parrams.includes('trade') && parrams.includes('order') && parrams.includes('buy'))
  }


  function handleNotification(
    title: string,
    txnId: string,
    notificationId: string
  ) {
    if (title !== "Trade cancelled") {
      // const tradeType = title.split(" ")[0].toLowerCase();
      //const tradeTypeorder = tradeType === "buy" ? "sell" : "buy";
      onClose();
      readNotification({ variables: { id: notificationId } });
      navigate(`/buy/order/trade/${txnId}`);
      if ( includes(location.pathname.split("/")) &&  (txID !== txnId)) {
          window.location.reload();
      }
    }
  }
  const getDtae = (_: any) => {
    return new Date(parseFloat(_));
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="md"
      >
        <ModalOverlay />
        <ModalContent minHeight="40vh" width="95vw">
          <ModalBody p={5}>
            <Box
              backgroundColor={mode === "dark" ? "#15202B" : "#F2F5F8"}
              borderRadius="6px"
              p={6}
              mb={3}
            >
              <Flex
                fontWeight={500}
                color={textColour2}
                fontSize={16}
                justifyContent="space-between"
                alignItems={"center"}
              >
                <Box>{notifications.length} new notification</Box>
                <Spacer />
                <Box onClick={() => onClose()} cursor={"pointer"}>
                  <Link to={"/account/notification"}>See all </Link>{" "}
                </Box>
              </Flex>
            </Box>

            {notifications.length >= 1 ? (
              notifications.map((notice: notification, index: number) => (
                <Box ml={3} my={2} key={index}>
                  <Flex
                    _hover={{ background: `${hover}` }}
                    cursor={"pointer"}
                    py={2}
                    justifyContent='space-between'
                    alignItems={"center"} boxSizing="border-box" px="15px"
                    onClick={() =>
                      handleNotification(notice.title, notice.txnId, notice._id)
                    }
                  >
                    <NotificationIcon isActive={!notice.read_by_to} />
                    <Box my={1.5} ml={5} width={"100%"} >
                      <Text fontWeight={500} color={textColor} fontSize={14}>
                        {notice.title}
                      </Text>
                      <Text
                        fontWeight={400}
                        mt={1}
                        color={textColour2}
                        fontSize={12}
                        width="100%"
                      >
                        {notice.message}
                      </Text>
                      <Text mt={1} fontWeight={400} fontSize="10px">
                        <Moment fromNow>
                          {getDtae(parseFloat(notice.createdAt))}
                        </Moment>
                      </Text>
                    </Box>
                  </Flex>
                  <Divider />
                </Box>
              ))
            ) : (
              <Box fontStyle={"italic"}>No New Notifications</Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificatonModal;
