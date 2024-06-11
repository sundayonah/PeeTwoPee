import {
  Flex,
  useColorModeValue,
  Text,
  Link,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import AccountSuccess from "../../../../components/Modals/AccountSuccess";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { screanId, setActiveBar } from "../../../../state/accountUi";
import { setOtp } from "../../../../state/merchant";
import { VERIFY_OTP } from "../../gql/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useActiveWeb3React } from "../../../../utils/hooks";
import { RootState } from "../../../../state/store";
import { useSelector } from "react-redux";
import { VERIFY_USER_RECORD } from "../../gql/mutations";
import Timer from "../../../../components/Registration/timer";
import { useTranslation } from "react-i18next";

const VerifyNumber = () => {
  const mode = useColorModeValue("light", "dark");
  const inputBorderColor = useColorModeValue("#319EF6", "");
  const inputBgColor = useColorModeValue("#EBF6FE", "");
  const inputerrorBorderColor = useColorModeValue("#CC334F", "#FF3358");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [showTimer, setshowTimer] = useState(true);
  const [OTP, setOTP] = useState("");
  
  const [valueArray, setValueArray] = useState<string[]>([]);
  const registerInput = useSelector(
    (state: RootState) => state.merchantUi.registerInput
  );

  const { account } = useActiveWeb3React();
  const {t} = useTranslation()

  const [verifyOtp, { data: verifyOTPData }] = useLazyQuery(VERIFY_OTP, {
    onCompleted: (data) => {
      if (data?.verifyOTP.status === true) {
        dispatch(
          setOtp({
            otp:
              valueArray[0] +
              valueArray[1] +
              valueArray[2] +
              valueArray[3] +
              valueArray[4] +
              valueArray[5],
          })
        );
        dispatch(setActiveBar(screanId.PAYMETHOD));
      } else if (data?.verifyOTP.status === false) {
        // dispatch(addToast({ message: data?.verifyOTP.message, error: true }));
        setError(true);
      }
    },
  });

  const [verifyUserRecord, { data, loading }] = useMutation(
    VERIFY_USER_RECORD,
    {
      variables: {
        params: {
          address: account,
          phone: `${registerInput.country_code}${registerInput.phone}`,
          country_code: registerInput.country_code,
          username: registerInput.userName,
          email: registerInput.email,
        },
      },
      onCompleted: (data) => {
        if (data?.verifyUserRecord.status === true) {
          setError(false);
          setValueArray([]);
        } else if (!loading && data?.verifyUserRecord.status === false) {
          // alert(data?.verifyUserRecord.message);
        }
      },
    }
  );

  const dispatch = useDispatch();

  useMemo(() => {
    const otpArray = OTP.split("");
    setValueArray(otpArray);
  }, [OTP]);

  return (
    <Flex justifyContent={["center","center","left"]} alignItems="center" flexDirection="column" >
      <Text
        fontSize='20px'
        fontWeight={400}
        data-testid='verifyNumber'
        color={mode === "dark" ? "white" : "#333333"}
      >
        {t('verify_email')}
      </Text>
      <Text
        fontSize='16px'
        color={mode === "dark" ? "#DCE5EF" : "#666666"}
        py={2}
        textAlign="center"
      >
        {t('otp_text')}
      </Text>

      <Flex
        w='100%'
        mt={{ base: 5 }}
        gap="15px"
        justifyContent="center"
        alignItems="center"
      >
        <PinInput
          value={OTP}
          onChange={(value) => {
            setOTP(value.toUpperCase());
          }}
          type='alphanumeric'
          size='lg'
          placeholder=''
          autoFocus
          onComplete={(value) => {
            verifyOtp({
              variables: {
                params: {
                  email: registerInput.email,
                  otp: value.toUpperCase(),
                  address: account,
                },
              },
            });
            dispatch(setOtp({ otp: value.toUpperCase() }));
          }}
        >
          <PinInputField
            borderColor={
              valueArray[0]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : ""
            }
            bgColor={valueArray[0] ? (error ? "" : inputBgColor) : ""}
          />
          <PinInputField
            borderColor={
              valueArray[1]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : "#DEE5ED"
            }
            bgColor={valueArray[1] ? (error ? "" : inputBgColor) : ""}
          />
          <PinInputField
            borderColor={
              valueArray[2]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : "#DEE5ED"
            }
            bgColor={valueArray[2] ? (error ? "" : inputBgColor) : ""}
          />
          <PinInputField
            borderColor={
              valueArray[3]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : "#DEE5ED"
            }
            bgColor={valueArray[3] ? (error ? "" : inputBgColor) : ""}
          />
          <PinInputField
            borderColor={
              valueArray[4]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : "#DEE5ED"
            }
            bgColor={valueArray[4] ? (error ? "" : inputBgColor) : ""}
          />
          <PinInputField
            autoFocus={false}
            borderColor={
              valueArray[5]
                ? error
                  ? inputerrorBorderColor
                  : inputBorderColor
                : "#DEE5ED"
            }
            bgColor={valueArray[5] ? (error ? "" : inputBgColor) : ""}
          />
          {/* <PinInputField
            borderColor={valueArray[6] ? inputBorderColor : "#DEE5ED"}
            bgColor={valueArray[6] ? inputBgColor : ""}
          /> */}
        </PinInput>
      </Flex>

      {error && (
        <Flex
          w='80%'
          mt={2}
          py={2}
          color='#fff'
          flexDirection={"row"}
          justifyContent='center'
          alignContent='center'
        >
          <Text
            alignContent={"center"}
            fontSize='16px'
            color={mode === "dark" ? "#FF3358" : "#CC334F"}
            py={2}
          >
            Wrong confirmation code, please try again
          </Text>
        </Flex>
      )}

      <Flex
        // w='80%'
        py={2}
        color='#fff'
        mb='10px'
        flexDirection={"row"}
        justifyContent='center'
        alignContent='center'
      >
        <Text
          alignContent={"center"}
          fontSize='16px'
          textAlign="center"
          color={mode === "dark" ? "#DCE5EF" : "#666666"}
          py={2}
          // whiteSpace={"nowrap"}
        >
          {t('otp_mail')}
        </Text>
      </Flex>

      {showTimer ? (
        <Flex
          w='80%'
          py={2}
          color='#fff'
          mb='10px'
          flexDirection={"row"}
          justifyContent='center'
          alignContent='center'
        >
          <Text
            alignContent={"center"}
            fontSize='16px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            py={2}
          >
            <span>
              <Timer secs='300' updateUI={() => setshowTimer(false)} />
            </span>
          </Text>
        </Flex>
      ) : (
        <Flex
          w='80%'
          py={2}
          color='#fff'
          mb='10px'
          flexDirection={"row"}
          justifyContent='center'
          alignContent='center'
        >
          <Text
            alignContent={"center"}
            fontSize='16px'
            color={mode === "dark" ? "#DCE5EF" : "#666666"}
            py={2}
          >
            {t('did_not_get')}{" "}
            <Link
              onClick={() => {
                verifyUserRecord();
                setshowTimer(true);
              }}
              color={"#319EF6"}
            >
              {t('resend')}
            </Link>
          </Text>
        </Flex>
      )}

      <AccountSuccess openModal={showSuccess} />
    </Flex>
  );
};

export default VerifyNumber;
