import { useEffect, useState } from "react";
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
  Image,
  Button,
  Divider,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import DumNFT from "../../../../../assets/dumNFT.svg";
import RankRequirements from "./RankRequirements";
import {
  useNFTFetch,
  useNftApproveCheck,
  useFormatURI,
} from "../../../../../utils/hooks/useNFT";
import {
  CONTRACT_ADDRESSES,
  CouncilMemberStakeContract,
  ERC1155Contract,
} from "../../../../../utils";
import { useActiveWeb3React } from "../../../../../utils/hooks";
//import { STAKINGCONTRACTADDRESS } from "../../../../../utils/constants/constants";
import { useDispatch } from "react-redux";
import { setOpenModal, TrxState } from "../../../../../state/application";
import { UPDATE_RANK } from "../../../../account/gql/mutations";
import { useMutation } from "@apollo/client";

const StakingSucess = ({
  openModal,
  closeModal,
  // nftArray,
  // loading,
  URI,
  selectedRank,
  accessWallet,
  setAccessWallet,
  selectedNftCollection,
  closeAccessModal,
  checkRank,
  setCheckRank,
  closeStakeNftModal,
}: {
  openModal: boolean;
  closeModal: () => void;
  closeAccessModal: () => void;
  closeStakeNftModal: () => void;
  // nftArray: number[] | undefined;
  // loading: boolean;
  URI: string;
  selectedRank: string | undefined;
  accessWallet: boolean;
  setAccessWallet: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNftCollection: string | undefined;
  checkRank: boolean;
  setCheckRank: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { account, library,chainId } = useActiveWeb3React();
  const mode = useColorModeValue("light", "dark");
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const lightTextColor = useColorModeValue("#666666", "#DCE5EF");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const selectedTextColor = useColorModeValue("#3181CE", "#3181CE");
  const [openRankModal, setOpenRankModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [tokenId, setTokenId] = useState<number>();
  const dummyData = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { nftArray, loading, newUri } = useNFTFetch(
    URI,
    accessWallet,
    setAccessWallet,
    selectedNftCollection
  );

  const { formattedTokenUri } = useFormatURI(nftArray, newUri);

  const dispatch = useDispatch();

  const { isApproved } = useNftApproveCheck(
    selectedNftCollection,
    tokenId,
    reload,
    setReload
  );
  const [updateRank, { loading:load, error, data }] = useMutation(UPDATE_RANK, {
    variables: {
        chain:`${chainId}`
      },
  });

  const approveNft = async () => {
    try {
      if (selectedNftCollection) {
        dispatch(
          setOpenModal({
            message: t('wallet_req'),
            trxState: TrxState.WaitingForConfirmation,
          })
        );
        const NftContract = await ERC1155Contract(
          selectedNftCollection,
          library
        );
        const approveTx = await NftContract.setApprovalForAll(
          CONTRACT_ADDRESSES[chainId]["STAKING"],
          true,
          {
            from: account,
          }
        );
        const { confirmations } = await approveTx.wait(1);
        if (confirmations >= 1) {
         
          await updateRank()
          
          // setReload(true);
        }
      }
    } catch (err) {
    
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  useEffect(()=>{
    if(data){
      dispatch(
        setOpenModal({
          message: `Transaction Approved Successful`,
          trxState: TrxState.TransactionSuccessful,
        })
      );
      closeModal();
      setReload(true);
 
    }
  },[data])
  const handleStakeNft = async () => {
    try {
      dispatch(
        setOpenModal({
          message: t('wallet_req'),
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const stakingContract = await CouncilMemberStakeContract(
        CONTRACT_ADDRESSES[chainId]["STAKING"],
        library
      );

      const stakingTx = await stakingContract.earnNFTBadge(
        selectedRank,
        tokenId,
        {
          from: account,
        }
      );
      const { confirmations } = await stakingTx.wait(1);
      if (confirmations >= 1) {
        dispatch(
          setOpenModal({
            message: `Transaction Approved Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
        closeModal();
        closeAccessModal();
        closeStakeNftModal();
        setCheckRank(true);
      }
    } catch (err) {
    
      dispatch(
        setOpenModal({
          message: ``,
          trxState: TrxState.TransactionFailed,
        })
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onClose={closeModal}
        isCentered
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          maxWidth={400}
        >
          <Flex mt={2}>
            <Text fontSize='16px' fontWeight='500' color={textColour} ml={4}>
              Stake NFT
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
            {loading ? (
              <Flex
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
              >
                <Spinner
                  thickness='4px'
                  speed='0.53s'
                  emptyColor='transparent'
                  color='#319EF6'
                  size='xl'
                  width='80px'
                  height='80px'
                  my={10}
                />
                <Text mb={10} fontSize='16px'>
                  Scanning Wallet for NFTs
                </Text>
              </Flex>
            ) : (
              <>
                <Text fontSize='16px' fontWeight={500} color={lightTextColor}>
                  NFTs Found
                </Text>
                <Text
                  mb={4}
                  fontSize='14px'
                  fontWeight={400}
                  color={lightTextColor}
                >
                  Select the NFT you want to stake below
                </Text>
                <Box borderRadius='6px' overflowY='auto'>
                  <SimpleGrid columns={[1, 1, 2, 3]}>
                    {formattedTokenUri &&
                      formattedTokenUri.map((item) => {
                        return (
                          <Box
                            cursor='pointer'
                            onClick={() => setTokenId(item.tokenId)}
                          >
                            <Image
                              src={item.image == "" ? DumNFT : item.image}
                            />
                            <Text
                              fontSize='14px'
                              fontWeight={500}
                              color={
                                tokenId === item.tokenId
                                  ? selectedTextColor
                                  : textColour
                              }
                            >
                              #{item.tokenId}
                            </Text>
                          </Box>
                        );
                      })}
                  </SimpleGrid>
                </Box>

                {!isApproved ? (
                  <Button
                    my={3}
                    disabled={!tokenId}
                    variant={"brand"}
                    onClick={() => approveNft()}
                    isFullWidth
                  >
                    Approve Transaction
                  </Button>
                ) : (
                  <Button
                    my={3}
                    disabled={!tokenId}
                    variant={"brand"}
                    onClick={() => handleStakeNft()}
                    isFullWidth
                  >
                    Stake
                  </Button>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <RankRequirements
        openModal={openRankModal}
        closeModal={() => setOpenRankModal(false)}
      />
    </>
  );
};

{
  /* <Link
              color='#319EF6'
              textDecoration='underline'
              onClick={() => setOpenRankModal(!openRankModal)}
            >
              <Text fontSize='12px' fontWeight={500} textAlign='center' mb={2}>
                See ranking level requirements
              </Text>
            </Link> */
}

export default StakingSucess;
