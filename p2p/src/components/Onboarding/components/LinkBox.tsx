import { Box } from '@chakra-ui/react';
import React from 'react';


interface Props {
    children: React.ReactNode;
}

const TitleBox = ({ children }: Props) => (

    <Box align='justify' fontWeight="600" pt="12px">{children}</Box>

);

export default TitleBox;
