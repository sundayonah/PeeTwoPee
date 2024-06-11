import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Moment from "react-moment";
import React from "react";

import NotificationIcon from "../../../components/Navbar/NotificationIcon";
import { useActiveWeb3React } from "../../../utils/hooks";
import { FETCHNOTIFICATIONS } from "../gql/querries";
import { READ_NOTIFICATION } from "../gql/mutations";
import { useNavigate } from "react-router-dom";

const AllNotification = () => {
  const textColor = useColorModeValue("#333333", "#fff");
  const textColour2 = useColorModeValue("#666666", "#F1F5F8");
  const { chainId } = useActiveWeb3React();

  const { data, refetch } = useQuery(FETCHNOTIFICATIONS, {
    variables: {
      //"page": "",
      //"recordPerPage": "",
      chainId: chainId,
    },
  });
  const { account } = useActiveWeb3React();

  const [readNotification, { loading, error, data: resData }] =
    useMutation(READ_NOTIFICATION);
  const navigate = useNavigate();

  function handleNotification(
    title: string,
    txnId: string,
    notificationId: string
  ) {
    if (title !== "Trade cancelled") {
      const tradeType = title.split(" ")[0].toLowerCase();

      readNotification({ variables: { id: notificationId } });
      refetch();
      navigate(`/buy/order/trade/${txnId}`);
    }
  }

  const getDtae = (_: any) => {
    return new Date(parseFloat(_));
  };

  return (
    <>
      <Box py={5} mb={10}>
        {data?.fetchNotifications?.notifications &&
          data?.fetchNotifications?.notifications
            // ?.filter((notification) => notification.to === account)
            .map((notification: any, index) => (
              <Box key={index} py={2}>
                <Flex
                  justifyContent='space-between'
                  alignItems={"center"}
                  my={2}
                >
                  <Flex
                    cursor={"pointer"}
                    py={2}
                    justifyContent='space-between'
                    alignItems={"center"}
                    onClick={() =>
                      handleNotification(
                        notification.title,
                        notification?.transaction._id,
                        notification._id
                      )
                    }
                  >
                    <NotificationIcon
                      isActive={!notification.readers.includes(account)}
                    />
                    <Box my={1.5} ml={5}>
                      <Text fontWeight={500} color={textColor} fontSize={14}>
                        {notification.title}
                      </Text>
                      <Text
                        fontWeight={400}
                        mt={1}
                        color={textColour2}
                        fontSize={12}
                      >
                        {notification.message}
                      </Text>
                    </Box>
                  </Flex>
                  <Spacer />
                  <Flex>
                    <Text mt={1} fontWeight={400} fontSize={12}>
                      <Moment fromNow>{getDtae(notification.createdAt)}</Moment>
                    </Text>
                  </Flex>
                </Flex>
                <Divider />
              </Box>
            ))}
      </Box>
    </>
  );
};

export default AllNotification;
