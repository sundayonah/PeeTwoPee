import {
  Button,
  Box,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
 
  useRadio,
  useRadioGroup,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        my={3}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          //   bg: 'teal.600',
          color: '#319EF6',
          borderColor: "#319EF6",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const BailOutModals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mode = useColorModeValue("light", "dark");

  const [activevalue, setvalue] = useState<string | null>(null);

  const textColor1 = useColorModeValue("#666666", "#999999");
  const textColor2 = useColorModeValue("#333333", "#ffffff");

  const options = ["Unfreeze RGP", "Unfreeze NFT"];
  
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  const TextOptions = {
    "Unfreeze RGP": "Pay 100 RGPs to bail out.",
    "Unfreeze NFT": "Pay 100 RGPs to unfreeze NFT.",
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Unfreeze RGP",
    onChange: (e: string) => setvalue(e),
  });

  const group = getRootProps();

  return (
    <>
      <Button
        onClick={onOpen}
        width="200px"
        size="md"
        variant={"brand"}
        height="48px"
        isFullWidth={isMobileDevice}
      >
        Bail out
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <Flex flexDirection="column" mx={5}>
            <Flex my={2}>
              <ModalCloseButton
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
              />
            </Flex>
          </Flex>
          <Box mx={5} mb={5}>
            <Flex my={7} justifyContent="center" alignContent="center">
              <Text fontWeight={700} fontSize={24} mt={7}>
                To participating in disputes...
              </Text>
            </Flex>

            <Box my={4} {...group}>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard  my={4} key={value} {...radio}>
                 
                    <Text my={2} fontWeight={500} color={activevalue == value ? "#319EF6": textColor2}>
                      {value}
                    </Text>
                    <Text my={2} fontWeight={400} color={activevalue == value ? "#319EF6" : textColor1}>
                      {TextOptions[value]}
                    </Text>
                 
                  </RadioCard>
                );
              })}
            </Box>

            <Button
              disabled={activevalue == null}
              color="white"
              variant={"brand"}
              my={3}
              isFullWidth
            >
              Continue
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BailOutModals;
