import { useState,Dispatch,SetStateAction } from "react";
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

import { useModalSearch } from "../../utils/hooks/useSearch";

interface SelectModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  data: any;
  placeholder?: string;
  title?: string;
}

export default function SelectFiatModal({
  onClose,
  isOpen,
  setSelectedItem,
  selectedItem,
  placeholder,
  title,
  data,
}: SelectModalProps) {
  //const dispatch = useDispatch();
  const mode = useColorModeValue("light", "dark");
  const selectBorderColor = useColorModeValue("#319EF6", "#319EF6");
  const notSelectedBorderColor = useColorModeValue("#EBF6FE", "#5F6774");
  const [selected, SetSelected] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSelectCode = (country: string) => {
    
    setSelectedItem(country);
    onClose(false);
  };

  const { searchResult, secondarySearchResult } = useModalSearch(
    searchKeyword,
    undefined,
    data
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
          {title ?? "Select Payment Country"}
        </ModalHeader>
        <ModalBody overflowY='scroll' maxH='40vh'>
          <InputGroup>
            <Input
              _placeholder={{
                color: mode === "light" ? "#333333" : "#ffffff",
                fontSize: "14px",
              }}
              autoFocus
              placeholder={placeholder ?? "Search Country"}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <InputRightElement children={<SearchIcon />} />
          </InputGroup>
          <Flex flexDirection='column' mt={{ base: 5 }}>
            {!searchKeyword
              ? data.map((country, index) => (
                  <Flex
                    borderRadius='6px'
                    border='1px'
                    key={index}
                    borderColor={
                      selected === ""
                        ? country.name === selectedItem
                          ? selectBorderColor
                          : notSelectedBorderColor
                        : country.name === selected
                        ? selectBorderColor
                        : notSelectedBorderColor
                    }
                    _hover={{ borderColor: selectBorderColor }}
                    cursor='pointer'
                    onClick={() => SetSelected(country.name)}
                    p={3}
                    mb={3}
                  >
                    {/* <Img
                      mr={2}
                      src={
                        country.icon === "Nigeria"
                          ? Nigeria
                          : country.icon === "Kenya"
                          ? Kenya
                          : country.icon === "India"
                          ? India
                          : country.icon === "UnitedKingdom"
                          ? UnitedKingdom
                          : country.icon === "USA"
                          ? USA
                          : undefined
                      }
                    /> */}
                    {country.name !== "ALLS" && (
                      <Img
                        src={`https://flagcdn.com/32x24/${country.icon?.toLowerCase()}.png`}
                        width='16px'
                        height='12px'
                        mr='10px'
                        mt='5px'
                        alt={country?.name.slice(0, 2)}
                      />
                    )}
                    {country.name !== "ALLS" ? (
                      <Text fontSize='14px'>{country.name}</Text>
                    ) : (
                      <Text fontSize='14px'>All</Text>
                    )}
                  </Flex>
                ))
              : secondarySearchResult?.map((country, index) => (
                  <Flex
                    borderRadius='6px'
                    border='1px'
                    key={index}
                    borderColor={
                      selected === ""
                        ? country.name === selectedItem
                          ? selectBorderColor
                          : "transparent"
                        : country.name === selected
                        ? selectBorderColor
                        : "transparent"
                    }
                    _hover={{ borderColor: selectBorderColor }}
                    cursor='pointer'
                    onClick={() => SetSelected(country.name)}
                    p={3}
                    mb={3}
                  >
                    {/* <Img
                      mr={2}
                      src={
                        country.icon === "Nigeria"
                          ? Nigeria
                          : country.icon === "Kenya"
                          ? Kenya
                          : country.icon === "India"
                          ? India
                          : country.icon === "UnitedKingdom"
                          ? UnitedKingdom
                          : country.icon === "USA"
                          ? USA
                          : undefined
                      }
                    /> */}
                    {country.name !== "ALLS" && (
                      <Img
                      src={`https://flagcdn.com/32x24/${country.icon?.toLowerCase()}.png`}
                        width='16px'
                        height='12px'
                        mr='10px'
                        mt='5px'
                        alt={country?.name?.slice(0, 2)}
                      />
                    )}
                    {country.name !== "ALLS" ? (
                      <Text fontSize='14px'>{country.name}</Text>
                    ) : (
                      <Text fontSize='14px'>All</Text>
                    )}
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
              handleSelectCode(selected === "" ? selectedItem : selected)
            }
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
