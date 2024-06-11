import { AddIcon , MinusIcon} from "@chakra-ui/icons"
import { Box, Circle, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { useTranslation } from "react-i18next";

export default function QuestionFAQ(){
    const [openQuestion, setOpenQuestion] = useState(9)
    
  const bgColour = useColorModeValue('#F2F5F8', "#213345");
  const { t } = useTranslation()
    const questions = [
        {
            question:t('faq1'),
            answer:t('ans1')
        },
        {
            question:t('ques_offer'),
            answer:t('offers_on_p2p')
        },
        {
            question:t('ques_pay'),
            answer:t('faq_payment')
        },
        {
            question:t('ques_days'),
            answer:t('faq_completion_rate')
        },
        {
            question:t('ques_ads'),
            answer:t('faq_ads')
        },
        {
            question:t('faq6'),
            answer:t('ans6')
        },
    ]
    return (
        <div>
           <Heading as="h3" mb={4}>FAQs</Heading>
       {questions.map((question,index)=>{
           return (
                  <Flex key={index}>
                   <Circle size="30px" color="#319EF6" border="2px solid #319EF6" my={2} onClick={()=>setOpenQuestion(index)} cursor="pointer">
                   {openQuestion === index ? <MinusIcon/> : <AddIcon />  }
                   </Circle>
                   <Box  >
                    <Text ml={5}  mt={3}>{question.question}</Text>
                    {openQuestion ===index && <Box p="12px" bg={bgColour} ml={5} my="10px" >
                 
                    {question.answer}
                    
                   
                   </Box>}
                   </Box>
               </Flex>
              
           )
       })

       }
        </div>
    )
} 