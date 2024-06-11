
import {
  Flex,
  Box,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { BalanceBoxList, TransactionList } from './components';


export default function Wallet() {

const { t } = useTranslation()

  return (
    <Box
      padding={['30px 10px', '30px 10px', '30px 10px']}
      width={['100%', '100%', '90%']}
      m={'30px auto'}
    >
      <Box>
        <Heading as="h1" fontSize={['25px', '40px']}>
          {t('wallet')}
        </Heading>
        <Text fontSize="md" mt={2}>
         {t('wallet_text')}
        </Text>
      </Box>

      <Box mt={6} width={["97%","97%","100%"]} mx="auto">
        <Tabs>
          <TabList>
            <Tab>{t('balance')}</Tab>
            <Tab>{t('transaction')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p="0" pt={4} pb={4}>
              <Flex>
                <BalanceBoxList />
              </Flex>
            </TabPanel>
            <TabPanel p="0" pt={4} pb={4}>
              <TransactionList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
