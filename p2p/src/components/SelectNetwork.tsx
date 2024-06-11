import { ChevronDownIcon } from "@chakra-ui/icons";
import {  Button, Flex, Img, Menu, MenuButton, MenuItem, MenuList,  Text, useColorModeValue } from "@chakra-ui/react";
import  {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BnBLogo from '../assets/BNB.svg'
import Polygon from '../assets/Matic.svg'
import { RootState } from "../state/store";
import { setChainId } from "../state/user";

const SelectNetwork = () => {
    const dispatch = useDispatch()
    const borderColor = useColorModeValue("#DEE6ED", "#324D68");

    const [currentNtwr, setCurnetwrk ] = useState<{logo: string, networkname: string} | null>()

    const { chainId} = useSelector(
        (state: RootState) => state.user
      );
    

  return (
    <Menu>
            <MenuButton
              mb={10}  
              variant='ghost'
              as={Button}
              transition='all 0.2s'
              rightIcon={<ChevronDownIcon />}
              fontWeight={400}
              _focus={{ color: "#319EF6" }}
              fontSize='13px'
              textTransform={"capitalize"}
              border={`1px solid ${borderColor}`}
            >
              { currentNtwr && <Flex>
                <Img src={currentNtwr && currentNtwr.logo} width='25px' height='25px' mr='1' />{" "}
                <Text mt='1'>{currentNtwr && currentNtwr.networkname}</Text>
              </Flex>}
            </MenuButton>
            <MenuList>
              {[
                { currency: "Binance", img: BnBLogo , chainId: 56},
                { currency: "Binance TestNet", img: BnBLogo , chainId: 97},
                { currency: "Polygon", img: Polygon , chainId: 137},
                { currency: "Polygon Test", img: Polygon , chainId: 80001},
                
              ].map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    disabled={item.chainId === chainId}
                    onClick={() => {
                        dispatch(setChainId(item.chainId))
                        // dispatch(setSelectedNetwork(item.currency))
                        setCurnetwrk({logo: item.img, networkname: item.currency})
                    
                    }}
                  >
                    <Flex >
                      <Img pt={2} src={item.img} width='23px' height='23px' mr='1' />{" "}
                      <Text mt='1'>{item.currency}</Text>
                    </Flex>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          
  );
};

export default SelectNetwork;
