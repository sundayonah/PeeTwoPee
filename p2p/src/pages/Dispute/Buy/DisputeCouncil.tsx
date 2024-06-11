import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function DisputeCouncil(){
    const textColor= useColorModeValue("#333333","#fff")
    const lightColor = useColorModeValue("#666666","#DCE5EF")
    const backgroundColor =useColorModeValue("#F2F5F8","#213345")
    const borderColor= useColorModeValue("#DEE6ED","#324D68")

    return (
        <Box>
            <Text
            color={textColor}
            fontSize="16px"
            fontWeight="500">Council Decision <InfoOutlineIcon ml={2}/></Text>
             <Text fontSize="14px" color={lightColor} mt={3}>The 5 members of the council have all voted and a decision has been made. The decision of the council is shown below</Text> 
             <Box
             border={`1px solid ${borderColor}`}
             background={backgroundColor}
             borderRadius="4px"
             padding ={4}
             mt={4}
             fontSize="14px"
             color={textColor}>
             You have won this dispute. 3 out of 5 council members voted that you made the payment. The crypto will now be transferred to you from the seller.
             </Box>
        </Box>
    )
}