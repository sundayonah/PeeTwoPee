import React from "react";

import {
 
  Text,
  Flex,
  useColorModeValue, 
  Divider,
} from "@chakra-ui/react";
import { screanId } from "../../../../state/accountUi";
import { RootState } from "../../../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const RegistrationStep = () => {
  const { t } = useTranslation()
  const accountUi = useSelector((state: RootState) => state.accountUi);
  const activeColour = useColorModeValue("#333333", "#DCE5EF");
  const inactiveColour = useColorModeValue("#999999", "#666666");

  type linkType = {
    id: screanId;
    tittle: string;
  };

  const links: linkType[] = [
    { id: screanId.CREATEACCOUNT, tittle: t('create_account') },
    { id: screanId.VERIFYNUMBER, tittle: t('verify_email') },
    { id: screanId.PAYMETHOD, tittle: t('add_payment_method_text') },
    { id: screanId.TRADE, tittle: t('trade') },
  ];

  return (
    <>
      {links.map((linkItem, index) => (
        <Flex flexDirection={"row"} cursor='pointer' key={index}>
          <Divider
            orientation='vertical'
            height={10}
            size='xl'
            borderWidth='thin'
            borderColor={
              linkItem.id === accountUi.activeBar ? "#319EF6" : "#999999"
            }
          />

          <Text
            pl={2}
            fontSize='16px'
            fontWeight={400}
            color={
              linkItem.id === accountUi.activeBar
                ? activeColour
                : inactiveColour
            }
          >
            {linkItem.tittle}
          </Text>
        </Flex>
      ))}
    </>
  );
};

export default RegistrationStep;
