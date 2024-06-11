import {
  Box,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Rectangle from "../../../assets/Rectangle.png";
const Header = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const {t} = useTranslation()
  return (
    <>
      <Box
        background={"#15202B"}
        // height={"59px"}
        pt={5}
        display='flex'
        alignContent={"space-between"}
        flexDirection='row'
      >
        <Text
          ml={isMobileDevice ? 5 : 20}
          fontSize={isMobileDevice ? 14 : 16}
          fontWeight='500px'
          color={"white"}
        >
          P2P
        </Text>
        {!isMobileDevice && <Spacer />}
        <Text
          fontSize={isMobileDevice ? 14 : 16}
          fontWeight='500px'
          mx={3}
          cursor='pointer'
          color={"white"}
        >
          Tutorial video
        </Text>
        <Text
          fontSize={isMobileDevice ? 14 : 16}
          fontWeight='500px'
          mx={3}
          cursor='pointer'
          color={"white"}
        >
          {t('FAQ')}
        </Text>
        <Box>
          <Text
            fontSize={isMobileDevice ? 14 : 16}
            fontWeight='500px'
            mx={3}
            mr={isMobileDevice ? 0 : 20}
            cursor='pointer'
            color={"#4CAFFF"}
          >
            {t('my_p2p_acct')}
          </Text>
          <Image
            mt={1}
            ml={3}
            width={isMobileDevice ? "100px" : "114px"}
            height={1}
            src={Rectangle}
          />
        </Box>
      </Box>
    </>
  );
};

export default Header;
