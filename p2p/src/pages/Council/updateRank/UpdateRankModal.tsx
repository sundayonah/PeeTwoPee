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
  useRadio, 
  useMediaQuery,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React  from "react";
import CouncilMemberRole from "./components/CouncilMemberRole";
import MarchantRank from "./components/MarchantRank";

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
          color: "#319EF6",
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

const UpdateRankModal = ({
  openUpdateRankModal,
  onClose,
}: {
  openUpdateRankModal: boolean;
  onClose: () => void;
}) => {
  const mode = useColorModeValue("light", "dark");
  const textColor1 = useColorModeValue("#666666", "#999999");
  const textColor2 = useColorModeValue("#333333", "#ffffff");
  const options = ["Unstake RPG", "Unstake NFT"];
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <Modal isOpen={openUpdateRankModal} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent p={5}>
              <ModalCloseButton
              mt={4}
              mr={6}
                border={
                  mode === "dark" ? "1px solid #FFF" : "1px solid #666666"
                }
              />
       
          <Box mx={5} mb={5}>
            <Flex my={7} justifyContent="center" alignContent="center">
              <Text fontWeight={700} fontSize={24} mt={7}>
                Update Rank
              </Text>
            </Flex>

            <Tabs>
              <TabList>
                <Tab><Text ml={-4}>Merchant rank</Text></Tab>
                <Tab>Council member role</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <MarchantRank />
                </TabPanel>
                <TabPanel>
                  <CouncilMemberRole />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateRankModal;
