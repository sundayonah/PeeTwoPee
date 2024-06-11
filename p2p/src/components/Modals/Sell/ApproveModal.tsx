import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
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
  Divider,
} from "@chakra-ui/react";
import warningdark from "../../../assets/warningdark.svg";
import { useActiveWeb3React } from "../../../utils/hooks";
import { TOKEN_ADDRESSES } from "../../../utils";

interface ApproveModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  asset: string;
  amountToPay: string;
  approveToken: (
    amountToApproveBy: number,
    tokenAddress: string,
    assetSymbol: string
  ) => Promise<void>;
}

export default function ApproveModal({
  onClose,
  isOpen,
  asset,
  amountToPay,
  approveToken,
}: ApproveModalProps) {
  const { chainId } = useActiveWeb3React();

  const backgroundColor = useColorModeValue("#FFFFFF", "#15202B");
  const dividerColor = useColorModeValue("#DEE5ED", "#324D68");
  const textColor = useColorModeValue("#333333", "#F1F5F8");
  const warningTextColor = useColorModeValue("#F4BC00", "#FFCC24");
  const optionBorder = useColorModeValue("#EBF6FE", "#324D68");
  const optionHoverBorder = useColorModeValue("#319EF6", "#4CAFFF");

  const [amountToBeMultipliedBy, setAmountToBeMultipliedBy] = useState(0);
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
        <ModalHeader
          color={textColor}
          fontWeight='500'
          fontSize='20px'
          mt={{ base: 0 }}
        >
          Approve {asset}
        </ModalHeader>

        <ModalCloseButton
          //   onClick={() => SetSelected("")}
          mt={{ base: 4 }}
          size='sm'
          border='1px'
          borderRadius='6px'
          _focus={{ borderColor: "" }}
        />

        <Divider color={dividerColor} my={2} />

        <ModalBody overflowY='scroll' maxH='60vh'>
          <Flex flexDirection='column'>
            <Text fontWeight='400' fontSize='16px' color={textColor}>
              How many {asset} would you like to approve?
            </Text>
            <Flex mb={6} mt={3}>
              <Img mb={3} mr={2} src={warningdark} />
              <Text color={warningTextColor} fontSize='12px'>
                Approving more token helps you save gas fees on future
                transactions
              </Text>
            </Flex>

            <Flex
              onClick={() => setAmountToBeMultipliedBy(1)}
              cursor='pointer'
              border='1px'
              p={3}
              borderColor={
                amountToBeMultipliedBy === 1 ? optionHoverBorder : optionBorder
              }
              borderRadius='6px'
              mb={4}
              _hover={{
                borderColor: optionHoverBorder,
              }}
            >
              <Text>
                1x:{" "}
                <span style={{ fontWeight: "500" }}>
                  {parseFloat(amountToPay) * 1} {asset}
                </span>
              </Text>
            </Flex>

            <Flex
              onClick={() => setAmountToBeMultipliedBy(3)}
              cursor='pointer'
              border='1px'
              p={3}
              borderColor={
                amountToBeMultipliedBy === 3 ? optionHoverBorder : optionBorder
              }
              borderRadius='6px'
              mb={4}
              _hover={{
                borderColor: optionHoverBorder,
              }}
            >
              <Text>
                3x:{" "}
                <span style={{ fontWeight: "500" }}>
                  {parseFloat(amountToPay) * 3} {asset}
                </span>
              </Text>
            </Flex>

            <Flex
              onClick={() => setAmountToBeMultipliedBy(5)}
              cursor='pointer'
              border='1px'
              p={3}
              borderColor={
                amountToBeMultipliedBy === 5 ? optionHoverBorder : optionBorder
              }
              borderRadius='6px'
              mb={4}
              _hover={{
                borderColor: optionHoverBorder,
              }}
            >
              <Text>
                5x:{" "}
                <span style={{ fontWeight: "500" }}>
                  {parseFloat(amountToPay) * 5} {asset}
                </span>
              </Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            color='#FFFFFF'
            fontSize='14px'
            w='100%'
            bgColor='#319EF6'
            _focus={{ color: "#FFFFFF", bgColor: "#319EF6" }}
            _hover={{ color: "#FFFFFF", bgColor: "#319EF6" }}
            onClick={() =>
              approveToken(
                amountToBeMultipliedBy,
                TOKEN_ADDRESSES[asset][chainId.toString()],
                asset
              )
            }
            disabled={!amountToBeMultipliedBy || amountToBeMultipliedBy === 0}
          >
            Approve {asset}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
