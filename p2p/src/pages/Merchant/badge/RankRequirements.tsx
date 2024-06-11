import { useState } from "react";
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
  Image,
  Tooltip,
} from "@chakra-ui/react";
import RoyalExecutorLigth from "../../../assets/Legendary.svg";
import LegendaryDark from "../../../assets/Legendary_Badge_Dark.svg";
import Vizier from "../../../assets/Diamond.svg";
import VizierDark from "../../../assets/Diamond_Badge_Dark.svg";
import Earl from "../../../assets/Gold.svg";
import EarlDark from "../../../assets/Gold_Badge_Dark.svg";
import Mage from "../../../assets/Silver.svg";
import MageDark from "../../../assets/Silver_Badge_Dark.svg";
import Cadet from "../../../assets/Bronze_Badge_Light.svg";
import BrozeDark from "../../../assets/Bronze_Badge_Dark.svg";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useRGPPrice } from "../../../utils/hooks";
import { ethers } from "ethers";

const RankRequirements = ({
  openModal,
  closeModal,
  Badges,
  non_nft,
}: {
  openModal: boolean;
  closeModal: () => void;
  Badges?: any[];
  non_nft?: boolean;
}) => {
  const RoyalExecutor = useColorModeValue(RoyalExecutorLigth, LegendaryDark);
  const DiamondBadge = useColorModeValue(Vizier, VizierDark);
  const GoldBadge = useColorModeValue(Earl, EarlDark);
  const SilverBadge = useColorModeValue(Mage, MageDark);
  const BronzeBadge = useColorModeValue(Cadet, BrozeDark);
  const tooltipBgcolor = useColorModeValue("#319EF6", "#319EF6");
  const [RGPPrice] = useRGPPrice();

  const ranksArray = [
    {
      imageUrl: RoyalExecutor,
      title: "Royal Executor",
      text: "Claim Legendary badge by staking an NFT of $10,000 and become a",
    },
    {
      imageUrl: DiamondBadge,
      title: "Vizier",
      text: "Claim Diamond badge by staking an NFT of $4,000 and become a ",
    },
    {
      imageUrl: GoldBadge,
      title: "Earl",
      text: "Claim Gold badge by staking an NFT of $2,500 and become an ",
    },
    {
      imageUrl: SilverBadge,
      title: "Mage",
      text: "Claim Silver badge by staking an NFT of $1,500 and become an ",
    },
    {
      imageUrl: BronzeBadge,
      title: "Cadet",
      text: "Claim Bronze badge by staking an NFT of $500 and become an",
    },
  ];

  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "#DCE6EF");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");

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
              Merchant Badge Requirements
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
          {non_nft ? (
            <ModalBody mt={4} flexDirection={"column"}>
              {Badges.map((badge) => {
                return (
                  <Box border={`1px solid ${borderColor}`} mb={3}>
                    <Box p={2} bg={backgroundColor}>
                      <Image
                        src={
                          badge?.badge.toLowerCase() === "legendary"
                            ? RoyalExecutor
                            : badge?.badge.toLowerCase() === "diamond"
                            ? DiamondBadge
                            : badge?.badge.toLowerCase() === "gold"
                            ? GoldBadge
                            : badge?.badge.toLowerCase() === "silver"
                            ? SilverBadge
                            : badge?.badge.toLowerCase() === "bronze"
                            ? BronzeBadge
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
                          label='Search places'
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
              {ranksArray.map(({ imageUrl, text, title }) => {
                return (
                  <Box border={`1px solid ${borderColor}`} mb={3}>
                    <Box p={2} bg={backgroundColor}>
                      <Image src={imageUrl} />
                    </Box>
                    <Text
                      p={2}
                      color={lightTextColor}
                      fontSize={"14px"}
                      fontWeight={400}
                    >
                      {text}{" "}
                      <span style={{ color: "#319EF6" }}>
                        {title}{" "}
                        <Tooltip
                          hasArrow
                          label='Search places'
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
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RankRequirements;
