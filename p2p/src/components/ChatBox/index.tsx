import {
  Box,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import ListedColoredText from "../ListedColorText";
import ChatBoxHeader from "./ChatBoxHeader";
import MessageBox from "./MessageBox";
import SendMessage from "./SendMessage";
import { IMessage } from "./ChatType";
import { useState } from "react";
import { IFromInfo } from "../../utils/hooks/useOrder";
import moment from "moment";

export default function ChatBox({
  messages,
  completed,
  sendMessage,
  terms,
  fromInfo,
  disabled,
  tx_id,
  modal,
  closeChatModal,
  clearNotification,
}: {
  dispute: boolean;
  page: string;
  completed?: boolean;
  terms?: string;
  messages: IMessage[];
  fromInfo?: IFromInfo;
  disabled?: boolean;
  tx_id?: string;
  modal?: boolean;
  closeChatModal?: () => void;
  tradeInfoID?: { from: string; to: string };
  sendMessage: (type: string, text: string) => void;
  clearNotification?: () => void;
}) {
  const [fullImage, setShowFullImage] = useState(false);
  const [selectedImage, setShowselectedImage] = useState("");
  const controlModal = (bool: boolean, text: string = "") => {
    setShowFullImage(bool);
    setShowselectedImage(text);
  };

  const backgroundColor = useColorModeValue("#EBF6FE", "#4A739B");
  const textColor = useColorModeValue("#333333", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");

  return (
    <>
      <ChatBoxHeader
        fromInfo={fromInfo}
        modal={modal}
        closeChatModal={closeChatModal}
        clearNotification={clearNotification}
      />

      <Box
        mx={[0, 0, 5]}
        className="ChatBoxS"
        py={5}
        minHeight='400px'
        position='relative'
        bg={modal ? bgColour : "transparent"}
        px={modal ? "10px" : 0}
      >
        {terms && (
          <ListedColoredText
            disputeInfo={[terms]}
            background={backgroundColor}
            textColor={textColor}
          />
        )}
        <Box textAlign='center' fontSize='12px'>
          {moment().format("YYYY-MM-Do , h:mm:ss")}
        </Box>

        <Box
      
          overflowY='auto'
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
              marginRight: "5px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#DEE5ED",
              borderRadius: "24px",
            },
          }}
          maxH='250px'
        >
          {messages &&
            messages.map((message: IMessage, index: number) => {
              return (
                <Box key={index}>
                  {message.type === "message" ? (
                    <MessageBox
                      text={message.text}
                      tradeInfoID={message.send}
                      key={index}
                    />
                  ) : message.type.includes("image") ? (
                    <Box fontSize='12px' color={textColor} my={7}>
                      <Img
                        src={`https://firebasestorage.googleapis.com/v0/b/p2p-rigel.appspot.com/o/${message.text}?alt=media&token=${process.env.REACT_APP_FIREBASE_STORAGE_TOKEN}`}
                        width='200px'
                        borderRadius='4px'
                        cursor='pointer'
                        onClick={() =>
                          controlModal(
                            true,
                            `https://firebasestorage.googleapis.com/v0/b/p2p-rigel.appspot.com/o/${message.text}?alt=media&token=${process.env.REACT_APP_FIREBASE_STORAGE_TOKEN}`
                          )
                        }
                      />
                    </Box>
                  ) : (
                    <Box
                      fontSize='12px'
                      color={textColor}
                      borderRadius='4px'
                      border={`1px solid ${borderColor}`}
                      p={4}
                      my={2}
                    >
                      {message.text}
                    </Box>
                  )}
                  <Modal
                    isOpen={fullImage}
                    onClose={() => controlModal(false, "")}
                    isCentered
                    size='3xl'
                  >
                    <ModalOverlay />

                    <ModalContent color='#fff' borderRadius='6px' py={5}>
                      <ModalCloseButton
                        onClick={() => {
                          controlModal(false, "");
                        }}
                        border='2px #666 solid'
                        m='4'
                      />
                      <ModalBody>
                        {selectedImage && (
                          <Img width='100%' src={selectedImage} />
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
              );
            })}
        </Box>

        {completed && (
          <Box
            fontSize='12px'
            color={textColor}
            borderRadius='4px'
            border={`1px solid ${borderColor}`}
            p={4}
          >
            {completed &&
              `The seller has successfully released the crypto to your wallet. The trade is completed successfully`}
          </Box>
        )}

        <SendMessage
          sendMessage={sendMessage}
          disabled={disabled}
          tx_id={tx_id}
        />
      </Box>
    </>
  );
}
