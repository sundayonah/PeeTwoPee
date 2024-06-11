import { Box,  Grid, Link, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";


export function FooterLinks() {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  
  const {t}= useTranslation()
  const footerLinks = {
    Products: [
      { name: "SmartSwap", link: "https://smartswap.rigelprotocol.com/" },
      { name: "Gift Dapp", link: "https://giftdapp.rigelprotocol.com/" },
      { name: "Farming", link: "https://smartswap.rigelprotocol.com/farm" },
      { name: "P2P", link: "/" },
      {
        name: "AutoTrade",
        link: "https://smartswap.rigelprotocol.com/auto-period",
      },
      {
        name: "Smart Bid",
        link: "https://smartswap.rigelprotocol.com/smartbid",
      },
      { name: "LaunchPad", link: "https://launchpad.rigelprotocol.com/" },
    ],
    Company: [
      { name: t('about_us'), link: "https://www.rigelprotocol.com/about" },
      { name: t('road_map'), link: "https://www.rigelprotocol.com/#roadMaps" },
      { name: t('partners'), link: "https://www.rigelprotocol.com/#partners" },
      { name: t('press_resources'), link: "https://www.rigelprotocol.com/press" },
    ],
    Support: [
      { name: "FAQs", link: "https://www.rigelprotocol.com/faqs" },
      { name: t('blog'), link: "https://medium.com/rigelprotocol" },
    ],
    Legal: [
      {
        name: t('design_compliance'),
        link: "https://www.rigelprotocol.com/design-compliance",
      },
      {
        name: t('privacy_policy'),
        link: "https://www.rigelprotocol.com/privacy-policy",
        external: true,
      },
      {
        name: t('TC'),
        link: "https://www.rigelprotocol.com/terms-and-condition",
        external: true,
      },
      { name: t('report_fraud'), link: "https://www.t.me/rigelprotocol" },
      { name: t('anti-money'), link: "https://rigelprotocol.com/AML", external: true },
    ],
  };
  return (
    <Box>
      <Grid
        templateColumns={isMobileDevice ? "repeat(2,1fr)" : "repeat(4,1fr)"}
        mt={3}
      >
        <Box>
          <Box color='#666666' fontSize='16px'>
            {t('products')}
          </Box>
          {footerLinks["Products"].map((obj, index) => {
            return (
              <Box color='#fff' my={3} key={index}>
                <Link isExternal href={obj.link} fontSize='16px'>
                  {obj.name}
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Box color='#666666' fontSize='16px'>
            {t('company')}
          </Box>

          {footerLinks["Company"].map((obj, index) => {
            return (
              <Box color='#fff' my={3} key={index} fontSize='16px'>
                <Link isExternal href={obj.link}>
                  {obj.name}
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Box color='#666666' fontSize='16px'>
            {t('support')}
          </Box>

          {footerLinks["Support"].map((obj, index) => {
            return (
              <Box color='#fff' my={3} key={index} fontSize='16px'>
                <Link isExternal href={obj.link}>
                  {obj.name}
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Box color='#666666' fontSize='16px'>
            {t('legal')}
          </Box>

          {footerLinks["Legal"].map((obj, index) => {
            return (
              <Box color='#fff' my={3} key={index} fontSize='16px'>
                {obj.name === "Anti-Money Laundering Policy" ? (
                 <Link isExternal={obj.external} href={obj.link}>
                 {obj.name}
               </Link>
                ) : (
                  <Link isExternal={obj.external} href={obj.link}>
                    {obj.name}
                  </Link>
                )}
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Box>
  );
}
