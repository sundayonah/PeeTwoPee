import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useActiveWeb3React } from "../../utils/hooks";

export default function MessageBox({
  text,
  tradeInfoID,
}: {
  text: string;
  tradeInfoID?: string;
}) {
  const { account } = useActiveWeb3React();
  const send = useColorModeValue("#F2F5F8", "#213345");
  const buyer = useColorModeValue("#F2F5F8", "#2f5f8e");
  return (
    <Flex
      justifyContent={tradeInfoID === account ? "flex-end" : "flex-start"}
      my={5}
    >
      <Box
        borderRadius={
          tradeInfoID === account ? "12px 12px 0px 12px" : "12px 12px 12px 0"
        }
        background={tradeInfoID === account ? send : buyer}
        width='84%'
        p={2}
      >
        {text}
      </Box>
    </Flex>
  );
}
