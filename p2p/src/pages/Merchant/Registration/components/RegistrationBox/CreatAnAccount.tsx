import {
  
  Flex,
  useColorModeValue,
  Text,
  Button, 
  // Select,
  Input,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import {
  screenId,
  setActiveBar,
  setAccountDetails,
} from "../../../../../state/merchant";
import ChooseNetwork from "../../../../../components/Modals/NetworkConnection/ChooseNetwork";
import { useState,   useEffect } from "react";

import { RootState } from "../../../../../state/store";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SelectModal from "../selectModal";
import { useSearch } from "../../../../../utils/hooks/useSearch";
import { useTranslation } from "react-i18next";

export const bankOptions = [
  { value: "Zenith Bank", label: "Zenith Bank" },
  { value: "UBA", label: "UBA" },
  { value: "GT Bank", label: "GT Bank" },
  { value: "Access Bank", label: "Access Bank" },
  { value: "First Bank of Nigeria", label: "First Bank of Nigeria" },
  { value: "Fidelity Bank", label: "Fidelity Bank" },
  { value: "Polaris Bank", label: "Polaris Bank" },
  { value: "Sterling Bank", label: "Sterling Bank" },
];

const CreatAnAccount = () => {
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const selectPlaceHolderColor = useColorModeValue("#999999", "");
  const [openNetModal, setOpneNetModal] = useState(false);
  const [selected, setSelected] = useState<string | []>("");
  const [continueClicked, setContinueClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [accountNumberValue, setAccountNumberValue] = useState<
    string | number
  >();
  const [cleared, setCleard] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string[] | undefined>(
    []
  );
  const [mainSelected, mainsetSelected] = useState<string | []>("");
  const [keyword, setKeyword] = useState("");

  const accountDetails = useSelector(
    (state: RootState) => state.merchantUi.accountDetails
  );
  const {t} = useTranslation()

  useEffect(() => {
    if (
      accountDetails.bankName !== undefined &&
      accountDetails.accountNumber !== undefined
    ) {
      setSelected(accountDetails.bankName);
      setAccountNumberValue(accountDetails.accountNumber);
    }
  }, [accountDetails]);

  const { searchOptions } = useSearch(keyword, bankOptions);

  const handleContinue = () => {
    dispatch(
      setAccountDetails({
        bankName: selected,
        accountNumber: accountNumberValue,
      })
    );
    dispatch(setActiveBar(screenId.SELECTCRYPTO));
  };

  return (
    <>
      <Text
        fontSize='20px'
        fontWeight={400}
        color={mode === "dark" ? "white" : "#333333"}
      >
        {Text("bank_acct_info")}
      </Text>
      <Text
        mb={{ base: 5 }}
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        pt={2}
      >
        {t("add_bank_note")}
      </Text>

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
         {t("Bank Name")}
      </Text>

      <Flex
        border='1px'
        cursor='pointer'
        alignItems='center'
        justifyContent='space-between'
        borderColor={mode === "light" ? "#DEE5ED" : "#51555F"}
        borderRadius='5px'
        h='10'
        px={{ base: 2 }}
        color={mode === "light" ? "#999999" : "#ffffff"}
        onClick={() => setOpenModal(true)}
      >
        <Text color={mode === "light" ? "#333333" : "#ffffff"} fontSize='14px'>
          {selected ? selected : "Select bank"}
        </Text>
        <ChevronDownIcon />
      </Flex>

      <Text
        fontSize='14px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
      >
         {t("Account Number")}
      </Text>
      <Input
        value={accountNumberValue}
        onChange={(e) => setAccountNumberValue(e.target.value)}
        mb={{ base: 5 }}
      />

      <Button
        variant={"brand"}
        _hover={{ bgColor: "", color: "" }}
        disabled={accountNumberValue === undefined || !selected}
        onClick={() => handleContinue()}
        isFullWidth
        my={3}
        mb={4}
      >
        Continue
      </Button>
      <ChooseNetwork
        openModal={openNetModal}
        closeModal={() => setOpneNetModal(false)}
      />
      <SelectModal
        title='Choose bank'
        options={bankOptions}
        selected={selected}
        setSelected={setSelected}
        isOpen={openModal}
        onClose={setOpenModal}
        setContinueClicked={setContinueClicked}
        searchPlaceHolder='Search bank'
        selectCrypto={false}
        selectedCrypto={undefined}
        setSelectedCrypto={setSelectedCrypto}
        keyword={keyword}
        setKeyword={setKeyword}
        searchOptions={searchOptions}
        mainsetSelected={mainsetSelected}
        mainSelected={mainSelected}
      />
    </>
  );
};

export default CreatAnAccount;
