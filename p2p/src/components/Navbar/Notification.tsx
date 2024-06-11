import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import NotificatonModal from "./modals/NotificatonModal";
import NotificationIcon from "./NotificationIcon";

const Notification = () => {
  const [openModal, setOpenModal] = useState(false);

  
  const { notifications } = useSelector((state: RootState) => state.notification);

  return (
    <>
      <Box cursor={"pointer"} mt={["13px","13px",0]} onClick={() => setOpenModal(!openModal)}>
        <NotificationIcon isActive={notifications.length >=1} />
      </Box>

      <NotificatonModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Notification;
