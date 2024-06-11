import {
   
  Flex,
  useColorModeValue,
  Text,
  Button,
   
  Divider,
  Input,
  Spinner,
} from "@chakra-ui/react";  
import AccountSuccess from "../../../../components/Modals/AccountSuccess";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  screanId,
  setActiveBar,
  setCreateAccountRefresh,
} from "../../../../state/accountUi";
import {   ChevronDownIcon } from "@chakra-ui/icons";
import CountryPayment from "../CountryPayment";
import SelectModal from "../SelectModal";
import { setCountry } from "../../../../state/merchant";
import { REGISTER_USER } from "../../gql/mutations";
import { useMutation } from "@apollo/client";
import { RootState } from "../../../../state/store";
import CreatableSelect from "react-select/creatable";

import { allBanks } from "../../../../utils/banksDb";

import { addToast } from "../../../../components/Toast/toastSlice";
import { GCreatedAnAccount } from "../../../../utils/GAnalytics/gTrade";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const mode = useColorModeValue("light", "dark");
  const inactiveTextColor = useColorModeValue("#CCCCCC", "");
  const inputBorderColor = useColorModeValue("#DEE5ED", "#2D3748");
  const activeTextColor = useColorModeValue("#333333", "");
  const inputBgColor = useColorModeValue("#EBF6FE", "");
  const labelColor = useColorModeValue("#666666", "");
  const stepBgColor = useColorModeValue("#319EF6", "#319EF6");
  const inactiveStepBgColor = useColorModeValue("#F2F5F8", "#2D3748");
  const [showSuccess, setShowSuccess] = useState(false);
  const [OTP, setOTP] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [valueArray, setValueArray] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Nigeria");
  const [openPaymentMethodModal, setOpenPaymentMethodModal] = useState(false);
  const [openBankOptionsModal, setOpenBankOptionsModal] = useState(false);
  const [SelectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [SelectedBankOption, setSelectedBankOption] = useState("");
  const [reload, setReload] = useState(false);

  const hoverOptionColor = useColorModeValue("#E2E8F0", "#303640");
  const menuBackground = useColorModeValue("#FFFFFF", "#232934");
  const optionTextColor = useColorModeValue("black", "#eee");
  const {chainId} = useActiveWeb3React()
  const registerInput = useSelector(
    (state: RootState) => state.merchantUi.registerInput
  );

  const [register, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: {
      input: {
        address: registerInput.address,
        fullname: registerInput.fullName,
        username: registerInput.userName,
        phone: `${registerInput.country_code}${registerInput.phone}`,
        country_code: registerInput.country_code,
        country: registerInput.country,
        otp: registerInput.otp,
        referral: registerInput.referrerAddress,
        bank: {
          bank_name: SelectedBankOption,
          account_number: accountNumber,
          account_name: accountName,
        },
        email: registerInput.email,
      },
    },
    onCompleted: (data) => {
      if (data?.register.status === true) {
        // setReload(true);
        dispatch(setCreateAccountRefresh(true));
        localStorage.setItem("authToken", data.register.token);
        GCreatedAnAccount(registerInput.address,chainId)
     
        setShowSuccess(true);
      } else if (data?.register.status === false) {
        dispatch(addToast({ message: data?.register.message, error: true }));
      }
    },
  });
  const { t } = useTranslation()

  const PaymentMethods = [t("bank_transfer")];

  const dispatch = useDispatch();

  useMemo(() => {
    const otpArray = OTP.split("");
    setValueArray(otpArray);
  }, [OTP]);

  // useMemo(() => {
  //   if (data?.register.status === true) {
  //     // setReload(true);
  //     dispatch(setCreateAccountRefresh(true));
  //     localStorage.setItem("authToken", data.register.token);
  //     setShowSuccess(true);
  //   } else if (data?.register.status === false) {
  //     dispatch(addToast({ message: data?.register.message, error: true }));
  //   }
  // }, [data]);
  const closeBtnColour = useColorModeValue("#666666", "#DCE5EF");

  const [bankinList, setBankingList] = useState<any[]>();

  useEffect(() => {
    if (selectedCountry) {
      const ItemsToseach = allBanks[selectedCountry].map((item) => ({
        value: item,
        label: item,
      }));
      setBankingList(ItemsToseach);
    }
  }, []);

  const handleAddPaymentMethod = async () => {
    await register();
  };

  const handleChange = (newValue, actionMeta) => {
 
    if (newValue) {
      setSelectedBankOption(newValue?.value);
    } else {
      setSelectedBankOption("");
    }
  };

  const colorStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "transparent",
      borderColor: isFocused ? inputBorderColor : inputBorderColor,
      cursor: "text",
      color: "white",
      ":hover": {
        borderColor: inputBorderColor,
      },
      ":focus": {
        borderColor: inputBorderColor,
      },
      boxShadow: "none",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? hoverOptionColor : menuBackground,
        ":hover": {
          backgroundColor: hoverOptionColor,
        },
        color: optionTextColor,
        cursor: "pointer",
      };
    },
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        color: labelColor,
        fontSize: "16px",
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
        fontSize: "14px",
      };
    },
    clearIndicator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
    indicatorSeparator: (styles) => {
      return {
        ...styles,
        display: "none",
      };
    },
    menuList: (styles) => {
      return {
        ...styles,
        backgroundColor: menuBackground,
      };
    },
    input: (styles) => {
      return {
        ...styles,
        color: optionTextColor,
      };
    },
  };

  return (
    <>
      <Text
        fontSize='20px'
        fontWeight={400}
        color={mode === "dark" ? "white" : "#333333"}
        alignItems='center'
      >
        {t('add_payment_method_text')}
      </Text>
      <Text
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
        {t('payment_text')}
      </Text>

      <Flex mt={10} alignItems='center'>
        <Flex flexDirection='column'>
          <Flex flexDirection='column'>
            <Flex
              h='30px'
              w='30px'
              fontSize='14px'
              //   border='1px'
              borderRadius='50%'
              justifyContent='center'
              alignItems='center'
              fontWeight='bold'
              backgroundColor={step === 1 ? stepBgColor : inactiveStepBgColor}
              color={step === 1 ? "#ffffff" : labelColor}
            >
              1
            </Flex>
            <Text
              mt={8}
              position='absolute'
              whiteSpace='nowrap'
              fontSize='14px'
              color={labelColor}
            >
              {t('payment_method')}
            </Text>
          </Flex>
        </Flex>
        <Divider
          size='md'
          w='50%'
          //   mb={12}
          variant='dashed'
          borderWidth='thin'
        />
        <Flex flexDirection='column'>
          <Flex
            h='30px'
            w='30px'
            fontSize='14px'
            borderRadius='50%'
            justifyContent='center'
            alignItems='center'
            fontWeight='bold'
            backgroundColor={step === 2 ? stepBgColor : inactiveStepBgColor}
            color={step === 2 ? "#ffffff" : labelColor}
          >
            2
          </Flex>
          <Text
            mt={8}
            color={labelColor}
            position='absolute'
            whiteSpace='nowrap'
            fontSize='14px'
          >
            {t('payment_detail')}
          </Text>
        </Flex>
      </Flex>

      {step === 1 ? (
        <Flex mt={{ base: 16 }} flexDirection='column'>
          <Flex flexDirection='column'>
            <Text color={labelColor} fontSize='14px'>
              {t('choose_con')}
            </Text>
            <Flex
              mt={{ base: 2 }}
              px={{ base: 2 }}
              alignItems='center'
              justifyContent='space-between'
              h='10'
              border='1px'
              borderColor={inputBorderColor}
              borderRadius='4px'
              onClick={() => setOpenModal(true)}
              cursor='pointer'
            >
              <Text
                color={selectedCountry ? activeTextColor : inactiveTextColor}
                fontSize='14px'
              >
                {selectedCountry ? selectedCountry : "Select Country"}
              </Text>
              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
          </Flex>

          <Flex mt={{ base: 5 }} flexDirection='column'>
            <Text color={labelColor} fontSize='14px'>
              {t('choose_pay')}
            </Text>
            <Flex
              mt={{ base: 2 }}
              px={{ base: 2 }}
              alignItems='center'
              justifyContent='space-between'
              h='10'
              border='1px'
              borderColor={inputBorderColor}
              borderRadius='4px'
              cursor='pointer'
              onClick={() => setOpenPaymentMethodModal(true)}
            >
              <Text
                color={
                  SelectedPaymentMethod ? activeTextColor : inactiveTextColor
                }
                fontSize='14px'
              >
                {SelectedPaymentMethod
                  ? SelectedPaymentMethod
                  : t('select_pay')}
              </Text>
              <ChevronDownIcon color={inactiveTextColor} />
            </Flex>
          </Flex>
          <Flex>
            <Button
              mt={{ base: 10 }}
              mr={["10px"]}
              width={["30%"]}
              variant={"brand"}
              _hover={{ bgColor: "", color: "" }}
              onClick={() => {
                dispatch(setActiveBar(screanId.CREATEACCOUNT));
              }}
              data-t
              isFullWidth
              h='12'
              data-testid='paymentDetails'
              fontSize='14px'
            >
              Back
            </Button>
            <Button
              mt={{ base: 10 }}
              variant={"brand"}
              _hover={{ bgColor: "", color: "" }}
              onClick={() => {
                dispatch(setCountry({ country: selectedCountry }));
                setStep(2);
              }}
              data-t
              disabled={!selectedCountry || !SelectedPaymentMethod}
              isFullWidth
              h='12'
              data-testid='paymentDetails'
              fontSize='14px'
            >
              {t('proceed_pay')}
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex mt={{ base: 16 }} flexDirection='column'>
          <Flex flexDirection='column'>
            <Flex color={labelColor} fontSize='14px' gap="8px" alignItems="center">
             <Text>{t('bank_name')}</Text> <Text alignSelf="end" fontSize="12px" fontWeight="700">{selectedCountry}</Text>  
            </Flex>

            <CreatableSelect
              isMulti={false}
              options={allBanks[selectedCountry]?.map((item) => ({
                value: item,
                label: item,
              }))}
              onChange={handleChange}
              styles={colorStyles}
              isClearable
              placeholder={t('p_bank_name')}
            />

          </Flex>

          <Flex mt={{ base: 5 }} flexDirection='column'>
            <Text color={labelColor} fontSize='14px'>
              {t('enter_acc')}
            </Text>
            <Input
              value={accountNumber}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAccountNumber(e.target.value);
                }
              }}
              _focus={{ borderColor: "none" }}
            />
          </Flex>

          <Flex mt={{ base: 5 }} flexDirection='column'>
            <Text color={labelColor} fontSize='14px'>
              {t('acct_name')}
            </Text>
            <Input
              value={accountName}
              onChange={(e) => {
                const re = /^[a-zA-Z ]*$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                  setAccountName(e.target.value);
                }
              }}
              _focus={{ borderColor: "none" }}
            />
          </Flex>
          <Flex>
            <Button
              mt={{ base: 10 }}
              mr={["10px"]}
              width={["30%"]}
              variant={"brand"}
              _hover={{ bgColor: "", color: "" }}
              onClick={() => {
                setStep(1);
              }}
              data-t
              isFullWidth
              h='12'
              data-testid='paymentDetails'
              fontSize='14px'
            >
             {t('back')}
            </Button>

            <Button
              mt={{ base: 10 }}
              variant={"brand"}
              _hover={{ bgColor: "", color: "" }}
              disabled={
                !SelectedBankOption || !accountNumber || !accountName || loading
              }
              isFullWidth
              h='12'
              fontSize='14px'
              data-testid='signup'
              onClick={() => handleAddPaymentMethod()}
            >
              {loading ? <Spinner size='md' /> : t('add_payment_method_text')}
            </Button>
          </Flex>
        </Flex>
      )}

      <AccountSuccess setReload={setReload} openModal={showSuccess} />
      <CountryPayment
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
        isOpen={openModal}
        onClose={setOpenModal}
      />
      <SelectModal
        title={t('select_pay')}
        searchPlaceHolder='Search Payment Method'
        setSelectedOption={setSelectedPaymentMethod}
        selectedOption={SelectedPaymentMethod}
        options={PaymentMethods}
        onClose={setOpenPaymentMethodModal}
        isOpen={openPaymentMethodModal}
        paymentMethod
      />
      {/* <SelectModal
        title='Select Bank'
        searchPlaceHolder='Search Bank'
        setSelectedOption={setSelectedBankOption}
        selectedOption={SelectedBankOption}
        options={bankOptions}
        onClose={setOpenBankOptionsModal}
        isOpen={openBankOptionsModal}
      /> */}
    </>
  );
};

export default PaymentMethod;
