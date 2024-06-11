import {
  Modal,
  ModalCloseButton,
  ModalContent,
  Text,
  ModalOverlay,
  useColorModeValue,
  ModalBody,
  Flex,
  Button,
  Divider,
  HStack,
  Spacer,
  Img,
} from "@chakra-ui/react";
import { AdsObj, IBankDetails } from "../myAds/AdsType";
import { formatDecimalNumber } from "../../../utils/functions/util";
import { useTranslation } from "react-i18next";

const ComfirmAdsPost = ({
  openModal,
  closeModal,
  AdInfo,
  sendTransaction,
  currency,
  hasTokenBeenApproved,
  sellApproval,
  hasRGPBeenApproved,
  approveRGP,
  assetPrice,
  isEdit,
}: {
  openModal: boolean;
  closeModal: () => void;
  sendTransaction: () => void;
  AdInfo: AdsObj & {
    paymentMethod: string;
    accountDet: IBankDetails | undefined;
  };
  hasTokenBeenApproved: boolean;
  sellApproval: any;
  approveRGP: any;
  currency: any;
  hasRGPBeenApproved: boolean;
  assetPrice: any;
  isEdit: boolean;
}) => {
  const bgColour = useColorModeValue("#FFFFFF", "#15202B");
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");
  const textColour = useColorModeValue("#333333", "#F1F5F8");
  const headerTextColor = useColorModeValue("#666666", "#4CAFFF");
  const buyTextColor = useColorModeValue("#00C516", "#00C516");
  const sellTextColor = useColorModeValue("#FF3358", "#FF3358");
  const { t } = useTranslation()
  return (
    <>
      <Modal isOpen={openModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent
          bg={bgColour}
          color='#fff'
          borderRadius='6px'
          paddingBottom='15px'
          // width={448}
        >
          <ModalCloseButton
            bg='none'
            color={closeBtnColour}
            cursor='pointer'
            _focus={{ outline: "none" }}
            onClick={closeModal}
            border={"1px solid"}
            size={"sm"}
            mt={3}
            mr={3}
            p={"7px"}
          />

          <ModalBody mt={10} flexDirection={"column"}>
            <Text fontSize='20px' fontWeight='700' py={3} color={textColour}>
              {t('confirm_detail')}
            </Text>

            <Text
              mt={7}
              fontWeight='500'
              color={headerTextColor}
              fontSize='20px'
            >
              {t('trade_type_price')}
            </Text>
            <Divider my={2} />

            <HStack my={3}>
              <Flex flexDirection={"column"}>
                <Text fontWeight={400} fontSize={14} color={closeBtnColour}>
                  {t('trade_type')}
                </Text>
                <Text
                  fontWeight={500}
                  fontSize={20}
                  color={AdInfo.type === "buy" ? buyTextColor : sellTextColor}
                >
                  {AdInfo.type === "buy" ? "BUY" : "SELL"}
                </Text>
                <Text
                  mt={3}
                  fontWeight={400}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('price_type')}
                </Text>
                <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                  {AdInfo.price_type}
                </Text>
              </Flex>

              <Spacer />
              <Flex flexDirection={"column"}>
                <Text fontWeight={400} fontSize={14} color={closeBtnColour}>
                  {t('cryptocurrency')}
                </Text>
                <Flex>
                  {AdInfo.token_logo && (
                    <Img
                      src={`${AdInfo.token_logo}`}
                      width='22px'
                      height='22px'
                      mr='10px'
                      mt='4px'
                      alt={AdInfo.asset?.slice(0, 2)}
                    />
                  )}{" "}
                  <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                    {AdInfo.asset}
                  </Text>
                </Flex>

                <Text
                  mt={3}
                  fontWeight={400}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('my_price')}
                </Text>
                <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                  {AdInfo.price_type === "FLOATING"
                    ? formatDecimalNumber(
                        assetPrice * (AdInfo.price_percent / 100)
                      )
                    : AdInfo.price_type === "Floating"
                    ? formatDecimalNumber(
                        assetPrice * (AdInfo.price_percent / 100)
                      )
                    : formatDecimalNumber(AdInfo.price)}
                </Text>
              </Flex>
              <Spacer />
              <Flex flexDirection={"column"}>
                <Text fontWeight={400} fontSize={14} color={closeBtnColour}>
                  {t('fiat_cur')}
                </Text>
                <Text
                  fontWeight={500}
                  fontSize={20}
                  color={closeBtnColour}
                  display='flex'
                >
                  {currency.logo && (
                    <Img
                      src={`${currency.logo}`}
                      width='24px'
                      height='18px'
                      mr='10px'
                      mt='8px'
                      alt={currency.name?.slice(0, 2)}
                    />
                  )}{" "}
                  {isEdit ? AdInfo.fiat : currency.currency}
                </Text>
                <Text
                  mt={3}
                  fontWeight={400}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('price_margin')}
                </Text>
                <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                  {AdInfo.price_percent}
                </Text>
              </Flex>
            </HStack>

            <Text
              mt={7}
              fontWeight='500'
              color={headerTextColor}
              fontSize='20px'
            >
              {t('total_amt')}
            </Text>
            <Divider my={2} />

            <HStack>
              <Flex flexDirection={"column"}>
                <Text fontWeight={400} fontSize={14} color={closeBtnColour}>
                  {t('quantity')}
                </Text>
                <Flex>
                  <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                    {formatDecimalNumber(AdInfo.crypto_amount)}
                  </Text>
                  <Text
                    fontWeight={400}
                    fontSize={14}
                    p={2}
                    color={closeBtnColour}
                  >
                    {AdInfo.asset}
                  </Text>
                </Flex>
                <Text
                  pt={3}
                  fontWeight={400}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('payment_method')}
                </Text>
                <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                  {AdInfo.paymentMethod}
                </Text>
              </Flex>

              <Spacer />
              <Flex flexDirection={"column"}>
                <Text
                  fontWeight={400}
                  mt={2}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('trade_limits')}
                </Text>

                <Flex>
                  <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                    {formatDecimalNumber(AdInfo.limit_min)} -{" "}
                    {formatDecimalNumber(AdInfo.limit_max)}
                  </Text>

                  <Text
                    fontWeight={400}
                    p={2}
                    fontSize={14}
                    color={closeBtnColour}
                  >
                    {AdInfo.fiat}
                  </Text>
                </Flex>

                <Text
                  pt={3}
                  fontWeight={400}
                  fontSize={14}
                  color={closeBtnColour}
                >
                  {t('time_limit')}
                </Text>
                <Flex>
                  <Text fontWeight={500} fontSize={20} color={closeBtnColour}>
                    {AdInfo.duration}
                  </Text>

                  <Text
                    fontWeight={400}
                    p={2}
                    fontSize={14}
                    color={closeBtnColour}
                  >
                    MIN
                  </Text>
                </Flex>
              </Flex>
              <Spacer />
            </HStack>

            <Button
              mt={8}
              variant={"brand"}
              isFullWidth
              onClick={() => sendTransaction()}
            >
              {isEdit ? t('edit_ads') : t('post_ads')}
            </Button>

            <Button
              onClick={closeModal}
              variant={"outline"}
              mt={3}
              _hover={{ borderColor: "#666666" }}
              backgroundColor={"#F2F5F8"}
              color={"#666666"}
              isFullWidth
            >
              {t('cancel')}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComfirmAdsPost;
