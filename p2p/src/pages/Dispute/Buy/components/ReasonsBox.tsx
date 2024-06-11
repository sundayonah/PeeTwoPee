import {
  Box,
  Flex,
  HStack,
  Link,
  Text,
  useColorModeValue, 
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { imageREf } from "../DisputeAppeal";

const ReasonsBox = ({
  appealDesc,
  proofObj,
  index
}: {
  appealDesc: string;
  proofObj: imageREf;
  index: number
}) => {
  const activeColour = useColorModeValue("#333333", "#F1F5F8");
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const {t} = useTranslation()


  return (
    <>
      <Box w={"full"} fontSize={14} p={4}>
        <Flex justifyContent="space-between" alignItems={"center"}>
          <Text color={inactiveColour} pt={2}>
            {t('a_mess')}  {index + 2}
          </Text>
        </Flex>

        <Box
          px={3}
          p={3}
          my={3}
          border="0.1px solid"
          rounded="md"
          borderColor="gray.200"
          w={"full"}
        >
          <Box
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#DEE5ED",
                borderRadius: "24px",
              },
            }}
            width={"100%"}
            maxH="120px"
          >
            <Text color={activeColour}>{appealDesc}</Text>
          </Box>
        </Box>
        <Flex justifyContent="space-between" alignItems={"center"}>
         { proofObj && <Text color={inactiveColour} mb={1} mt={2}>
            {t('att')}
          </Text>}
        </Flex>
        {proofObj && (
          <Box p={3} border="0.1px solid" rounded="md" borderColor="gray.200">
            <Flex justifyContent="space-between" alignItems={"center"}>
              <HStack>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2432 15.1669H3.72983C2.7165 15.1669 1.78983 14.6536 1.2565 13.7869C0.723166 12.9203 0.676499 11.8669 1.12983 10.9536L2.2765 8.65361C2.64983 7.90694 3.24983 7.44028 3.92317 7.36694C4.5965 7.29361 5.28317 7.62694 5.80317 8.27361L5.94983 8.46028C6.24317 8.82028 6.58317 9.01361 6.9165 8.98028C7.24983 8.95361 7.5565 8.71361 7.78317 8.30694L9.04317 6.03361C9.56317 5.09361 10.2565 4.60694 11.0098 4.64028C11.7565 4.68028 12.3965 5.24028 12.8232 6.22694L14.9098 11.1003C15.2965 12.0003 15.2032 13.0269 14.6632 13.8469C14.1298 14.6803 13.2232 15.1669 12.2432 15.1669ZM4.10983 8.36694C4.08317 8.36694 4.0565 8.36694 4.02983 8.37361C3.6965 8.40694 3.38983 8.67361 3.16983 9.10694L2.02317 11.4069C1.72317 12.0003 1.7565 12.7003 2.10317 13.2669C2.44983 13.8336 3.06317 14.1736 3.72983 14.1736H12.2365C12.8898 14.1736 13.4698 13.8603 13.8298 13.3136C14.1898 12.7669 14.2498 12.1136 13.9898 11.5136L11.9032 6.64028C11.6498 6.04028 11.2965 5.67361 10.9565 5.66028C10.6432 5.64028 10.2365 5.97361 9.9165 6.54028L8.6565 8.81361C8.26983 9.50694 7.66317 9.94028 7.00317 10.0003C6.34317 10.0536 5.66983 9.73361 5.16983 9.10694L5.02317 8.92028C4.74317 8.55361 4.42317 8.36694 4.10983 8.36694Z"
                    fill="#666666"
                  />
                  <path
                    d="M4.64844 5.83398C3.2751 5.83398 2.14844 4.71398 2.14844 3.33398C2.14844 1.95398 3.26844 0.833984 4.64844 0.833984C6.02844 0.833984 7.14844 1.95398 7.14844 3.33398C7.14844 4.71398 6.02844 5.83398 4.64844 5.83398ZM4.64844 1.83398C3.82177 1.83398 3.14844 2.50732 3.14844 3.33398C3.14844 4.16065 3.82177 4.83398 4.64844 4.83398C5.4751 4.83398 6.14844 4.16065 6.14844 3.33398C6.14844 2.50732 5.4751 1.83398 4.64844 1.83398Z"
                    fill="#666666"
                  />
                </svg>

                <Text>{proofObj.name + "." + proofObj.extension}</Text>
              </HStack>
              <Link isExternal href={proofObj?.uri} color={"#319EF6"}>
                View
              </Link>
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ReasonsBox;
