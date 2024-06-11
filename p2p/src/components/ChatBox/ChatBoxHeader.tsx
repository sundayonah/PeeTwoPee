import {
  Box,
  Flex,
  Icon,
  Img,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { getNetwork } from "../../utils";
import { useActiveWeb3React } from "../../utils/hooks";
import { IFromInfo } from "../../utils/hooks/useOrder";
import Rank from "../Rank";
export default function ChatBoxHeader({
  fromInfo,
  modal,
  closeChatModal,
  clearNotification,
}: {
  fromInfo: IFromInfo;
  modal?: boolean;
  closeChatModal?: () => void;
  clearNotification?: () => void;
}) {
  const img = "";
  const textColor = useColorModeValue("#333333", "#fff");
  const lightColor = useColorModeValue("#666666", "#DCE5EF");
  const backgroundColor = useColorModeValue("#F2F5F8", "#213345");
  const borderColor = useColorModeValue("#DEE6ED", "#324D68");
  const { chainId } = useActiveWeb3React();
  const {t} = useTranslation()
  return (
    <Box
      background={backgroundColor}
      p={5}
      border={`1px solid ${borderColor}`}
      borderRadius='4px'
      
    >
      <Box>
        {fromInfo && (
          <Flex>
            {img ? (
              <Img src={img} />
            ) : (
              <Flex
                backgroundColor='#319EF6'
                borderRadius='50%'
                width='40px'
                height='40px'
                fontSize='22px'
                fontWeight='500'
                justifyContent='center'
                alignItems='center'
                color='#15202B'
              >
                {fromInfo?.fullname?.split("")[0].toUpperCase()}
              </Flex>
            )}
            <Box ml={3} width='100%'>
              <Box>
                <Flex mt={-1} justifyContent='space-between'>
                  <Box>
                    <Box>
                      <Text color='#319EF6' fontSize='14px' mr={2}>
                        {fromInfo?.fullname}
                      </Text>
                      {fromInfo?.userRankInfo[getNetwork(chainId)]?.rank && (
                        <Text fontSize='14px' color='#DCE6EF' mt='4px'>
                          {fromInfo?.userRankInfo[getNetwork(chainId)]?.rank}{" "}
                          Rank
                        </Text>
                      )}
                    </Box>
                    {fromInfo?.userRankInfo[getNetwork(chainId)]?.rank && (
                      <Rank
                        rank={fromInfo?.userRankInfo[getNetwork(chainId)]?.rank}
                      />
                    )}
                  </Box>
                  {modal && (
                    <Icon
                      as={AiOutlineCloseSquare}
                      size='27px'
                      mt='3px'
                      onClick={() => {
                        closeChatModal();
                        clearNotification();
                      }}
                    />
                  )}
                </Flex>
                {/* <Text color={textColor} mt={1} 
                 fontSize="12px">Bronze related</Text>   */}
              </Box>
              <Flex justifyContent='space-between' mt={5}>
                <Box>
                  <Text color={lightColor} fontSize='14px'>
                    {t('30dt')}
                  </Text>
                  <Text color={textColor} fontSize='16px'>
                    {fromInfo?.completed_orders ?? 0}
                  </Text>
                </Box>
                <Box>
                  <Text color={lightColor} fontSize='14px'>
                    {t('30dc')}
                  </Text>
                  <Text color={textColor} fontSize='16px'>
                    {fromInfo?.order_completion_rate ?? 0}%
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
