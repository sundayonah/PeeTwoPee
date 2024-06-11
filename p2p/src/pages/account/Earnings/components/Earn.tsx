import {
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useFetchEarnData } from "../../../../utils/hooks/useFetchEarnData";
import EarnBody from "./EarnBody";
import { useTranslation } from "react-i18next";

interface EarnProps {
  openStakeModal: () => void;
  claimpRGP: () => void;
  allInfo: any[];
  claimReward: () => void;
}

const Earn = ({
  openStakeModal,
  claimpRGP,
  allInfo,
  claimReward,
}: EarnProps) => {
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const mode = useColorModeValue("light", "dark");
  const {t} = useTranslation()

  return (
    <>
      <Text mb={3} fontWeight={"700"} fontSize={"14px"} mt={6}>
        {t("30_earn")}
      </Text>
      <TableContainer fontSize={14}>
        <Table size='lg' variant='simple'>
          <Thead
            textTransform={"none"}
            background={
              mode === LIGHT_THEME
                ? "#F2F5F8  !important"
                : mode === DARK_THEME
                ? "#213345"
                : mode === DARK_THEME
                ? "#213345"
                : mode === LIGHT_THEME
                ? "#F2F5F8"
                : "#F2F5F8 !important"
            }
          >
            <Tr fontSize='14px' fontWeight='light' textTransform={"none"}>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                S/N
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('un')}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t("rew_bal")}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t("amt_staked")}
              </Th>
              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t('staking_countdown')}
              </Th>

              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t("action")}
              </Th>
            </Tr>
          </Thead>
          {allInfo?.length === 0 ? (
            <div>{t("no_earn")}</div>
          ) : (
            allInfo?.map((item, index) => {
              return (
                <>
                  <EarnBody
                    claimpRGP={claimpRGP}
                    openStakeModal={openStakeModal}
                    index={index}
                    earning={item}
                  />
                </>
              );
            })
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default Earn;
