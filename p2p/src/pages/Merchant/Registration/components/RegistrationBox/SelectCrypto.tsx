import {
  
  Flex,
  useColorModeValue,
  Text,
  Button,
  
  useMediaQuery,
} from "@chakra-ui/react";

import AccountSuccess from "../../../../../components/Modals/AccountSuccess";
import { useEffect, useState } from "react";

import {
  InfoOutlineIcon,
  ChevronDownIcon,
  ArrowBackIcon,
  CloseIcon,
} from "@chakra-ui/icons";

import { screenId } from "../../../../../state/merchant";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBar, setselectedCrypto } from "../../../../../state/merchant";
import SelectModal from "../selectModal";
import { useSearch } from "../../../../../utils/hooks/useSearch";
import { RootState } from "../../../../../state/store";
// import AccountSuccess from "../../../../../components/Modals/AccountSuccess";

const SelectCrypto = () => {
  const mode = useColorModeValue("light", "dark");
  const selectedColor = useColorModeValue("#666666", "");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selected, setSelected] = useState<string | []>([]);
  const [mainSelectedCrypto, mainsetSelectedCrypto] = useState<
    Array<string> | undefined
  >([]);
  const [selectedCrypto, setSelectedCrypto] = useState<
    Array<string> | undefined
  >([]);
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const dispatch = useDispatch();
  const [continueClicked, setContinueClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [keyword, setKeyword] = useState("");

  const cryptoOptions = [
    { value: "USDT", label: "USDT" },
    { value: "ETH", label: "ETH" },
    { value: "BTC", label: "BTC" },
    { value: "BNB", label: "BNB" },
  ];

  const { searchOptions } = useSearch(keyword, cryptoOptions);

  const handleRemove = (cryptoName: string) => {
    const newArray = [...(selectedCrypto as Array<string>)];
    const index = newArray.findIndex((value) => value === cryptoName);
    newArray.splice(index, 1);
    setSelectedCrypto(newArray);
    mainsetSelectedCrypto(newArray);
    dispatch(setselectedCrypto(newArray));
  };
  const selectedcrypto = useSelector(
    (state: RootState) => state.merchantUi.selectedCrypto
  );

  useEffect(() => {
    if (selectedcrypto.length !== 0) {
      setSelectedCrypto(selectedcrypto);
      mainsetSelectedCrypto(selectedcrypto);
    }
  }, [selectedcrypto]);

  return (
    <>
      <Flex
        onClick={() => dispatch(setActiveBar(screenId.ACCOUNTINFO))}
        justifyContent='flex-start'
        cursor='pointer'
        display={isMobileDevice ? undefined : "none"}
      >
        <Flex
          color={mode === "light" ? "#666666" : ""}
          mb={{ base: 5, sm: 10 }}
          alignItems='center'
        >
          <ArrowBackIcon />
          <Text fontSize='14px'>Back</Text>
        </Flex>
      </Flex>
      <Text
        fontSize='20px'
        fontWeight={400}
        mb={{ base: 5 }}
        color={mode === "dark" ? "white" : "#333333"}
      >
        Select cryptocurrencies
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
        onClick={() =>
          mainSelectedCrypto && mainSelectedCrypto?.length > 0
            ? null
            : setOpenModal(true)
        }
      >
        <Text color={mode === "light" ? "#999999" : "#ffffff"} fontSize='14px'>
          {mainSelectedCrypto && mainSelectedCrypto?.length === 0 ? (
            "Select cryptocurrencies"
          ) : (
            <Flex>
              {mainSelectedCrypto?.map((item) => (
                <Flex
                  bg='rgba(102, 102, 102, 0.05)'
                  px={2}
                  borderRadius='10px'
                  py={1}
                  mx={{ base: 1 }}
                  alignItems='center'
                >
                  <Text color={mode === "light" ? "#666666" : ""} mr={1}>
                    {item}
                  </Text>
                  <CloseIcon onClick={() => handleRemove(item)} boxSize={2} />
                </Flex>
              ))}
            </Flex>
          )}
        </Text>
        <ChevronDownIcon onClick={() => setOpenModal(true)} />
      </Flex>

      <Flex color='#D7A500' mt={{ base: 2 }} alignItems='center'>
        <InfoOutlineIcon mr={{ base: 2 }} boxSize={4} />
        <Text fontSize='12px'>
          Select only cryptocurrencies you support during trading.
        </Text>
      </Flex>

      <Button
        disabled={mainSelectedCrypto?.length === 0}
        onClick={() => setShowSuccess(true)}
        variant={"brand"}
        _hover={{ bgColor: "", color: "" }}
        isFullWidth
        mt={{ base: 3, sm: 5 }}
        mb={4}
      >
        Continue
      </Button>

      <AccountSuccess openModal={showSuccess} />
      <SelectModal
        title='Select supported cryptocurrencies'
        options={cryptoOptions}
        selected={selected}
        setSelected={setSelected}
        isOpen={openModal}
        onClose={setOpenModal}
        setContinueClicked={setContinueClicked}
        searchPlaceHolder='Search currency'
        selectCrypto={true}
        selectedCrypto={selectedCrypto}
        setSelectedCrypto={setSelectedCrypto}
        keyword={keyword}
        setKeyword={setKeyword}
        searchOptions={searchOptions}
        mainsetSelectedCrypto={mainsetSelectedCrypto}
        mainselectCrypto={mainSelectedCrypto}
      />
    </>
  );
};

export default SelectCrypto;
