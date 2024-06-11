import React from "react";

import {
   
  Text,
  Flex,
  useColorModeValue,
  
  Divider,
} from "@chakra-ui/react";
import { screenId  } from "../../../../state/merchant";
import { RootState } from "../../../../state/store";
import {   useSelector } from "react-redux";
const RegistrationStep = () => {
   
  const merchantUi = useSelector((state: RootState) => state.merchantUi);
  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const inactiveColour = useColorModeValue("#999999", "#666666");

  type linkType = {
    id: screenId;
    tittle: string;
  };

  const links: linkType[] = [
    { id: screenId.ACCOUNTINFO, tittle: "Bank Account Information" },
    { id: screenId.SELECTCRYPTO, tittle: "Select cryptocurrencies" },
    // {id: screanId.TRADE, tittle: 'Trade'}
  ];

  return (
    <>
      {links.map((linkItem, index) => (
        <Flex
          flexDirection={"row"}
          // onClick={() => {
          //   dispatch(setActiveBar(linkItem.id));
          // }}
          cursor='pointer'
        >
          <Divider
            orientation='vertical'
            height={10}
            borderWidth='thin'
            size='xl'
            borderColor={
              linkItem.id === merchantUi.activeBar ? "#319EF6" : "#999999"
            }
          />

          <Text
            pl={2}
            fontSize='16px'
            fontWeight={400}
            color={
              linkItem.id === merchantUi.activeBar
                ? activeColour
                : inactiveColour
            }
          >
            {linkItem.tittle}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default RegistrationStep;
