import { useState, useEffect } from "react";
import {
  Flex,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  useMediaQuery,
  Img,
  Text,
  useColorModeValue,
  ScaleFade,
} from "@chakra-ui/react";
import MESSAGELIGHT from "../../../assets/message-light-icon.svg";
import { IMessage } from "../../ChatBox/ChatType";

interface ChatNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  messages: IMessage[];
  onOpen: () => void;
  openChat: () => void;
  ischatModalOpen: boolean;
  clearNotification: () => void;
}

const ChatNotification = ({
  isOpen,
  onClose,
  messages,
  onOpen,
  openChat,
  ischatModalOpen,
  clearNotification,
}: ChatNotificationProps) => {
  const textColor = useColorModeValue("#333333", "");
  const tileColor = useColorModeValue("#FFFFFF", "#2D3748");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const [newmessage, setnewMessage] = useState<IMessage[]>([]);



  return (
    isMobileDevice &&
    !ischatModalOpen && (
      <Modal isOpen={isOpen} onClose={() => onClose}>
        <ModalOverlay onClick={() => clearNotification()} />
        <ModalContent bgColor={"transparent"}>
          <ModalBody>
            {messages?.map((message) => (
              <ScaleFade in={isOpen} initialScale={0.9}>
                <Flex
                  onClick={() => {
                    onClose();
                    openChat();
                  }}
                  borderRadius={"10px"}
                  bgColor={tileColor}
                  py={4}
                  px={2}
                  mb={2}
                >
                  <Img mr={3} src={MESSAGELIGHT} />
                  {message.type === "image/png" ? (
                    <Text color={textColor} fontSize={"14px"}>
                      Photo
                    </Text>
                  ) : (
                    <Text color={textColor} fontSize={"14px"}>
                      {message?.text}
                    </Text>
                  )}
                </Flex>
              </ScaleFade>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
};

export default ChatNotification;
