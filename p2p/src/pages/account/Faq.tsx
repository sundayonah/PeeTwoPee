import React from 'react'
import { Box,   Button, Divider , Accordion, AccordionItem, AccordionPanel, AccordionButton, Flex, useColorModeValue, Text, useMediaQuery, Icon } from "@chakra-ui/react";
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const bgColour = useColorModeValue('#F2F5F8', "#213345");
  const mode = useColorModeValue("light", "dark");
  const {t} = useTranslation()
  const data = [
    {id: 1, title: t('ques_p2p'), text: t('what_is_p2p')},
    {id: 2, title: t('ques_offer'), text:t('offers_on_p2p')},
    {id: 3, title: t('ques_pay'), text: t('faq_payment')},
    {id: 4, title:t('ques_days'), text: t('faq_completion_rate')},
    {id: 5, title: t('ques_ads'), text: t('faq_ads')},
    {id: 6, title: "How do I report when I notice a malicious activity?", text: ""},
  ]

  const qaData = [
    {id: 1, title: "How do I make a payment?", text: "Peer-to-peer (P2P) trading is a type of cryptocurrency exchange method that allows traders to trade directly with one another without the need for a centralized third party to facilitate the transactions."},
    {id: 2, title: "How do I make a payment?", text: "No, they are not. The offers you see on the P2P Buy and Sell pages are not offered by Rigel Protocol. Rigel Protocol offers a platform to enable the trading, but the offers are provided by other users on the platform."},
  ]

  return (
    <Box
      mx={isMobileDevice ? 3 : 16}
      py={10}
      mb={isMobileDevice ? 20 : 7}
    >
      <Text py={3} color={mode === "dark" ? "#DCE5EF" : "#666666"} fontSize={20} fontWeight={400}>{t('FAQ_text')}</Text>
      <Divider />
      
      <Flex py={4} flexDirection={isMobileDevice ? 'column' : 'row'} justifyContent={"space-between"}>
        <Box width={isMobileDevice ? '100%' : "54%"}>
        <Text py={3} color={mode === "dark" ? "#DCE5EF" : "#666666"} fontSize={20} fontWeight={400}>{t('FAQ')}</Text>
          { data.map((item) => 
          <Flex py={4} key={item.id}>
            <Accordion width={"100%"} allowToggle>
                <AccordionItem border={"none"} >
                    {({ isExpanded }) => (
                        <>
                          <AccordionButton paddingLeft={0} _focus={{border:"none"}} >
                              {isExpanded ? (
                                  <Icon as={FaMinusCircle} fontSize='24px' />
                                ) : (
                                  <Icon as={FaPlusCircle} fontSize='24px' />
                              )}
                              <Box flex='1' ml={8} mb={2} fontSize={16} fontWeight={400} textAlign='left'>
                                  {item.title}
                              </Box>
                            </AccordionButton>
                              
                            <AccordionPanel ml={14} bg={bgColour} fontWeight={400} fontSize={14} pb={4}>
                              {item.text}
                            </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
              </Accordion>
          </Flex> 
          )}
        </Box>
        <Box width={isMobileDevice ? "100%" :"37%"}>
          <Text py={3} color={mode === "dark" ? "#DCE5EF" : "#666666"} fontSize={20} fontWeight={400}> Ask a question </Text>
         {/* <Textarea
              placeholder={"What’s your question?"}
              fontSize='12px'
              color={mode === "dark" ? "#DCE5EF" : "#666666"}
              height="140px"
              p={4}
              backgroundColor={bgColour}
              border={mode === "dark" ? "1px solid #324D68" : "1px solid #DEE6ED"}
              borderRadius='6px'
              name="faq"
                                /> */}
           <a href='https://www.t.me/rigelprotocol' target={'_blank'} rel="noreferrer"> 
            <Button   mt={4} isFullWidth variant={'brand'}>
                Submit question
            </Button>
            </a>
            <Text py={3} mt={8} color={mode === "dark" ? "#DCE5EF" : "#666666"} fontSize={20} fontWeight={400}>My previous questions</Text>
            { qaData.map((item) => 
              <Flex py={4} key={item.id}>
                <Accordion width={"100%"} allowToggle>
                    <AccordionItem border={"none"} >
                        {({ isExpanded }) => (
                            <>
                              <AccordionButton paddingLeft={0} _focus={{border:"none"}}>
                                {isExpanded ? (
                                    <Icon as={FaMinusCircle} fontSize='24px' />
                                  ) : (
                                    <Icon as={FaPlusCircle} fontSize='24px' />
                                )}
                                <Box flex='1' ml={8} mb={2} fontSize={16} fontWeight={400} textAlign='left'>
                                      {item.title}
                                </Box>
                            </AccordionButton>
                              
                            <AccordionPanel ml={14} bg={bgColour} fontWeight={400} fontSize={14} pb={4}>
                              {item.text}
                            </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                  </Accordion>
              </Flex> 
              )}
        </Box>                
      </Flex>
    </Box>
  )
}

export default Faq