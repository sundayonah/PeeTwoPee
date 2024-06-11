import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function BackComponent({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  const navigate = useNavigate();
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  return (
    <Box background={backgroundColor} py={4} px={4}>
      <Box cursor="pointer"
       onClick={() => navigate(-1)}
       >
        <ArrowBackIcon mr={2} fontSize='20px' />
        {text}
      </Box>
    </Box>
  );
}
