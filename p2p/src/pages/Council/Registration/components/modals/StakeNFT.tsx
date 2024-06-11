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
  Link,
  Button,
  Divider,
  Select,
  Spinner,
} from "@chakra-ui/react";
import RankRequirements from "./RankRequirements";
import NFTAccessModal from "./NFTAccessModal";
import {
  RANKSBYTES, 
} from "../../../../../utils/constants/constants";
import {
  SMARTSWAP_NFT,
  LAUNCHPAD_NFT,
  GIFTDAPP_NFT,
  CouncilMemberStakeContract,
  CONTRACT_ADDRESSES,
} from "../../../../../utils";
import { useActiveWeb3React } from "../../../../../utils/hooks";

const StakingSucess = ({
  openModal,
  closeModal,
  checkRank,
  setCheckRank,
}: {
  openModal: boolean;
  closeModal: () => void;
  checkRank: boolean;
  setCheckRank: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chainId, account, library } = useActiveWeb3React();
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "#DCE5EF");
  const badgeHoverBackground = useColorModeValue("#EBF6FE", "");
  const badgeHoverBorder = useColorModeValue("#0760A8", "#4CAFFF");
  const nonActiveBorderColor = useColorModeValue("#DEE5ED", "#4D555E");

  const [openRankModal, setOpenRankModal] = useState(false);
  const [openAccessModal, setOpenAccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedRank, setSelectedRank] = useState<string>();
  const [selectedNftCollection, setSelectedNftCollection] = useState<string>();
  const [URI, setURI] = useState("");

  const handleContinue = async () => {
    try {
      setLoading(true);
      const stakingContract = await CouncilMemberStakeContract(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        library
      );
      const badgeInfo = await stakingContract.getSetsBadgeForMerchant(
        selectedRank
      );
      const nftAddresses = await badgeInfo.tokenAddresses;
      // const URIArray = await badgeInfo.requireURI
      const selectedNftIndex = nftAddresses.indexOf(selectedNftCollection);
      const URI =
        selectedNftIndex === -1
          ? undefined
          : badgeInfo.requireURI[selectedNftIndex];

      setLoading(false);
      setURI(URI);
      setOpenAccessModal(URI ? true : false);
      // URI === undefined ? throw new Error("NFT collection not supported on this rank") : '1'
    } catch (err) {
    
      setLoading(false);
    }
  };

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
            <Text fontSize='16px' fontWeight='500' color={textColour} ml={4}>
              Staking NFT
            </Text>
            <ModalCloseButton
              bg='none'
              color={lightTextColor}
              cursor='pointer'
              _focus={{ outline: "none" }}
              onClick={closeModal}
              border={"1px solid"}
              size={"sm"}
              mr={3}
              p={"7px"}
            />
          </Flex>
          <Divider mt={3} />
          <ModalBody mt={4} flexDirection={"column"} alignItems={"center"}>
            <Text mb={2} color={textColour}>
              Choose Rank
            </Text>
            <Flex flexDirection='row' flexWrap='wrap'>
              {RANKSBYTES
                ? RANKSBYTES.map((badge) => (
                    <Flex
                      cursor='pointer'
                      mb={5}
                      mr={2}
                      p={2}
                      borderRadius='5px'
                      flexDirection='column'
                      border='1px'
                      color='#666666'
                      borderColor={
                        selectedRank === badge.bytes
                          ? badgeHoverBorder
                          : nonActiveBorderColor
                      }
                      backgroundColor={
                        selectedRank === badge.bytes ? badgeHoverBackground : ""
                      }
                      _hover={{
                        backgroundColor: badgeHoverBackground,
                        borderColor: badgeHoverBorder,
                      }}
                      onClick={() => {
                        setSelectedRank(badge.bytes);
                      }}
                    >
                      <Text
                        color={textColour}
                        fontWeight='bold'
                        fontSize='14px'
                      >
                        {badge.name}
                      </Text>
                    </Flex>
                  ))
                : null}
            </Flex>

            <Text
              mb={4}
              fontSize='14px'
              fontWeight={400}
              color={lightTextColor}
            >
              Which of NFT Collection are you staking?
            </Text>
            <Select
              variant='outline'
              placeholder='Choose NFT Collection'
              onChange={(e) => setSelectedNftCollection(e.target.value)}
              // value={selectedNftCollection}
              mb={5}
              bg={bgColour}
              size='lg'
              color={textColour}
              fontSize='14px'
            >
              <option
                value={LAUNCHPAD_NFT[chainId as number]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                Launchpad NFT Collection
              </option>
              <option
                value={GIFTDAPP_NFT[chainId as number]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                GiftDapp NFT Collection
              </option>
              <option
                value={SMARTSWAP_NFT[chainId as number]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                SmartSwap NFT Collection
              </option>
            </Select>
            <Button
              my={3}
              variant={"brand"}
              disabled={!selectedRank || !selectedNftCollection || loading}
              _hover={{ backgroundColor: "" }}
              // onClick={() => setOpenAccessModal(!openAccessModal)}
              onClick={() => handleContinue()}
              isFullWidth
            >
              {loading ? <Spinner /> : "Continue"}
            </Button>
            <Link
              color='#319EF6'
              textDecoration='underline'
              onClick={() => setOpenRankModal(!openRankModal)}
            >
              <Text fontSize='12px' fontWeight={500} textAlign='center' mb={2}>
                See ranking level requirements
              </Text>
            </Link>
          </ModalBody>
        </ModalContent>
      </Modal>
      <RankRequirements
        openModal={openRankModal}
        closeModal={() => setOpenRankModal(false)}
      />
      <NFTAccessModal
        URI={URI}
        selectedRank={selectedRank}
        openModal={openAccessModal}
        closeModal={() => setOpenAccessModal(false)}
        selectedNftCollection={selectedNftCollection}
        checkRank={checkRank}
        setCheckRank={setCheckRank}
        closeStakeNftModal={closeModal}
      />
    </>
  );
};

export default StakingSucess;
