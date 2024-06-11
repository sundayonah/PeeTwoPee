import { Box, Flex, Grid, GridItem, Skeleton, SkeletonCircle, SkeletonText, Text, useColorModeValue, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import SellerInformationSkeleton from './SellerInformationSkeleton';

const SellSkeleton = () => {
  
  const textColor = useColorModeValue("#666666", "#fff");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");

 
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  if (isMobileDevice) {
    return (
      <div>
        <Box>
          <Box
            padding='18px 10px'
            fontSize='14px'
            borderBottom={`1px solid ${borderColor}`}
          >
            <Box>
              <SellerInformationSkeleton />
            </Box>
            <SkeletonText noOfLines={1} width="150px" my="20px" />
            <Box mt="13px">
              {[1,2,3,4].map((item,index)=>(
                <Box mb={4}>
                <Flex justifyContent='space-between'>
                
                  <SkeletonText noOfLines={1} width={`${Math.floor(Math.random() * 50) + 50}px`} />
                    <SkeletonText noOfLines={1} width={`${Math.floor(Math.random() * (100 - 80 + 1) + 80)}px`} />
                  </Flex>
                </Box>))}
              <Box>
              <Flex>
              <Skeleton height='40px' width="100%" mt="10px" />
              </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  } else {
    return (
      <Box>
        <Box>
          <Grid
            templateColumns='repeat(5, 1fr)'
            gap={4}
            padding='18px 10px'
            fontSize='14px'
            color={textColor}
            borderBottom={`1px solid ${borderColor}`}
          >
            <GridItem>
              <SellerInformationSkeleton />
            </GridItem>
            <GridItem>
              <Flex>
              <SkeletonText noOfLines={1} width="100px" height="40px" />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex justifyContent='space-between'>
               
                <SkeletonText noOfLines={1} width="100px" />
              </Flex>
              <Flex justifyContent='space-between'>
                <SkeletonText noOfLines={1} width="100px" marginTop="17px" />
              </Flex>
            </GridItem>
            <GridItem fontSize='12px' fontWeight='400' color={textColor}>
              <Flex justifyContent='center'>
              <SkeletonText noOfLines={1} width="100px" height="40px" />
              </Flex>
            </GridItem>
            <GridItem>
              <Flex justifyContent="center">
              <Skeleton height='25px' width="120px" ml="10px" mt="-7px"/>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default SellSkeleton