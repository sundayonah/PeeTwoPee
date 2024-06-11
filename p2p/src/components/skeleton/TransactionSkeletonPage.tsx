import { Box, Flex, Grid, Skeleton, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import SkeletonChat from './SkeletonChat';
import TransactionModal from './TransactionModal';

const TransactionSkeletonPage = () => {
    const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
    const borderColor = useColorModeValue("#DEE6ED", "#213345");
    return (
        <Box  px={6} py={5}>
            <Flex justifyContent="space-between" flexDir={["column","column","row"]} my="20px" px="40px" >
            <Box>
                        {[1,2].map((i,d)=>(<Skeleton height='20px' width={["95%","95%","200px"]} my="10px" />))}
                    </Box>
                    <Box>
                        {[1,2].map((i,d)=>(<Skeleton height='20px' width={["95%","95%","200px"]} my="10px" />))}
                    </Box>

            </Flex>
             <Grid py={6}
              templateColumns={isMobileDevice ? "100%" : "58% 40%"}
              gap={4}>
            <Box border={`1px solid ${borderColor}`} borderRadius='8px' p={[0,0,5]}>
               <TransactionModal /> 
            </Box>
            
            <Box border={`1px solid ${borderColor}`} mb={["30px","30px",0]} borderRadius='8px' p={5}>
            <SkeletonChat />
            </Box>
           
        </Grid>
        </Box>
       
    )
}

export default TransactionSkeletonPage