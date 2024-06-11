import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { screanId, setActiveBar } from "../../../../state/accountUi";
import ChooseNetwork from "../../../../components/Modals/NetworkConnection/ChooseNetwork";
import { useCallback, useMemo, useState } from "react";
import { shortenAddress } from "../../../../utils";
import CountryModal from "../CountryModal";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { VERIFY_USER_RECORD } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { setPersonalInfo } from "../../../../state/merchant/index";
import { addToast } from "../../../../components/Toast/toastSlice";
import WalletModal from "../../../../components/Navbar/modals/walletModal";

import NetworkModal from "../../../../components/Navbar/modals/networkModal";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useValidUser } from "../../../../utils/hooks/useValidUser";
import { RootState } from "../../../../state/store";
import { useTranslation } from "react-i18next";

const CreatAnAccount = () => {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const registerInput = useSelector(
    (state: RootState) => state.merchantUi.registerInput
  );
  const [openNetModal, setOpneNetModal] = useState(false);
  // const { account } = useActiveWeb3React();
  const [openModal, setOpenModal] = useState(false);
  const [countryCode, setCountryCode] = useState("+234");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fullName, setFullName] = useState(registerInput?.fullName);
  const [userName, setUserName] = useState(registerInput?.userName);
  const [emailAddress, setemailAddress] = useState(registerInput?.email);
  const [referrerAddress, setReferrerAddress] = useState(
    registerInput?.referrerAddress
  );
  const [phone, setPhone] = useState(registerInput.phone);
  const [errorMessage, setErroMessage] = useState("");

  const { valid: isValidUser } = useValidUser(referrerAddress);

  const { referralID } = useParams();

  useMemo(() => {
    if (referralID) {
      setReferrerAddress(referralID);
    }
  }, [referralID]);

  const { account } = useActiveWeb3React();

  const [verifyUserRecord, { data, loading, error }] = useMutation(
    VERIFY_USER_RECORD,
    {
      variables: {
        params: {
          address: account,
          phone: `${countryCode}${phone}`,
          country_code: countryCode,
          username: userName,
          email: emailAddress,
        },
      },
      onCompleted: (data) => {
        if (data?.verifyUserRecord.status === true) {
          dispatch(
            setPersonalInfo({
              address: account,
              country_code: countryCode,
              phone: phone,
              fullName: fullName,
              userName: userName,
              referrerAddress: referrerAddress,
              emailAddress: emailAddress,
            })
          );
          dispatch(setActiveBar(screanId.VERIFYNUMBER));
        } else if (data?.verifyUserRecord.status === false) {
          // alert(data?.verifyUserRecord.message);
          dispatch(
            addToast({ message: data?.verifyUserRecord.message, error: true })
          );
        }
      },
    }
  );

  useMemo(() => {
    if (errorMessage !== "") {
      alert(errorMessage);
    }
  }, [errorMessage]);

  // useMemo(() => {
  //   let errror;
  //   if (data?.verifyUserRecord.status === true) {
  //     dispatch(
  //       setPersonalInfo({
  //         address: account,
  //         country_code: countryCode,
  //         phone: phone,
  //         fullName: fullName,
  //         userName: userName,
  //         referrerAddress: referrerAddress,
  //         emailAddress: emailAddress
  //       })
  //     );
  //     dispatch(setActiveBar(screanId.PAYMETHOD));
  //   } else if (!loading && data?.verifyUserRecord.status === false) {
  //     // alert(data?.verifyUserRecord.message);
  //     dispatch(
  //       addToast({ message: data?.verifyUserRecord.message, error: true })
  //     );
  //   }
  // }, [data]);

  const handleContinue = useCallback(
    async (referrerAddress: string, isValidUser: boolean) => {
      if (referrerAddress) {
        const isAddress = ethers.utils.isAddress(referrerAddress);
        if (isAddress) {
          if (isValidUser) {
            await verifyUserRecord();
          } else {
            dispatch(
              addToast({
                message: "Referrer is not a user",
                error: true,
              })
            );
          }
        } else {
          dispatch(
            addToast({ message: "Incorrect Referrer Address", error: true })
          );
        }
      } else {
        await verifyUserRecord();
      }
    },
    [data, loading]
  );
  const bgColor = useColorModeValue("#F2F5F8", "#213345");

  const [displayNetwork, setDisplayNetwork] = useState(false);
  const [displayWallet, setDisplayWallet] = useState(false);

  return (
    <>
      <Text
        fontSize='20px'
        fontWeight={400}
        color={mode === "dark" ? "white" : "#333333"}
      >
        {t('create_account')}
      </Text>
      <Text
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        pt={2}
      >
        {t('create_acct_text')}
      </Text>
      <Flex
        mt={5}
        color='#fff'
        // h='100px'
        mb='10px'
       flexDirection={"column"}
       justifyContent='center'
       alignItems='center'
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      >
        <Text
          py={2}
          fontSize='14px'
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
        >
          {account ? t('connected') : t('connect_your_wallet_text')}
        </Text>

        {account ? (
          <>
            <Button
              onClick={() => {
                setDisplayWallet((state) => !state);
              }}
              mt={3}
              data-tut='reactour__WalletConnect'
              variant='brand'
              width={"50%"}
              my={3}
              bg={"transparent"}
              border={"1px solid #319EF6"}
              color='#319EF6'
              _hover={{ backgroundColor: "transparent" }}
            >
              {shortenAddress(account)}
            </Button>
            <WalletModal
              displayWallet={displayWallet}
              accounts={account}
              setDisplayWallet={setDisplayWallet}
            />
          </>
        ) : (
          <>
            <Button
              mt={3}
              data-tut='reactour__WalletConnect'
              rightIcon={<IoWalletOutline />}
              variant='brand'
              width={"50%"}
              my={3}
              onClick={() => setDisplayNetwork(true)}
            >
              {t('connect_wallet')}
            </Button>
            <NetworkModal
              displayNetwork={displayNetwork}
              setDisplayNetwork={setDisplayNetwork}
            />
          </>
        )}
      </Flex>

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
        {t('fn')}
      </Text>
      <Flex
        display={account ? "none" : undefined}
        color='#fff'
        h='50px'
        flexDirection={"column"}
        justifyContent='center'
        alignItems='center'
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      ></Flex>
      <Input
        mb={3}
        value={fullName}
        onChange={(e) => {
          const re = /^[a-zA-Z ]*$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setFullName(e.target.value);
          }
        }}
        placeholder='Enter fullname'
        display={account ? undefined : "none"}
        _focus={{ borderColor: "none" }}
      />

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
        {t('un')}
      </Text>
      <Flex
        display={account ? "none" : undefined}
        color='#fff'
        h='50px'
        flexDirection={"column"}
        justifyContent='center'
        alignItems='center'
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      ></Flex>

      <Input
        value={userName}
        onChange={(e) => {
          const re = /^[a-zA-Z ]*$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setUserName(e.target.value);
          }
        }}
        placeholder='Enter username'
        display={account ? undefined : "none"}
        _focus={{ borderColor: "none" }}
      />

      <Flex
        mt={2}
        color='#fff'
        flexDirection={"row"}
        // justifyContent='center'
        alignItems='center'
        mb={3}
      >
        <AiOutlineExclamationCircle color='#EEC749' />

        <Text pl={2} fontSize={12} color={"#EEC749"}>
         {t('un_text')}
        </Text>
      </Flex>

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
        {t('email_address')}
      </Text>
      <Flex
        display={account ? "none" : undefined}
        color='#fff'
        h='50px'
        flexDirection={"column"}
        justifyContent='center'
        alignItems='center'
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      ></Flex>
      <Input
        value={emailAddress}
        type={"email"}
        onChange={(e) => {
          setemailAddress(e.target.value);
        }}
        mb={3}
        placeholder='Enter email address'
        display={account ? undefined : "none"}
        _focus={{ borderColor: "none" }}
      />

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
        {t('ref_address')}
      </Text>
      <Flex
        display={account ? "none" : undefined}
        color='#fff'
        h='50px'
        flexDirection={"column"}
        justifyContent='center'
        alignItems='center'
        backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
        border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
        borderRadius='6px'
      ></Flex>
      <Input
        value={referrerAddress}
        onChange={(e) => {
          const re = /^[a-zA-Z0-9]*$/;
          if (e.target.value === "" || re.test(e.target.value)) {
            setReferrerAddress(e.target.value);
          }
        }}
        placeholder='Referrer Address'
        display={account ? undefined : "none"}
        _focus={{ borderColor: "none" }}
      />

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={3}
      >
        {t('mo_no.')}
      </Text>

      <Flex mt={2} color='#fff' mb='10px' flexDirection={"row"}>
        <Flex
          color='#fff'
          h='50px'
          cursor='pointer'
          // width={"23%"}
          px={2}
          flexDirection={"row"}
          backgroundColor={
            !account
              ? mode === "dark"
                ? "#213345"
                : "#F2F5F8"
              : mode === "dark"
              ? "#213345"
              : "#fff"
          }
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
          alignItems='center'
          onClick={() => {
            if (account) {
              setOpenModal(true);
            }
          }}
        >
          {account ? (
            <Text
              fontSize={14}
              p={3}
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
            >
              {countryCode}
            </Text>
          ) : (
            <Text
              fontSize={14}
              p={3}
              color={mode === "dark" ? "#DCE5EF" : "#999999"}
            >
              {countryCode}
            </Text>
          )}
          <ChevronDownIcon color='#666666' />
        </Flex>
        <Box
          color='#fff'
          display={account ? "none" : undefined}
          h='50px'
          width={"74%"}
          ml={4}
          flexDirection={"column"}
          justifyContent='center'
          alignItems='center'
          backgroundColor={mode === "dark" ? "#213345" : "#F2F5F8"}
          border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
          borderRadius='6px'
        ></Box>
        <Input
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          pattern='[0-9]{1,5}'
          ml={4}
          h='50px'
          _focus={{ borderColor: "none" }}
          display={account ? undefined : "none"}
          value={phone}
          placeholder='number'
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setPhone(e.target.value);
            }
          }}
        />
      </Flex>

      <Button
        variant={"brand"}
        disabled={!phone || !fullName || !account || loading}
        onClick={() => handleContinue(referrerAddress, isValidUser)}
        data-testid='verifyUserRecord'
        // onClick={() => verifyUserRecord()}
        // _disabled={{
        //   _hover: {
        //     bgColor: "",
        //     color: "",
        //   },
        //   _focus: {
        //     bgColor: "",
        //     color: "",
        //   },
        // }}
        _hover={{
          bgColor: "",
          color: "",
        }}
        isFullWidth
        my={3}
        mb={4}
      >
        {loading ? <Spinner size='md' /> : t('cont')}
      </Button>
      <ChooseNetwork
        openModal={openNetModal}
        closeModal={() => setOpneNetModal(false)}
      />
      <CountryModal
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        isOpen={openModal}
        onClose={setOpenModal}
      />
    </>
  );
};

export default CreatAnAccount;
