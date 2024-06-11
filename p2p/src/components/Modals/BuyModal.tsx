import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerInformation from "../../pages/Sell/components/SellerInformation";
import ListedColoredText from "../ListedColorText";
import { useDispatch } from "react-redux";
import { setOrderInfo } from "../../state/tradeInfo";

type IModal = {
  openModal: boolean;
  setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
  termAndCondition: string[];
  priceObject: any;
  orderId: string;
  fiat: string;
  asset: string;
  price: number;
};

const BuyModal = ({
  openModal,
  setShowAccountModal,
  termAndCondition,
  priceObject,
  fiat,
  orderId,
  asset,
  price,
}: IModal) => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const tokenListTrgiggerBgColor = useColorModeValue("#666", "#ffffff");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#FFF", "#324D68");
  const {  onClose } = useDisclosure();
  const [amountToPay, setAmountToPay] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleCloseModal() {
    setShowAccountModal(false);
  }

  const sellerInformation = {
    username: "GabrielS",
    badge: "G",
    img: "",
    orderCompleted: 45,
    orderPercentage: 34.6,
    status: "offline",
  };

  const handleBuyButton = () => {
    dispatch(
      setOrderInfo({
        id: orderId,
        amountToPay,
        amountToReceive,
        fiat,
        asset,
        price,
      })
    );
    navigate(`/buy/order/${orderId}`);
  };

 
  return (
    <Modal  isOpen={openModal} onClose={onClose} isCentered size='4xl'>
      <ModalOverlay />

      <ModalContent
        bg='transparent'
        color='#fff'
        borderRadius='6px'
        p='-80px'
        boxShadow='0'
        mt={isMobileDevice ? "600px" : "0px"}
      >
        <ModalCloseButton
          onClick={handleCloseModal}
          border='2px #666 solid'
          m='4'
          color={tokenListTrgiggerBgColor}
        />
        <ModalBody>
          <Grid
            templateColumns={isMobileDevice ? "repeat(1,1fr)" : "repeat(2,1fr)"}
          >
            <GridItem background={backgroundColor} p='40px'>
              <SellerInformation seller={sellerInformation} />
              <Box 
         my={4}>
                <ListedColoredText
                  disputeInfo={termAndCondition}
                  background='#fff'
                  overflow={true}
                  header='Terms & Conditions'
                />
                <Box>
                  {Object.keys(priceObject).map((item, index: number) => {
                    return (
                      <Flex
                        justifyContent='space-between'
                        my={3}
                        fontSize='12px'

                        key={index}
                      >
                        <Box color={tokenListTrgiggerBgColor}>{item}</Box>
                        <Box
                          color={item === "Price" ? "#0CCB80" : textColour}
                          fontWeight='500'
                        >
                          {typeof priceObject[
                            item as keyof typeof priceObject
                          ] !== "object"
                            ? priceObject[item as keyof typeof priceObject]
                            : priceObject[
                                item as keyof typeof priceObject
                              ].join(" - ")}{" "}
                          {item === "Price" && fiat}
                        </Box>
                      </Flex>
                    );
                  })}
                </Box>
              </Box>
            </GridItem>
            <GridItem background={borderColor} p='40px'>
              <Box>
                <Text fontSize='14px' color={textColour} mb={2}>
                  I want to pay 
                </Text>
                <InputGroup size='sm' width='100%'>
                  <Input
                    placeholder={priceObject["Limits"].join(" - ")}
                    height='40px'
                    value={amountToPay}
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setAmountToPay(e.target.value);
                       
                        setAmountToReceive(
                          e.target.value !== ""
                            ? (
                                parseFloat(e.target.value) /
                                parseFloat(priceObject?.Price)
                              ).toString()
                            : ""
                        );
                      }
                    }}
                  />
                  <InputRightAddon
                    children={"NGN"}
                    height='40px'
                    color={tokenListTrgiggerBgColor}
                  />
                </InputGroup>
              </Box>
              <Box my={9}>
                <Text fontSize='14px' color={textColour} mb={2}>
                  I will recieve
                </Text>
                <InputGroup size='sm' width='100%'>
                  <Input
                    placeholder={priceObject["Limits"].join(" - ")}
                    height='40px'
                    disabled
                    value={amountToReceive}
                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setAmountToReceive(e.target.value);
                      }
                    }}
                  />
                  <InputRightAddon
                    children={priceObject?.token}
                    height='40px'
                    color={tokenListTrgiggerBgColor}
                  />
                </InputGroup>
              </Box>
              <Flex justifyContent='space-between'>
                <Button
                  borderRadius='6px'
                  variant='outline'
                  border={`1px solid #666`}
                  color={tokenListTrgiggerBgColor}
                  p='9px 45px'
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  borderRadius='6px'
                  background='#0CCB80'
                  color='white'
                  p='9px 45px'
                  _hover={{
                    background: "#068754",
                  }}
                  disabled={!amountToReceive || !amountToPay}
                  onClick={() => handleBuyButton()}
                >
                  Buy {priceObject?.token}
                </Button>
              </Flex>
              <Text mt={8} color={tokenListTrgiggerBgColor} fontSize='12px'>
                Please complete the payment within 30 minutes(s). The
                transaction will automatically be cancelled if not completed
                within this time frame.
              </Text>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyModal;
