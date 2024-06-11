import { Box, Circle, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const ProfileImage = ({url,initials}:{url?:string,initials?:string}) => {
    const innerCircle = useColorModeValue("rgba(83, 174, 247, 0.1)", "rgba(83, 174, 247, 0.1)")
    const outerCircle = useColorModeValue("linear-gradient(131.71deg, rgba(132, 200, 255, 0.15) 13.86%, #DDEEFB 85.75%)", "linear-gradient(131.71deg, rgba(132, 200, 255, 0.15) 13.86%, #DDEEFB 85.75%)")
    const color=useColorModeValue("#2169A4","white")
  return (
    <>
    {
        url ? (
            <Box
                bgImage={`url(${url})`}
                bgPos="center"
                bgSize="cover"
                w="100%"
                h="100%"
                borderRadius="50%"
            />
            ) : (
            <Box>
                <Circle size={["58px","58px","100px"]} bg={innerCircle} color={color}>
                     <Circle size={["45px","45px","72px"]} bg={innerCircle}fontSize={["14px","14px","19px"]}>
                {initials}
                </Circle>
                </Circle>
               
            </Box>
            )
    }
    </>
    
  )
}

export default ProfileImage