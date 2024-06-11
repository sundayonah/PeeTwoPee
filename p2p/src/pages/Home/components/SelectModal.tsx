import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  Button,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputRightElement,
  Input,
  Flex,
  Text, 
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
// import { setselectedCrypto } from "../../../../state/merchant/index";
import { useDispatch } from "react-redux";
import { SUPPORTEDCOUNTRIES } from "../../../utils/constants/constants";
import BANK from "../../../assets/bank.svg";
import BANKLIGHT from "../../../assets/bankdark.svg";
import { useModalSearch } from "../../../utils/hooks/useSearch";

interface SelectModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
  title: string;
  searchPlaceHolder: string;
  paymentMethod?: boolean;
}

export default function SelectModal({
  onClose,
  isOpen,
  setSelectedOption,
  selectedOption,
  options,
  paymentMethod,
  searchPlaceHolder,
  title,
}: SelectModalProps) {
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const selectBorderColor = useColorModeValue("#319EF6", "#319EF6");
  const notSelectedBorderColor = useColorModeValue("#EBF6FE", "#5F6774");
  const [selected, SetSelected] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSelectCode = (option: string) => {
    setSelectedOption(option);
    onClose(false);
  };

  const { searchResult, secondarySearchResult } = useModalSearch(
    searchKeyword,
    options,
    undefined
  );

  return (
    <Modal
      closeOnOverlayClick={false}
      size='xs'
      onClose={() => onClose(false)}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent py={2}>
        <ModalCloseButton
          onClick={() => SetSelected("")}
          mt={{ base: 2 }}
          size='sm'
          border='1px'
          borderRadius='6px'
          _focus={{ borderColor: "" }}
        />
        
        <ModalHeader fontSize='16px' mt={{ base: 2 }}>
          {title}
        </ModalHeader>
        <ModalBody overflowY='scroll' maxH='40vh'>
          <InputGroup>
            <Input
              _placeholder={{
                color: mode === "light" ? "#333333" : "#ffffff",
                fontSize: "14px",
              }}
              placeholder={searchPlaceHolder}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <InputRightElement children={<SearchIcon />} />
          </InputGroup>
          <Flex flexDirection='column' mt={{ base: 5 }}>
            {!searchKeyword
              ? options.map((option,index) => (
                  <Flex
                    border='1px'
                    key={index}
                    borderColor={
                      selected === ""
                        ? option === selectedOption
                          ? selectBorderColor
                          : notSelectedBorderColor
                        : option === selected
                        ? selectBorderColor
                        : notSelectedBorderColor
                    }
                    _hover={{ borderColor: selectBorderColor }}
                    cursor='pointer'
                    onClick={() => SetSelected(option)}
                    p={3}
                    mb={3}
                    borderRadius='6px'
                  >
                    <Img
                      mr={2}
                      display={paymentMethod ? undefined : "none"}
                      src={mode === "dark" ? BANK : BANKLIGHT}
                    />
                    <Text fontSize='14px'>{option}</Text>
                  </Flex>
                ))
              : searchResult?.map((option,index) => (
                  <Flex
                    border='1px'
                    key={index}
                    borderColor={
                      selected === ""
                        ? option === selectedOption
                          ? selectBorderColor
                          : notSelectedBorderColor
                        : option === selected
                        ? selectBorderColor
                        : notSelectedBorderColor
                    }
                    _hover={{ borderColor: selectBorderColor }}
                    cursor='pointer'
                    onClick={() => SetSelected(option)}
                    p={3}
                    mb={3}
                    borderRadius='6px'
                  >
                    <Img
                      mr={2}
                      display={paymentMethod ? undefined : "none"}
                      src={BANK}
                    />
                    <Text fontSize='14px'>{option}</Text>
                  </Flex>
                ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            color='#FFFFFF'
            fontSize='14px'
            w='100%'
            bgColor='#319EF6'
            _focus={{ color: "#FFFFFF", bgColor: "#319EF6" }}
            _hover={{ color: "#FFFFFF", bgColor: "#319EF6" }}
            onClick={() =>
              handleSelectCode(selected === "" ? selectedOption : selected)
            }
            disabled={!selected}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
