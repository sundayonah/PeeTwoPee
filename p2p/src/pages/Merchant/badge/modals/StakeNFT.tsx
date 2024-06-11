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
import NFTAccessModal from "./NFTAccessModal";

import { RANKSBYTES } from "../../../../utils/constants/constants";
import {
  CONTRACT_ADDRESSES,
  CouncilMemberStakeContract,
  GIFTDAPP_NFT,
  LAUNCHPAD_NFT,
  SMARTSWAP_NFT,
  ERC1155Contract,
} from "../../../../utils";
import { useActiveWeb3React } from "../../../../utils/hooks";
import RankRequirements from "../RankRequirements";
import { NFT_ID_RANGE } from "../../../../utils/constants/nftnames";

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
  const [error, seterror] = useState("");

  const [selectedRank, setSelectedRank] = useState<string>();
  const [selectedNftCollection, setSelectedNftCollection] = useState<string>();
  const [selectedCollectionName, setselectedCollectionName] =
    useState<string>();
  const [URI, setURI] = useState("");
  const [tokensOwned, settokensOwned] = useState<any[]>();

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
      const tokenClass = await badgeInfo._tokenClass;

      if (nftAddresses && tokenClass) {
        const result = tokenClass.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / 2);

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = []; // start a new chunk
          }

          resultArray[chunkIndex].push(item);

          return resultArray;
        }, []);

        const selectedNftIndex = nftAddresses.indexOf(selectedNftCollection);

        if (selectedNftIndex !== -1) {
          seterror("");
          const getIds = () => {
            const indexValues = [];
            for (let i = 0; i < result.length; i++) {
              indexValues.push(result[i][selectedNftIndex].toString());
            }
            return indexValues;
          };

          const Ids = getIds();

          const idRanges = () => {
            const idRange = [];
            for (let i = 0; i < Ids.length; i++) {
              idRange.push(
                NFT_ID_RANGE[chainId as number][selectedCollectionName][Ids[i]]
              );
            }
            return idRange;
          };

          const range = idRanges();

          //         const get = (min:number, max:number) =>
          // [...Array(max - min + 1).keys()].map((i) => i + min)

          const getFullRange = () => {
            const fullRange = [];

            for (let i = 0; i < range.length; i++) {
              const newArray = [
                ...Array(range[i][1] - range[i][0] + 1).keys(),
              ].map((j) => j + range[i][0]);
              fullRange.push(newArray);
            }

            return fullRange;
          };

          const fullRange = getFullRange();

          const NFTcontract = await ERC1155Contract(
            selectedNftCollection,
            library
          );

          const getBalances = async () => {
            const balances = [];
            for (let i = 0; i < fullRange.length; i++) {
              const addressArray = Array(fullRange[i].length).fill(account);

              const balance = await NFTcontract.balanceOfBatch(
                addressArray,
                fullRange[i]
              );

              balances.push({ balance, id: fullRange[i] });
            }

            return balances;
          };

          const balances = await getBalances();

          const formattedBalanceArray = [];
          const ownedTokenIdArray = [];
          const indexOfOwned = [];

          for (let i = 0; i < balances.length; i++) {
            const balance = [];
            for (let j = 0; j < balances[i].balance.length; j++) {
              balance.push(balances[i].balance[j].toString());
            }

            formattedBalanceArray.push(balance);
          }

          for (let i = 0; i < formattedBalanceArray.length; i++) {
            const index = [];
            for (let j = 0; j < formattedBalanceArray[i].length; j++) {
              if (formattedBalanceArray[i][j] === "1") {
                index.push(j);
              }
            }

            indexOfOwned.push(index);
          }

          for (let i = 0; i < indexOfOwned.length; i++) {
            const tokenIds = [];

            for (let j = 0; j < indexOfOwned[i].length; j++) {
              tokenIds.push(fullRange[i][indexOfOwned[i][j]]);
            }

            if (tokenIds.length !== 0) {
              ownedTokenIdArray.push(tokenIds);
            }
          }

          if (ownedTokenIdArray.length !== 0) {
            settokensOwned(
              ownedTokenIdArray.length === 1
                ? ownedTokenIdArray
                : ownedTokenIdArray.length === 2
                ? [...ownedTokenIdArray[0]].concat(ownedTokenIdArray[1])
                : ownedTokenIdArray.length === 3
                ? [...ownedTokenIdArray[0]]
                    .concat(ownedTokenIdArray[1])
                    .concat(ownedTokenIdArray[2])
                : ownedTokenIdArray
            );

            setLoading(false);

            setOpenAccessModal(true);
          } else {
            seterror("Insufficient token balance to stake on this rank");
            setLoading(false);
          }

          // for (let i = 0; i < indexes.length; i++) {
          //   ownedTokenIdArray.push(tokenIds[indexes[i]]);
          // }

          // const tokenUri = await NFTcontract.uri(1);
          // const addressArray = Array(tokenIds.length).fill(account);

          // const balance = await NFTcontract.balanceOfBatch(
          //   addressArray,
          //   tokenIds
          // );

          //  
        } else {
          setLoading(false);
          seterror("Insufficient token balance to stake");
        }
      } else {
        setLoading(false);
        seterror("You cannot stake on this rank yet");
      }
      // const URIArray = await badgeInfo.requireURI

      //  
      // const URI =
      //   selectedNftIndex === -1
      //     ? undefined
      //     : badgeInfo._tokenClass[selectedNftIndex];
      //  

      // setURI(URI);
      // setOpenAccessModal(URI ? true : false);
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
              onChange={(e) => {
                setSelectedNftCollection(e.target.value.split(",")[0]);
                setselectedCollectionName(e.target.value.split(",")[1]);
              }}
              // value={selectedNftCollection}
              mb={5}
              bg={bgColour}
              size='lg'
              color={textColour}
              fontSize='14px'
            >
              <option
                value={[LAUNCHPAD_NFT[chainId as number], "LaunchPad"]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                Launchpad NFT Collection
              </option>
              <option
                value={[GIFTDAPP_NFT[chainId as number], "GiftDapp"]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                GiftDapp NFT Collection
              </option>
              <option
                value={[SMARTSWAP_NFT[chainId as number], "SmartSwap"]}
                style={{ backgroundColor: `${bgColour}` }}
              >
                SmartSwap NFT Collection
              </option>
            </Select>
            {error && (
              <Text textAlign={"center"} my={3} color='red' fontSize={"12px"}>
                {error}
              </Text>
            )}
            <Button
              my={error === "" ? 3 : 0}
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
        non_nft={false}
        Badges={[]}
      />
      <NFTAccessModal
        URI={URI}
        tokenIds={tokensOwned}
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
