import React from "react";
import {
   
  Text,
  Flex,
  useColorModeValue,
   
  Divider,
} from "@chakra-ui/react";
import { screenId, setActiveBar } from "../../../../state/council";
import { RootState } from "../../../../state/store";
import { useDispatch, useSelector } from "react-redux";
const RegistrationStep = () => {
  const dispatch = useDispatch();
  const councilUI = useSelector((state: RootState) => state.councilUI);
  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const inactiveColour = useColorModeValue("#999999", "#666666");

  type linkType = {
    id: screenId;
    tittle: string;
  };

  const links: linkType[] = [
    { id: screenId.WALLET, tittle: "Stake" },
   // { id: screenId.STARTVOTING, tittle: "Vote" },

  ];

  return (
    <>
      {links.map((linkItem, index) => (
        <Flex
          flexDirection={"row"}
          onClick={()=> {
            linkItem.id === screenId.STARTVOTING ? dispatch(setActiveBar(screenId.STARTVOTING)) :
            dispatch(setActiveBar(linkItem.id))}
          }
          cursor='pointer'
        >
          <Divider
            orientation='vertical'
            height={10}
            borderWidth='thin'
            size='xl'
            borderColor={ "#319EF6"}
          />

          <Text
            pl={2}
            fontSize='16px'
            fontWeight={400}
            mt={1.5}
            color={
              linkItem.id === councilUI.activeBar
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
