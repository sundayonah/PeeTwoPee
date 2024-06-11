import { Box, Flex, Grid, GridItem, Skeleton, SkeletonText, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
const OrderSkeletonModal = () => {
    const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
    const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
    const borderColor = useColorModeValue("#FFF", "#324D68");
  return (
    <Grid templateColumns={isMobileDevice ? "repeat(1,1fr)" : "repeat(2,1fr)"} mx="auto">

      <GridItem background={backgroundColor} p='40px'>
        <Box my={4}>
          <Box >
            {[1,2,3,4,5].map((item, index: number) => {
              return (
                <Flex
                  justifyContent='space-between'
                  my={6}
                  fontSize='12px'
                  key={index}
                  gap={5}
                
                >
                  <SkeletonText noOfLines={1} width="100px" />
                  <SkeletonText noOfLines={1} width="100px" />
                 
                </Flex>
              );
            })}
          </Box>
        </Box>
      </GridItem>
      <GridItem background={borderColor} p='40px'>
        <Box>
          <SkeletonText noOfLines={1} width="100px" />
          <Skeleton width="240px" height='40px' mt="15px"/>
        </Box>
        <Box my={9}>
        <SkeletonText noOfLines={1} width="100px" />
          <Skeleton width="240px" height='40px' mt="15px"/>
        </Box>
        <Flex justifyContent='space-between'>
        <Skeleton width="100%" height='30px' mt="15px"/>
          </Flex>
      </GridItem>
      </Grid>
  )
}

export default OrderSkeletonModal