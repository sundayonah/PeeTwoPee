import React from 'react';

import {
 
  Text,
  Flex,
  useColorModeValue,
 
  Divider,
} from '@chakra-ui/react';
import { screanId,  } from '../../../state/accountUi';  
const Steps = ({ activeBar }) => {
 
  const activeColour = useColorModeValue('#333333', '#DCE5EF');
  const inactiveColour = useColorModeValue('#999999', '#666666');

  type linkType = {
    id: screanId;
    tittle: string;
  };

  const links: linkType[] = [
    { id: 0, tittle: 'Edit Account' },
    { id: 1, tittle: 'Verify Email' },
  ];

  return (
    <>
      {links.map((linkItem, index) => (
        <Flex flexDirection={'row'} cursor="pointer" key={index}>
          <Divider
            orientation="vertical"
            height={10}
            size="xl"
            borderWidth="thin"
            borderColor={linkItem.id === activeBar ? '#319EF6' : '#999999'}
          />

          <Text
            pl={2}
            fontSize="16px"
            fontWeight={400}
            color={linkItem.id === activeBar ? activeColour : inactiveColour}
          >
            {linkItem.tittle}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default Steps;
