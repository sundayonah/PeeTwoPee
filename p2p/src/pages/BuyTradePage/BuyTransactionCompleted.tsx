import {
  
  InfoOutlineIcon,
  
} from "@chakra-ui/icons";
import {
  Box,
  Button, 
  Flex,
  Text,
  useColorModeValue,
  useMediaQuery,
 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InformationTag from "../../components/InformationTag";
import { useActiveWeb3React } from "../../utils/hooks";
import FeedbackModal from "../../components/Modals/Feedback/index";
import { useState } from "react";

type IBuyTransactionCompleted = {
  tradeInfo: {
    asset: string;
    from: string;
    to: string;
    crypto_amount: number;
    productId: number;
    chainId: number;
    price: number;
    fiat: string;
    _id: string;
    status: string;
    createdAt: string;
    feedback?: { to: number; from: number };
  };
};

export default function BuyTransactionCompleted({
  tradeInfo,
}: IBuyTransactionCompleted) {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const { account } = useActiveWeb3React();
  const titleTextColor = useColorModeValue("#333333", "#F1F5F8");
  const backgroundColor = useColorModeValue("#E9FBEB", "#213345");
  const borderColor = useColorModeValue("#22BB33", "#324D68");
  const [isOpen, onClose] = useState(true);

  const feedback =
    account === tradeInfo?.to
      ? tradeInfo?.feedback.from
      : tradeInfo?.feedback.to;

  return (
    <Box minWidth='100%'>
      <Flex my={3}>
      {!isMobileDevice && <InformationTag />}
        <Box ml={4} mt={-1}>
          <Text color={titleTextColor} fontSize='16px' fontWeight='500'>
            Transaction Completed. <InfoOutlineIcon ml={2} />
          </Text>
          <Flex
            background={backgroundColor}
            border='1px'
            borderColor={borderColor}
            padding={6}
            borderRadius='4px'
            minWidth='100%'
            my={5}
          >
            <Text fontSize='14px'>
              {account === tradeInfo.from
                ? "You have successfully released the crypto into the buyer’s wallet. This payment is now marked as Complete."
                : "The Seller has released the cryptocurrency into your account. This trade is now marked as Successfully Completed."}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Flex my={3}>
        <Box my={6} mx={8}>
          <Button
            height='48px'
            variant='outline'
            colorScheme='teal'
            width='200px'
            isFullWidth
          >
            <Link to='/trade/buy'>Go Home</Link>
          </Button>
        </Box>
      </Flex>

      {feedback === 99 && (
        <FeedbackModal
          tradeInfo={tradeInfo}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </Box>
  );
}
