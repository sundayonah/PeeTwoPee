import { Box, Flex, Skeleton } from '@chakra-ui/react'
import React from 'react'

const SkeletonChat = () => {
  return (
    <Box>
        <Skeleton width="100%" height='80px' mt="15px"/>
        <Skeleton width="80%" height='80px' mt="15px" mx="auto"/>
        
        {[1,2,3,4,5].map((item,index)=> (
            <Flex justifyContent={item%2 ===0 ? "flex-end" : "flex-start"} my="10px">
                 <Skeleton width="250px" height='30px' mt="15px" borderRadius={item%2 ===0 ? "12px 12px 0px 12px":"12px 12px 12px 0"}  />
            </Flex>
           ))

        }
        <Skeleton width="100%" height='40px'  mt="35px"/>
    </Box>
  )
}

export default SkeletonChat