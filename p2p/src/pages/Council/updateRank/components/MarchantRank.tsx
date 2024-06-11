import { Box, Button, Flex, HStack, Link, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const MarchantRank = () => {
  const textColor2 = useColorModeValue("#333333", "#ffffff");
  const textColor1 = useColorModeValue("#666666", "#999999");
  return (
    <>
      <Box
        my={5}
        borderRadius={4}
        ml={-4}
        p={4}
        mr={-4}
        backgroundColor={"#DEE5ED"}
      >
        <Text size="12px" fontWeight={400} color="#666666">
          As a merchant, you can upgrade your current rank to a higher one by
          staking a higher value NFT.
        </Text>
      </Box>

      <Flex
        alignContent={"center"}
        justifyContent="center"
        flexDirection={"column"}
        borderRadius={4}
        ml={-4}
        p={5}
        mr={-4}
        border={"1px solid #DEE5ED"}
      >
        <Flex justifyContent="center" alignContent="center">
          <Text fontSize={14} fontWeight={500} color={textColor2}>
            Ranking
          </Text>
        </Flex>

        <Text
         // mx={3}
          align={"center"}
          my={"16px"}
          fontSize={12}
          fontWeight={400}
          color={textColor1}
        >
          Your ranking is dependent on your stake value on the P2P Dapp. The
          higher your stake, the higher your ranking.
        </Text>

        <Box borderRadius={4} px={5} padding={5} backgroundColor={"#F2F5F8"}>
          <Text
            mt={2}
            align={"center"}
            fontSize={14}
            fontWeight={500}
            color={"#333333"}
          >
            Update rank
          </Text>


          <Flex mx={5} mt={2} justifyContent="center" alignContent="center">
          <Button variant={"brand"} isFullWidth my={4}>
            Stake NFT
          </Button>
          </Flex>
        </Box>

        <Text
          mt={5}
          color="#319EF6"
          cursor="pointer"
          textDecoration={"underline"}
          align={"center"}
        >
          See ranking level requirements
        </Text>
      </Flex>

      <Box
        mt={5}
        ml={-4}
        mr={-4}
      >
        <HStack>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.0026 15.1673C4.04927 15.1673 0.835938 11.954 0.835938 8.00065C0.835938 4.04732 4.04927 0.833984 8.0026 0.833984C11.9559 0.833984 15.1693 4.04732 15.1693 8.00065C15.1693 11.954 11.9559 15.1673 8.0026 15.1673ZM8.0026 1.83398C4.6026 1.83398 1.83594 4.60065 1.83594 8.00065C1.83594 11.4007 4.6026 14.1673 8.0026 14.1673C11.4026 14.1673 14.1693 11.4007 14.1693 8.00065C14.1693 4.60065 11.4026 1.83398 8.0026 1.83398Z"
              fill="#F4BC00"
            />
            <path
              d="M8 9.16732C7.72667 9.16732 7.5 8.94065 7.5 8.66732V5.33398C7.5 5.06065 7.72667 4.83398 8 4.83398C8.27333 4.83398 8.5 5.06065 8.5 5.33398V8.66732C8.5 8.94065 8.27333 9.16732 8 9.16732Z"
              fill="#F4BC00"
            />
            <path
              d="M8.0026 11.3339C7.91594 11.3339 7.82927 11.3139 7.74927 11.2806C7.66927 11.2472 7.59594 11.2006 7.52927 11.1406C7.46927 11.0739 7.4226 11.0072 7.38927 10.9206C7.35594 10.8406 7.33594 10.7539 7.33594 10.6672C7.33594 10.5806 7.35594 10.4939 7.38927 10.4139C7.4226 10.3339 7.46927 10.2606 7.52927 10.1939C7.59594 10.1339 7.66927 10.0872 7.74927 10.0539C7.90927 9.98724 8.09594 9.98724 8.25594 10.0539C8.33594 10.0872 8.40927 10.1339 8.47594 10.1939C8.53594 10.2606 8.5826 10.3339 8.61594 10.4139C8.64927 10.4939 8.66927 10.5806 8.66927 10.6672C8.66927 10.7539 8.64927 10.8406 8.61594 10.9206C8.5826 11.0072 8.53594 11.0739 8.47594 11.1406C8.40927 11.2006 8.33594 11.2472 8.25594 11.2806C8.17594 11.3139 8.08927 11.3339 8.0026 11.3339Z"
              fill="#F4BC00"
            />
          </svg>

          <Text ml={3} fontSize={12} color={'#D9AA0F'}>
          If you are upgrading ranks, you will only pay the difference in RGP.
          </Text>
        </HStack>

        <HStack mt={5}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.0026 15.1673C4.04927 15.1673 0.835938 11.954 0.835938 8.00065C0.835938 4.04732 4.04927 0.833984 8.0026 0.833984C11.9559 0.833984 15.1693 4.04732 15.1693 8.00065C15.1693 11.954 11.9559 15.1673 8.0026 15.1673ZM8.0026 1.83398C4.6026 1.83398 1.83594 4.60065 1.83594 8.00065C1.83594 11.4007 4.6026 14.1673 8.0026 14.1673C11.4026 14.1673 14.1693 11.4007 14.1693 8.00065C14.1693 4.60065 11.4026 1.83398 8.0026 1.83398Z"
              fill="#F4BC00"
            />
            <path
              d="M8 9.16732C7.72667 9.16732 7.5 8.94065 7.5 8.66732V5.33398C7.5 5.06065 7.72667 4.83398 8 4.83398C8.27333 4.83398 8.5 5.06065 8.5 5.33398V8.66732C8.5 8.94065 8.27333 9.16732 8 9.16732Z"
              fill="#F4BC00"
            />
            <path
              d="M8.0026 11.3339C7.91594 11.3339 7.82927 11.3139 7.74927 11.2806C7.66927 11.2472 7.59594 11.2006 7.52927 11.1406C7.46927 11.0739 7.4226 11.0072 7.38927 10.9206C7.35594 10.8406 7.33594 10.7539 7.33594 10.6672C7.33594 10.5806 7.35594 10.4939 7.38927 10.4139C7.4226 10.3339 7.46927 10.2606 7.52927 10.1939C7.59594 10.1339 7.66927 10.0872 7.74927 10.0539C7.90927 9.98724 8.09594 9.98724 8.25594 10.0539C8.33594 10.0872 8.40927 10.1339 8.47594 10.1939C8.53594 10.2606 8.5826 10.3339 8.61594 10.4139C8.64927 10.4939 8.66927 10.5806 8.66927 10.6672C8.66927 10.7539 8.64927 10.8406 8.61594 10.9206C8.5826 11.0072 8.53594 11.0739 8.47594 11.1406C8.40927 11.2006 8.33594 11.2472 8.25594 11.2806C8.17594 11.3139 8.08927 11.3339 8.0026 11.3339Z"
              fill="#F4BC00"
            />
          </svg>

          <Text ml={3} fontSize={12} color={'#D9AA0F'}>
          If you are downgrading, you will be rewarded the difference in RGP.
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default MarchantRank;
