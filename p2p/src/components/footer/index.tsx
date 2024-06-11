import { Box, Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import { FooterLinks } from "./FooterLinks";
import { FooterSocialMedia } from "./FooterSocialMedia";

export function Footer() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  return (
    <Flex background='#15202B' py='70px'>
      <Grid
        templateColumns={isMobileDevice ? "100%" : "40% 60%"}
        width='90%'
        margin='0 auto'
      >
        <FooterSocialMedia />
        {isMobileDevice && <Box mt='20px' />}
        <FooterLinks />
      </Grid>
    </Flex>
  );
}
