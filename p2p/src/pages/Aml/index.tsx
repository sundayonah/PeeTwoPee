import { Flex, Text, useMediaQuery } from "@chakra-ui/react";

const AML = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Flex py={10} justifyContent={"center"} flexDirection={"column"}>
      <Flex
        justifyContent={"center"}
        fontWeight={"bold"}
        fontSize={isMobile ? "18px" : "30px"}
      >
        AML - Anti Money Laundering Policy
      </Flex>

      <Flex py={5} px={isMobile ? 5 : 40} justifyContent={"center"}>
        <Text
          fontSize={isMobile ? "14px" : "16px"}
          textAlign={"justify"}
          lineHeight={"2"}
        >
          Rigelprotocol, operated by Rigelprotocol Labs Ltd (“Rigelprotocol”
          “we,” “our”, or “us”). We take the Anti Money Laundering seriously.
          Money laundering is{" "}
          <b>
            the processing of criminal proceeds to disguise their illegal
            origin.
          </b>{" "}
          We are ready and committed to stand with government agencies and
          legislations to fight money laundering. We have implemented several
          ways to do this. Rigelprotocol reserves the rights to supersede any
          terms or agreement with users who fall under any government agencies
          or legislations Radar on Money Laundering suspicion. Rigelprotocol
          reserves the rights to cooperate with government agencies or
          legislations, providing any aids necessary. Rigelprotocol reserves the
          rights to freeze stolen funds and cryptocurrency without any
          liabilities to fraudster.
        </Text>
      </Flex>
    </Flex>
  );
};

export default AML;
