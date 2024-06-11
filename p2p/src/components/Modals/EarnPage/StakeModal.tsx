import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useColorModeValue,
  Text,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../../../state/application";
import { TrxState } from "../../../state/application";
import {
  CONTRACT_ADDRESSES,
  getERC20Token,
  PRGP,
} from "../../../utils";
import { useActiveWeb3React } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";

export default function StakeModal({
  isOpen,
  data,
  onClose,

  stake,
  reload,
}: {
  isOpen: boolean;

  onClose: () => void;
  balance: string;
  allowance: string;
  stake: (stakeValue: string) => void;
  reload: () => void;
  data: any;
}) {
  const [stakeValue, setStakeValue] = useState("");
  const { account, library, chainId } = useActiveWeb3React();

  const dispatch = useDispatch();
  const closeButtonBorderColor = useColorModeValue("#666666", "");
  const descriptionTextColor = useColorModeValue("#666666", "");
  const inputLabelColor = useColorModeValue("#333333", "");
  const inputBgColor = useColorModeValue("#F2F5F8", "");
  const maxTextColor = useColorModeValue("#319EF6", "");
  const {t} = useTranslation()

  const approveToken = async () => {
    try {
      dispatch(
        setOpenModal({
          message: `Requesting for access from your wallet`,
          trxState: TrxState.WaitingForConfirmation,
        })
      );
      const token = await getERC20Token(PRGP[chainId as number], library);
      const balance = await token.balanceOf(account);

      const allowanceTx = await token.approve(
        CONTRACT_ADDRESSES[chainId as number]["REWARD"],
        balance.toString(),
        {
          from: account,
        }
      );

      const { confirmations } = await allowanceTx.wait();

      if (confirmations >= 1) {
        reload();
        dispatch(
          setOpenModal({
            message: `Transaction Approved Successful`,
            trxState: TrxState.TransactionSuccessful,
          })
        );
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
      <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t("stae")} pRGP</ModalHeader>
          <ModalCloseButton
            mt={3}
            border={`1px solid ${closeButtonBorderColor} `}
            size='sm'
          />

          <ModalBody>
            <Text color={descriptionTextColor} fontSize={"14px"}>
              {t("stake_p")}
            </Text>
            <Divider my={2} />

            <Text mt={6} color={inputLabelColor} fontWeight='500'>
              Enter amount
            </Text>
            <InputGroup mt={2}>
              <Input
                value={stakeValue}
                onChange={(e) => {
                  const regex = /^\d+$/;

                  if (regex.test(e.target.value) || e.target.value === "") {
                    setStakeValue(e.target.value);
                  }
                }}
                bgColor={inputBgColor}
                placeholder='Enter amount to stake'
                _placeholder={{ fontSize: "14px" }}
                borderRight='none'
              />
              <InputRightAddon bgColor={inputBgColor} borderLeft='none'>
                <Text cursor={"pointer"} color={maxTextColor} fontSize='12px'>
                  Max
                </Text>
              </InputRightAddon>
            </InputGroup>
            <Text my={3} fontWeight={"500"} fontSize='14px'>
              Balance: {data && data[0]?.prgpTokenBalance} pRGP
            </Text>

            {/* <Flex
              fontSize={"14px"}
              mt={10}
              mb={3}
              justifyContent={"space-between"}
            >
              <Text>Staking Timeframe:</Text>
              <Text>7 Days</Text>
            </Flex>
            <Flex fontSize={"14px"} justifyContent={"space-between"}>
              <Text>Available Quota:</Text>
              <Text>36000 RGP</Text>
            </Flex> */}
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={
                parseFloat(stakeValue) >
                parseFloat(data && data[0]?.prgpTokenBalance)
              }
              width={"100%"}
              variant={"brand"}
              onClick={() => {
                if (
                  parseFloat(data && data[0]?.prgpTokenAllowance) <
                  parseFloat(stakeValue)
                ) {
                  approveToken();
                } else {
                  stake(stakeValue);
                }
              }}
            >
              {parseFloat(stakeValue) >
              parseFloat(data && data[0]?.prgpTokenBalance)
                ? "Insufficient Balance"
                : parseFloat(data && data[0]?.prgpTokenAllowance) <
                  parseFloat(stakeValue)
                ? "Approve pRGP"
                : "Stake"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
