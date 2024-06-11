import {
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Text,
} from "@chakra-ui/react";
import YourEarnBody from "./YourEarnBody";
import { useTranslation } from "react-i18next";

interface EarnProps {
  earnList: { prgpTokenAllowance: string; prgpTokenBalance: string }[];
  userData: any;
  claimpRGP: () => void;

  userInfo: any;
  TimeFrame: number;
  openStakeModal: () => void;
  claimReward: () => void;
  currentEvent: string;
  buttonText: boolean;
}

const YourEarn = ({
  earnList,
  userData,
  claimpRGP,
  userInfo,
  TimeFrame,
  openStakeModal,
  claimReward,
  buttonText,
  currentEvent,
}: EarnProps) => {
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  const {t} = useTranslation()
  const mode = useColorModeValue("light", "dark");
  return (
    <>
      <Text mb={3} fontWeight={"700"} fontSize={"14px"} mt={6}>
        {t("y_earn")}
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
                {t("staking_countdown")}
              </Th>

              <Th fontWeight='400' fontSize='14px' textTransform={"none"}>
                {t("action")}
              </Th>
            </Tr>
          </Thead>
          {earnList?.length === 0 ? (
            <div>{t("no_earn")}</div>
          ) : (
            earnList?.map((item, index) => {
              return (
                <>
                  <YourEarnBody
                    currentEvent={currentEvent}
                    openStakeModal={openStakeModal}
                    TimeFrame={TimeFrame}
                    userInfo={userInfo}
                    claimpRGP={claimpRGP}
                    buttonText={buttonText}
                    userData={userData}
                    earnData={item}
                    claimReward={claimReward}
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

export default YourEarn;
