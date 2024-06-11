import { Box, Flex,  Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
const TransactionModal = () => {
  return (
    <Box p="20px">
        <Box my={4}>
          <Flex justifyContent='space-between'>
            {[1,2,3].map((item, index: number) => {
              return (
                <Box
                  key={index}>
                  <SkeletonCircle size="19" />
                  <Skeleton height="20px" noOfLines={1} width={["90px","90px","130px"]} mt="10px"/>
                 
                </Box>
              );
            })}
          </Flex>
        </Box>
        <Box mt="30px">
            <Flex>
            <SkeletonCircle size="3" mr="8px" />
            <SkeletonText noOfLines={1} width="130px" mt="3px"/>
            </Flex>
          <Skeleton width="80%" height='60px' mt="15px" ml="19px" />
        </Box>
        <Box mt="30px">
            <Flex>
            <SkeletonCircle size="3" mr="8px" />
            <SkeletonText noOfLines={1} width="190px" mt="3px"/>
            </Flex>
          <Skeleton width="80%" height='60px' mt="15px" ml="19px" />
        </Box>
        <Box mt="30px">
            <Flex>
            <SkeletonCircle size="3" mr="8px" />
            <SkeletonText noOfLines={1} width="190px" mt="3px"/>
            </Flex>
            <Flex mt="15px">
                 <Skeleton width="250px" height='40px' mt="15px" ml="19px" />
                 <Skeleton width="180px" height='40px' mt="15px" ml="19px" />
            </Flex>
         
        </Box>
      </Box>
  )
}

export default TransactionModal