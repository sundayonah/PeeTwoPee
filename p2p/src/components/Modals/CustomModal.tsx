import { useState,Dispatch,SetStateAction,memo } from "react";
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

import { FixedSizeList as List } from 'react-window';
import { useModalSearch } from "../../utils/hooks/useSearch";

interface SelectModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  selectedItem: {name:string,currency:string,logo:string};
  setSelectedItem: any;
  data: any;
  placeholder?: string;
  title?: string;
}

function CustomModal({
  onClose,
  isOpen,
  setSelectedItem,
  selectedItem,
  placeholder,
  title,
  data,
}: SelectModalProps) {
  const mode = useColorModeValue("light", "dark");
  const selectBorderColor = useColorModeValue("#319EF6", "#319EF6");
  const notSelectedBorderColor = useColorModeValue("#EBF6FE", "#5F6774");
  const [selected, SetSelected] = useState({name:"",currency:"",logo:""});
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSelectCode = (country: {name:string,currency:string,logo:string}) => {

    setSelectedItem(country);
    onClose(false);
  };

  const {  secondarySearchResult } = useModalSearch(
    searchKeyword,
    undefined,
    data
  );

  const Row = ({ index, style }) => {
  return  (
    <div style={style}>
 <Flex
      borderRadius='6px'
      border='1px'
      key={index}
      borderColor={
        selected.name === ""
          ? data[index].name?.toLowerCase() === selectedItem.name?.toLowerCase()
            ? selectBorderColor
            : notSelectedBorderColor
          : data[index].name === selected.name
          ? selectBorderColor
          : notSelectedBorderColor
      }
      _hover={{ borderColor: selectBorderColor }}
      cursor='pointer'
      onClick={() =>{
        data[index].name !== "ALLS" ?
         SetSelected({
          name:data[index].name,
          currency:data[index].currency,
          logo:`https://flagcdn.com/32x24/${data[index].icon?.toLowerCase()}.png`
        }):  SetSelected({
          name:"ALLS",
          currency:"",
          logo:""
        })
        }}
      p={3}
      mr="10px"
      
    >
   {data[index].name!=="ALLS" && <Img
  src={`https://flagcdn.com/32x24/${data[index].icon?.toLowerCase()}.png`}
  width="16px"
  height="12px"
  mr="10px"
  mt="5px"
  alt={data[index]?.name?.slice(0,2)}/> }
        {data[index].name !== "ALLS" ?<Text fontSize='14px'>{data[index].currency}</Text> : <Text fontSize='14px'>All</Text>}
    </Flex>
    </div>
     
  
    );
  }

  const SecondaryRow = ({ index, style }) => (
    <div style={style}>
    <Flex
    borderRadius='6px'
    border='1px'
    key={index}
    borderColor={
      selected.name === ""
        ? secondarySearchResult[index].name?.toLowerCase() === selectedItem.name?.toLowerCase()
          ? selectBorderColor
          : notSelectedBorderColor
        : secondarySearchResult[index].name === selected.name
        ? selectBorderColor
        : notSelectedBorderColor
    }
    _hover={{ borderColor: selectBorderColor }}
    cursor='pointer'
    onClick={() =>{
      secondarySearchResult[index].name !== "ALLS" ?
       SetSelected({
        name:secondarySearchResult[index].name,
        currency:secondarySearchResult[index].currency,
        logo:`https://flagcdn.com/32x24/${secondarySearchResult[index].icon?.toLowerCase()}.png`
      }):  SetSelected({
        name:"ALLS",
        currency:"",
        logo:""
      })
      }}
      p={3}
      mr="10px"
  >
   {secondarySearchResult[index].name!=="ALLS" && <Img
src={`https://flagcdn.com/32x24/${secondarySearchResult[index].icon?.toLowerCase()}.png`}
width="16px"
height="12px"
mr="10px"
mt="5px"
alt={secondarySearchResult[index]?.name?.slice(0,2)}/> }
      {secondarySearchResult[index].name !== "ALLS" ?<Text fontSize='14px'>{secondarySearchResult[index].currency}</Text> : <Text fontSize='14px'>All</Text>}

  </Flex>
      </div>
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
      <ModalContent py={3}>
        <ModalCloseButton
          onClick={() => SetSelected({name:"",currency:"",logo:""})}
          mt={{ base: 2 }}
          size='sm'
          border='1px'
          borderRadius='6px'
          _focus={{ borderColor: "" }}
        />

        <ModalHeader fontSize='16px' mt={{ base: 2 }}>
          {title ?? "Select Payment Country"}
        </ModalHeader>
        <ModalBody  maxH='40vh'> 
          <InputGroup>
            <Input
              _placeholder={{
                color: mode === "light" ? "#333333" : "#ffffff",
                fontSize: "14px",
              }}
              placeholder={placeholder ?? "Search Country"}
              autoFocus
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <InputRightElement children={<SearchIcon />} />
          </InputGroup>
          <Flex flexDirection='column' mt={{ base: 5 }}>

            {!searchKeyword
              ? 
              <div>
                  <List
                      height={160}
                      width={270}
                      innerElementType="div"
                      itemCount={data.length}
                      itemSize={55}
                    >
                      {Row}
                     
                    </List>
              </div>
            
              : 
  <div>
  <List
      height={160}
      width={270}
      innerElementType="div"
      itemCount={secondarySearchResult.length}
      itemSize={55}
    >
      {SecondaryRow}
     
    </List>
</div>
                }
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
              handleSelectCode(selected.name === "" ? selectedItem : selected)
            }
          >
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


export default memo(CustomModal);