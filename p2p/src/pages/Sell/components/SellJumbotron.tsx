import {
  Box,
  Flex,
  Text,
  Heading,
  useMediaQuery,

} from "@chakra-ui/react";
import JUMBOTRON from "../../../assets/consellation.png";
import BuyAndSellVideo from '../../../components/Modals/BuyAndSellVideo'

type Iprops = {
  head: string;
  text: string;
};
export default function SellJumbotron({ head, text }: Iprops) {

  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  return (
    <>
      <Box pb={4} fontSize="xl" backgroundColor={'#19202C'}  backgroundImage={`url(${JUMBOTRON})`}>
        <Flex
          color={'white'}
          mt={-6}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100vw"
          maxWidth="100%"
          boxSizing="border-box"
          height={isMobileDevice ?"200px" : "300px"}
        >
          <Heading as="h1" fontSize={isMobileDevice?"20px":"40px"}>{head}</Heading>
          <Text    fontSize={isMobileDevice?"12px":"16px"}  marginTop={isMobileDevice?"5px":"15px"} mx={isMobileDevice ? "20px" : "auto"} textAlign="center">
            {text}
          </Text>
        </Flex>
        <BuyAndSellVideo/>
        
      </Box>
    </>
  );
}
