import React, { useMemo, useState } from "react";
import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
  useColorModeValue,
  Img,
  Textarea,
} from "@chakra-ui/react";
import thumbsup from "../../../assets/thumbsuplight.svg";
import thumbsdown from "../../../assets/thumbsdownlight.svg";
import { ADD_FEEDBACK } from "../../../pages/Buy/gql/mutation";
import { useMutation } from "@apollo/client";
// import tradeInfo from "../../../state/tradeInfo";

interface ApproveModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  tradeInfo: any;
}

export default function ApproveModal({
  onClose,
  isOpen,
  tradeInfo,
}: ApproveModalProps) {
  const backgroundColor = useColorModeValue("#FFFFFF", "#15202B");
  const textColor = useColorModeValue("#666666", "#DCE5EF");
  const textAreaBgColor = useColorModeValue("#F2F5F8", "#213345");
  const cancelbuttonBgColor = useColorModeValue("#FFFFFF", "#15202B");
  const cancelbuttonBorder = useColorModeValue("#DEE5ED", "#324D68");

  const [feedback, setFeedback] = useState(99);
  const [feedbackComment, setFeedbackComment] = useState("");

  const [addFeedback, { loading, data, error }] = useMutation(ADD_FEEDBACK, {
    variables: {
      params: {
        id: tradeInfo._id,
        feedback: feedback,
        comment: feedbackComment,
      },
    },
  });

  useMemo(() => {
    if (data?.addFeedback.status === true) {
      onClose(false);
    }
  }, [data]);

  return (
    <Modal
      closeOnOverlayClick={false}
      size='sm'
      onClose={() => onClose(false)}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={backgroundColor} py={2}>
        <ModalCloseButton
          onClick={() =>
            addFeedback({
              variables: {
                params: {
                  id: tradeInfo._id,
                  feedback: 99,
                  comment: feedbackComment,
                },
              },
            })
          }
          //   onClick={() => SetSelected("")}
          mt={{ base: 4 }}
          size='sm'
          border='1px'
          borderRadius='6px'
          _focus={{ borderColor: "" }}
        />

        <ModalBody overflowY='scroll' maxH='60vh'>
          <Flex mt={5} flexDirection='column'>
            <Text fontSize='24px' fontWeight='700'>
              How did your trade go?
            </Text>
            <Flex mt={5}>
              <Flex cursor='pointer' flexDirection='column' ml={10} mr={20}>
                <Img
                  onClick={() => setFeedback(1)}
                  _hover={{ opacity: "1" }}
                  opacity={feedback === 1 ? "1" : "0.3"}
                  mb={3}
                  src={thumbsup}
                />
                <Text color={textColor}>Positive</Text>
              </Flex>
              <Flex cursor='pointer' flexDirection='column'>
                <Img
                  onClick={() => setFeedback(2)}
                  _hover={{ opacity: "1" }}
                  opacity={feedback === 2 ? "1" : "0.3"}
                  mb={1}
                  src={thumbsdown}
                />
                <Text color={textColor}>Negative</Text>
              </Flex>
            </Flex>
            <Flex flexDirection='column' mt={5}>
              <Text mb={2}>Comment (optional)</Text>
              <Textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                border='none'
                bgColor={textAreaBgColor}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex w='100%' flexDirection='column'>
            <Button
              onClick={() => addFeedback()}
              disabled={feedback === 99}
              color='#FFFFFF'
              fontSize='14px'
              w='100%'
              bgColor='#319EF6'
              _focus={{ color: "#FFFFFF", bgColor: "#319EF6" }}
              _hover={{ color: "#FFFFFF", bgColor: "#319EF6" }}
            >
              Submit feedback
            </Button>
            <Button
              mt={3}
              color={textColor}
              fontSize='14px'
              border='1px'
              borderColor={cancelbuttonBorder}
              w='100%'
              bgColor={cancelbuttonBgColor}
              _focus={{ color: "none", bgColor: "none" }}
              _hover={{ color: "none", bgColor: "none" }}
              onClick={() =>
                addFeedback({
                  variables: {
                    params: {
                      id: tradeInfo._id,
                      feedback: 99,
                      comment: feedbackComment,
                    },
                  },
                })
              }
            >
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
