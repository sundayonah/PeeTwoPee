import { Flex, useColorModeValue, useMediaQuery, Text, Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const DisputeHeader = () => {
    
  const inactiveColour = useColorModeValue("#666666", "#999999");
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const mode = useColorModeValue("light", "dark");

  return (
    <Box background={
      mode === LIGHT_THEME
        ? "#F2F5F8  !important"
        : mode === DARK_THEME
        ? "#213345"
        : mode === DARK_THEME
        ? "#213345"
        : mode === LIGHT_THEME
        ? "#F2F5F8"
        : "#F2F5F8 !important"
    } >
      <Box py={'30px'} mx={isMobileDevice ? 4 : 20}>
    <Link   to="/council/dispute">
      <Flex cursor={"pointer"} alignItems={"center"}>
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5675 13.8191C7.3775 13.8191 7.1875 13.7491 7.0375 13.5991L0.9675 7.52914C0.6775 7.23914 0.6775 6.75914 0.9675 6.46914L7.0375 0.399141C7.3275 0.109141 7.8075 0.109141 8.0975 0.399141C8.3875 0.689141 8.3875 1.16914 8.0975 1.45914L2.5575 6.99914L8.0975 12.5391C8.3875 12.8291 8.3875 13.3091 8.0975 13.5991C7.9575 13.7491 7.7575 13.8191 7.5675 13.8191Z"
            fill="#666666"
          />
          <path
            d="M18.5019 7.75H1.67188C1.26188 7.75 0.921875 7.41 0.921875 7C0.921875 6.59 1.26188 6.25 1.67188 6.25H18.5019C18.9119 6.25 19.2519 6.59 19.2519 7C19.2519 7.41 18.9119 7.75 18.5019 7.75Z"
            fill="#666666"
          />
        </svg>

        <Text color={inactiveColour} px={2}>
          Back to Disputes
        </Text>
      </Flex>
    </Link>  
    </Box> 
  </Box>
  )
}

export default DisputeHeader