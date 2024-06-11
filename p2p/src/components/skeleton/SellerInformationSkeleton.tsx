import { Box, Flex, Skeleton, SkeletonCircle, SkeletonText, useMediaQuery } from '@chakra-ui/react';

const SellerInformationSkeleton = () => {
    const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
    if (isMobileDevice) {
        return (
          <Flex width="100%">
            <SkeletonCircle size='14' />
            <Box mt='17px' width="100%">
              <Flex mt={1} justifyContent="space-between" width="97%" ml="10px">
                <Flex>
                     <SkeletonText noOfLines={1} width="50px" />
              <SkeletonCircle size='2' ml="6px" />
                </Flex>
           
              <Skeleton height='20px' width="40px" ml="10px" mt="-7px"/>
              </Flex>
             
            </Box>
          </Flex>
        );
      } else {
        return (
          <Flex>
              <SkeletonCircle size='10' />
            <Box ml={3}>
              <Flex mt={1}>
              <SkeletonText  noOfLines={1} width="60px" />
              <SkeletonCircle size='2' color="green" ml="10px" />
              {/* <SkeletonText  noOfLines={1} width="40px" ml="10px"/> */}
              <Skeleton height='20px' width="40px" ml="10px" mt="-7px"/>
              </Flex>
              <Flex>
                 <SkeletonText mt="17px" noOfLines={1} spacing='4' width="100px" />
              </Flex>
            </Box>
          </Flex>
        );
      }
}

export default SellerInformationSkeleton