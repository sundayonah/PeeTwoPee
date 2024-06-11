import { Box, Spacer, Text, useMediaQuery } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
//import Header from './commonents/Header';
import MyAds from './myAds/Index';
import MyP2pAccount from './MyP2pAccount';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Trades from './Trades/Trades';
import Earning from './Earnings/Earning';

//import TutorialVideo from '../TutorialVideo';
import Faq from './Faq';

import { Footer } from '../../components/footer';
import Referral from '../referral';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const [tabIndex, setTabIndex] = useState(0);

  let location = useLocation();
  const state: { from: { pathname: string } } = location.state as {
    from: { pathname: string };
  };
  const path = state?.from.pathname ?? '/';

  //This effect sets the trades as active tab when user lands on the page
  useEffect(() => {
    if (location?.pathname == '/profile/trades/current') {
      setTabIndex(1);
    } else if (location?.pathname == '/profile/account') {
      setTabIndex(0);
    } else if (location?.pathname == '/profile/ads') {
      setTabIndex(2);
    }
  }, [location]);
  const {t} = useTranslation()

  return (
    <>
      <Tabs
        defaultIndex={path === '/app' ? 2 : 0}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <Box
          background={'#15202B'}
          pt={5}
          overflowX={isMobileDevice ? 'scroll' : 'hidden'}
        >
          <TabList
            color={'white'}
            mx={isMobileDevice ? 0 : 20}
            width={isMobileDevice ? '450px' : 'auto'}
          >
            <Text
              display={isMobileDevice ? 'none' : undefined}
              fontSize={isMobileDevice ? '14px' : 16}
              fontWeight="500px"
              color={'white'}
              mt={isMobileDevice ? 0 : '10px'}
            >
              {t('p2p_home')}
            </Text>
            {!isMobileDevice && <Spacer />}
            <Tab fontSize={isMobileDevice ? '14px' : ''}>{t('my_p2p_acct')} </Tab>
            <Tab fontSize={isMobileDevice ? '14px' : ''}>{t('trades')}</Tab>
            <Tab fontSize={isMobileDevice ? '14px' : ''}>{t('my_ads')}</Tab>
            <Tab fontSize={isMobileDevice ? '14px' : ''}> {t('referrals')}</Tab>
            <Tab fontSize={isMobileDevice ? '14px' : ''}>{t('FAQ')}</Tab>
            <Tab fontSize={isMobileDevice ? '14px' : ''}>
              {t('p2p_earn')}
            </Tab>
          </TabList>
        </Box>
        <TabPanels>
          <TabPanel>
            <MyP2pAccount setTabIndex={setTabIndex} />
          </TabPanel>
          <TabPanel>
            <Trades />
          </TabPanel>
          <TabPanel>
            <MyAds />
          </TabPanel>
          <TabPanel>
            <Referral />
          </TabPanel>
          <TabPanel>
            <Faq />
          </TabPanel>
          <TabPanel>
            <Earning />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </>
  );
};

export default Index;
