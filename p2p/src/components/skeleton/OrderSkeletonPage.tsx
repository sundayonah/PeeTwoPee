import { Box, Flex, Grid, Skeleton, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import OrderSkeletonModal from './OrderSkeletonModal';
import SkeletonChat from './SkeletonChat';

const OrderSkeletonPage = () => {
    const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
    const borderColor = useColorModeValue("#DEE6ED", "#213345");
    return (
        <Box  px={6} py={5}>
            <Flex justifyContent="space-between" my="20px" px="40px" >
                              <Skeleton height='20px' width="200px"/>
                              <Skeleton height='20px' width="200px"/>

            </Flex>
             <Grid py={6}
              templateColumns={isMobileDevice ? "100%" : "58% 40%"}
              gap={4}>
            <Box border={`1px solid ${borderColor}`} borderRadius='8px' p={[0,0,5]}>
               <OrderSkeletonModal /> 
            </Box>
            
            <Box border={`1px solid ${borderColor}`} mb={["30px","30px",0]} borderRadius='8px' p={5}>
            <SkeletonChat />
            </Box>
           
        </Grid>
        </Box>
       
    )
}

export default OrderSkeletonPage