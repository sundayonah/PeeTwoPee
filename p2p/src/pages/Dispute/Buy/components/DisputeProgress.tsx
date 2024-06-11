import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function DisputeProgress({
  disputeData,
  disputeState,
}: {
  disputeData: any;
  disputeState: number;
}) {
  const textColor = useColorModeValue("#666666", "#c3c1c1");
  const selectedTextColor = useColorModeValue("#333333", "#ffffff");
  const {t} = useTranslation()
  return (
    <Flex justifyContent='space-between'>
      {Object.keys(disputeData)
        .filter(Number)
        .map((item, index) => {
          return (
            <Box key={index} mx={index===1 ?"10px":0}>
              <Flex justifyContent={"center"}>
                   <Flex
                justifyContent='center'
                alignItems='center'
                width={["20px", "20px", "30px"]}
                height={["20px", "20px", "30px"]}
                fontSize={["8px", "8px", "14px"]}
                borderRadius='50%'
                border="1px solid #319EF6"
                background={
                  parseInt(item) === disputeState ? "#319EF6" : "transparent"
                }
                color={parseInt(item) === disputeState ? "#fff" : "#319EF6"}
                textAlign='center'
              >
                {item}
              </Flex>
              </Flex>
           
              <Flex
                color={
                  parseInt(item) === disputeState
                    ? selectedTextColor
                    : textColor
                }
                // width={["80px","80px","120px"]}
                fontSize={["10px", "10px", "14px"]}
                // textAlign={index===2 ?"right":"left"}
                textAlign="center"
                justifyContent="center"
                fontWeight={parseInt(item) === disputeState ? 500 : 400}
                textTransform="capitalize"
              >
                {t(`${disputeData[item]}`)}
              </Flex>
            </Box>
          );
        })}
    </Flex>
  );
}
