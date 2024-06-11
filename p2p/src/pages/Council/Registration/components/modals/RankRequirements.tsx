import React from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  ModalOverlay,
  useColorModeValue,
  ModalBody,
  Flex,
  Box,
  Divider,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useRGPPrice } from "../../../../../utils/hooks";
import { ethers } from "ethers";
import RoyalExecutorLigth from "../../../../../assets/Legendary.svg";
import LegendaryDark from "../../../../../assets/Legendary_Badge_Dark.svg";
import Vizier from "../../../../../assets/Diamond.svg";
import VizierDark from "../../../../../assets/Diamond_Badge_Dark.svg";
import Sapphire from "../../../../../assets/sapphire.svg";
import SapphireDark from "../../../../../assets/Sapphire_Dark.svg";

import Amber from "../../../../../assets/amber.svg";
import AmberDark from "../../../../../assets/Amber_Dark.svg";
import Emerald from "../../../../../assets/emerald.svg";
import EmeraldDark from "../../../../../assets/Emerald_Dark.svg";


const RankRequirements = ({
  openModal,
  closeModal,
  Badges,
  merchant,
}: {
  openModal: boolean;
  closeModal: () => void;
  Badges: any[];
  merchant?: boolean;
}) => {
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "#DCE6EF");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const tooltipBgcolor = useColorModeValue("#319EF6", "#319EF6");

  const RoyalExecutor = useColorModeValue(RoyalExecutorLigth, LegendaryDark);
  const DiamondBadge = useColorModeValue(Vizier, VizierDark);
  const SapphireBadge = useColorModeValue(Sapphire, SapphireDark);
  const AmberBadge = useColorModeValue(Amber, AmberDark);
  const EmeraldBadge = useColorModeValue(Emerald, EmeraldDark);

  const [RGPPrice] = useRGPPrice();

  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          maxWidth={400}
        >
          <Flex mt={2}>
            <Text fontSize='20px' fontWeight='400' color={textColour} ml={4}>
              Ranking Requirements
            </Text>
            <ModalCloseButton
              bg='none'
              color={closeBtnColour}
              cursor='pointer'
              _focus={{ outline: "none" }}
              onClick={closeModal}
              border={"1px solid"}
              size={"sm"}
              mr={3}
              p={"7px"}
            />
          </Flex>

          <Divider orientation='horizontal' mt={4} />

          {merchant ? (
            <ModalBody mt={4} flexDirection={"column"}>
              {Badges?.map((badge) => {
                return (
                  <Box border={`1px solid ${borderColor}`} mb={3}>
                    <Box p={2} bg={backgroundColor}>
                      <Image
                        h='24px'
                        mb={2}
                        src={
                          badge?.rank.toLowerCase() === "royal executor"
                            ? RoyalExecutor
                            : badge?.rank.toLowerCase() === "vizier"
                            ? DiamondBadge
                            : badge?.rank.toLowerCase() === "earl"
                            ? SapphireBadge
                            : badge?.rank.toLowerCase() === "mage"
                            ? AmberBadge
                            : badge?.rank.toLowerCase() === "cadet"
                            ? EmeraldBadge
                            : null
                        }
                      />
                    </Box>
                    <Text
                      p={2}
                      color={lightTextColor}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      {`You need to stake $${
                        parseFloat(RGPPrice as string) *
                        parseFloat(ethers.utils.formatEther(badge?.min))
                      } in $RGP and become a `}
                      <span
                        style={{
                          color: "#319EF6",
                          textTransform: "capitalize",
                        }}
                      >
                        {badge?.rank.toLowerCase()}{" "}
                        <Tooltip
                          hasArrow
                          label={`${badge.rank} (Can vote on disputes $0 - $${
                            parseFloat(RGPPrice as string) *
                            parseFloat(
                              ethers.utils.formatEther(badge?.maxToJoin)
                            )
                          } )`}
                          bg={tooltipBgcolor}
                        >
                          <InfoOutlineIcon
                            cursor={"pointer"}
                            color={lightTextColor}
                          />
                        </Tooltip>
                      </span>
                    </Text>
                  </Box>
                );
              })}
            </ModalBody>
          ) : (
            <ModalBody mt={4} flexDirection={"column"}>
              {Badges?.map((badge) => {
                return (
                  <Box border={`1px solid ${borderColor}`} mb={3}>
                    <Text
                      p={2}
                      bg={backgroundColor}
                      color={lightTextColor}
                      fontSize={"14px"}
                      fontWeight={500}
                    >
                      <Text
                        textTransform={"capitalize"}
                        color='#4CAFFF'
                        display='inline'
                      >
                        {badge.rank?.toLowerCase()}
                      </Text>{" "}
                      (
                      {`Can vote on disputes $0 - $${
                        parseFloat(RGPPrice as string) *
                        parseFloat(ethers.utils.formatEther(badge?.maxToJoin))
                      }`}
                      )
                    </Text>
                    <Text
                      p={2}
                      color={lightTextColor}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      {`You need to stake $${
                        parseFloat(RGPPrice as string) *
                        parseFloat(ethers.utils.formatEther(badge?.min))
                      } in $RGP`}
                    </Text>
                  </Box>
                );
              })}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RankRequirements;
