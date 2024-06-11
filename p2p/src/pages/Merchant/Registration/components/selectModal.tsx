import React  from "react";
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
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { setselectedCrypto } from "../../../../state/merchant/index";
import { useDispatch } from "react-redux";

interface SelectModalProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  title: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  setSelected: React.Dispatch<React.SetStateAction<string | []>>;
  selected: string | [];

  setContinueClicked: React.Dispatch<React.SetStateAction<boolean>>;
  searchPlaceHolder: string;
  selectCrypto: boolean;
  selectedCrypto: string[] | undefined;
  setSelectedCrypto: React.Dispatch<React.SetStateAction<string[] | undefined>>;

  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchOptions:
    | Array<{
        label: string;
        value: string;
      }>
    | undefined;
  mainSelected?: string | [];
  mainsetSelected?: React.Dispatch<React.SetStateAction<string | []>>;
  mainselectCrypto?: string[] | undefined;
  mainsetSelectedCrypto?: React.Dispatch<
    React.SetStateAction<string[] | undefined>
  >;
}

export default function SelectModal({
  onClose,
  isOpen,
  title,
  options,
  selected,
  setSelected,
  setContinueClicked,
  searchPlaceHolder,
  selectCrypto,
  setSelectedCrypto,
  selectedCrypto,
  keyword,
  setKeyword,
  searchOptions,
  mainsetSelected,
  mainsetSelectedCrypto,
  mainselectCrypto,
  mainSelected,
}: SelectModalProps) {
  const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");

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
          onClick={() => setSelectedCrypto(mainselectCrypto)}
          mt={{ base: 2 }}
          size='sm'
          border='1px'
          borderRadius='6px'
          _focus={{ borderColor: "" }}
        />

        <ModalHeader fontSize='16px' mt={{ base: 5 }}>
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <InputRightElement children={<SearchIcon />} />
          </InputGroup>
          <Flex flexDirection='column' mt={{ base: 5 }}>
            {/* {keyword !== '' ? } */}
            {keyword !== ""
              ? searchOptions?.map((option) => (
                  <Flex mb={3}>
                    {selectCrypto ? (
                      <>
                        <Checkbox
                          _focus={{ border: "none" }}
                          size='sm'
                          colorScheme='blue'
                          isChecked={selectedCrypto?.includes(option.label)}
                          onChange={(e) => {
                            if (selectedCrypto?.includes(option.label)) {
                              const newArray = [...selectedCrypto];
                              const index = newArray.findIndex(
                                (value) => value === option.label
                              );
                              newArray.splice(index, 1);
                              setSelectedCrypto(newArray);

                           
                            } else {
                              setSelectedCrypto((oldArray) => [
                                ...(oldArray as Array<string>),
                                option.label,
                              ]);
                            }

                            
                          }}
                          mr={2}
                        />
                      </>
                    ) : (
                      <Checkbox
                        isChecked={option.label === selected}
                        _focus={{ border: "none" }}
                        size='sm'
                        colorScheme='blue'
                        onChange={(e) => {
                          if (selected === option.label) {
                            setSelected("");
                          } else {
                            setSelected(option.label);
                          }
                        }}
                        mr={2}
                      />
                    )}

                    <Text fontSize='14px'>{option.label}</Text>
                  </Flex>
                ))
              : options.map((option) => (
                  <Flex mb={3}>
                    {selectCrypto ? (
                      <>
                        <Checkbox
                          _focus={{ border: "none" }}
                          size='sm'
                          colorScheme='blue'
                          isChecked={selectedCrypto?.includes(option.label)}
                          onChange={(e) => {
                            if (selectedCrypto?.includes(option.label)) {
                              const newArray = [...selectedCrypto];
                              const index = newArray.findIndex(
                                (value) => value === option.label
                              );
                              newArray.splice(index, 1);
                              setSelectedCrypto(newArray);
                  
                            } else {
                              setSelectedCrypto((oldArray) => [
                                ...(oldArray as Array<string>),
                                option.label,
                              ]);
                            }

                           
                          }}
                          mr={2}
                        />
                      </>
                    ) : (
                      <Checkbox
                        isChecked={option.label === selected}
                        _focus={{ border: "none" }}
                        size='sm'
                        colorScheme='blue'
                        onChange={(e) => {
                          if (selected === option.label) {
                            setSelected("");
                          } else {
                            setSelected(option.label);
                          }
                        }}
                        mr={2}
                      />
                    )}

                    <Text fontSize='14px'>{option.label}</Text>
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
            onClick={() => {
              if (selectCrypto) {
                if (mainsetSelectedCrypto) {
                  onClose(false);
                  setContinueClicked(true);
                  mainsetSelectedCrypto(selectedCrypto);
                  dispatch(setselectedCrypto(selectedCrypto));
                }
              } else {
                if (mainsetSelected) {
                  onClose(false);
                  setContinueClicked(true);
                  mainsetSelected(selected);
                }
              }
            }}
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
