import React from "react";
import {
 
  Text,
  Flex,
  useColorModeValue,
 
  Divider,
} from "@chakra-ui/react";
//import { screenId, setActiveBar } from "../../../../state/council";
//import { RootState } from "../../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { marchantBadgeScreens, setActiveScreen } from "../../../state/marchantBadge";
const MarchantBadgeSteps = () => {
  const dispatch = useDispatch();
  const badgeUI = useSelector((state: RootState) => state.marchantBadge);
  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const inactiveColour = useColorModeValue("#999999", "#666666");

  type linkType = {
    id: marchantBadgeScreens;
    tittle: string;
  };

  const links: linkType[] = [
    { id: marchantBadgeScreens.STAKE, tittle: "Stake" },
  //  { id: marchantBadgeScreens.SupportedCrypto, tittle: "Supported Crypto" },
 //   { id: null, tittle: "Start Voting" },

  ];

  return (
    <>
      {links.map((linkItem, index) => (
        <Flex
          flexDirection={"row"}
          onClick={()=> {
            if(linkItem.id != null){
              dispatch(setActiveScreen(linkItem.id))
            }            
          }}
          cursor='pointer'
          key={index}
        >
          <Divider
            orientation='vertical'
            height={10}
            borderWidth='thin'
            size='xl'
            borderColor={
              linkItem.id === badgeUI.activeBar ? "#319EF6" : "#999999"
            }
          />

          <Text
            pl={2}
            fontSize='16px'
            mt={1.5}
            fontWeight={400}
            color={
              linkItem.id === badgeUI.activeBar
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

export default MarchantBadgeSteps;
