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
  Image,
  Button,
} from "@chakra-ui/react";
import WarningIcon from "../../../../assets/warning-2.svg";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NFTModal from "./NFTModal";
const StakingSuccess = ({
  openModal,
  closeModal,
  tokenIds,
  URI,
  selectedRank,
  selectedNftCollection,
  checkRank,
  setCheckRank,
  closeStakeNftModal,
}: {
  openModal: boolean;
  closeModal: () => void;
  URI: string;
  selectedRank: string | undefined;
  selectedNftCollection: string | undefined;
  checkRank: boolean;
  setCheckRank: React.Dispatch<React.SetStateAction<boolean>>;
  closeStakeNftModal: () => void;
  tokenIds: any[];
}) => {
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const textColour2 = useColorModeValue("#008DFF", "#319EF6");
  const lightTextColor = useColorModeValue("#666666", "#DCE6EF");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const [openNFTModal, setOpenNFTModal] = useState(false);
  const [accessWallet, setAccessWallet] = useState(false);

  // const { nftArray, loading } = useNFTFetch(URI);
  const handleProceed = async () => {
    setOpenNFTModal(true);
    setAccessWallet(true);
    closeModal();
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={openModal}
        onClose={closeModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          p={2}
          maxWidth={400}
        >
          <Flex>
            <Link to={"/council/register"}>
              <ArrowBackIcon w={6} h={6} ml={3} color={closeBtnColour} />
            </Link>
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
          <ModalBody
            mt={4}
            flexDirection={"column"}
            textAlign='center'
            alignItems={"center"}
          >
            <Image src={WarningIcon} py={3} margin='auto' />
            <Text color={textColour} fontSize={"20px"} fontWeight={500}>
              Requesting Access...
            </Text>
            <Text color={textColour} fontSize={"16px"} fontWeight={500}>
              Your wallet will be scanned for NFTs
            </Text>
            <Button
              my={3}
              bg={textColour2}
              variant={"brand"}
              fontSize={"14px"}
              fontWeight={500}
              // onClick={() => setOpenNFTModal(!openNFTModal)}
              onClick={() => handleProceed()}
              isFullWidth
            >
              Proceed
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <NFTModal
        // nftArray={nftArray}
        tokenIds={tokenIds}
        URI={URI}
        selectedRank={selectedRank}
        openModal={openNFTModal}
        closeModal={() => setOpenNFTModal(false)}
        accessWallet={accessWallet}
        setAccessWallet={setAccessWallet}
        selectedNftCollection={selectedNftCollection}
        closeAccessModal={closeModal}
        checkRank={checkRank}
        setCheckRank={setCheckRank}
        closeStakeNftModal={closeStakeNftModal}
        // loading={loading}
      />
    </>
  );
};

export default StakingSuccess;
