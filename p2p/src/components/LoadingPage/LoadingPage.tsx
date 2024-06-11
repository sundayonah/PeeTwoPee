import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const LoadingPage = () => {
  const path=["/","/app","/unauthorized","/trade/buy","/trade/sell"]
  // "/buy/order", "/sell/order", "/buy/order/trade"
  const location = useLocation();
  return ( 
    <Flex justifyContent='center' alignItems='center'>
      <Spinner
        mt={20}
        thickness='6px'
        speed='1s'
        emptyColor='transparent'
        color='#319EF6'
        size='xl'
        w='120px'
        h='120px'
      />
    </Flex>
  );
};

export default LoadingPage;
