import {
  Flex,
  useColorModeValue,
  Text,
  Button,
  Input,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useState , useEffect } from 'react';
import { UPDATE_CONTANTS, VERIFY_EMAIL } from '../gql/mutations';
import { useMutation } from '@apollo/client';
import { useActiveWeb3React } from '../../../utils/hooks';
import { addToast } from '../../../components/Toast/toastSlice';
import { useNavigate } from 'react-router-dom';
import Timer from '../../../components/Registration/timer';

const VerifyDetail = ({ setActiveBar, emailAddress }) => {
  const dispatch = useDispatch();
  const mode = useColorModeValue('light', 'dark');
  const [vCode, setCode] = useState('');
  const { account } = useActiveWeb3React();
  const navigate = useNavigate();
  const [showTimer, setshowTimer] = useState(true);

  const [verifyEmail, { data: dataNew, loading : load, error: err }] = useMutation(VERIFY_EMAIL, {
    variables: {
      params: {
        email: emailAddress,
        otp: '',
      },
    },
  });


  const [updateContacts, { data, loading, error }] = useMutation(
    UPDATE_CONTANTS,
    {
      variables: {
        params: {
          email: emailAddress,
          otp: vCode,
        },
      },
    }
  );

  const handlResendOtp = async() => {
    try {
     await  verifyEmail()
          
    } catch (error) {
      setshowTimer(true);
    }
  }

  useEffect(() => {
    if(dataNew?.verifyEmail){
      setshowTimer(true);
    }
  }, [dataNew])
  

  const handleVerification = async () => {
    try {
      if (vCode === '') {
        dispatch(addToast({ message: 'Invalid code', error: false }));
        return;
      }
      const { data } = await updateContacts();
      if (data?.updateContacts?.status) {
        dispatch(
          addToast({
            message: data?.updateContacts?.message,
            error: false,
          })
        );
        setCode('');
        navigate('/profile/account');
      } else {
        throw new Error(data?.updateContacts?.message);
      }
    } catch (e) {
      dispatch(addToast({ message: e.message, error: true }));
    }
  };

  return (
    <>
      <Text
        fontSize="20px"
        fontWeight={400}
        color={mode === 'dark' ? 'white' : '#333333'}
      >
        Verify Email
      </Text>
      <Text
        fontSize="16px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        pt={2}
      >
        Enter the token sent to your mail for verification
      </Text>

      <Text
        fontSize="14px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        py={2}
      ></Text>
      <Flex
        display={account ? 'none' : undefined}
        color="#fff"
        h="50px"
        flexDirection={'column'}
        justifyContent="center"
        alignItems="center"
        backgroundColor={mode === 'dark' ? '#213345' : '#F2F5F8'}
        border={mode === 'dark' ? '1px solid #324D68' : '1px solid #DEE6ED'}
        borderRadius="6px"
      ></Flex>
      <Input
        value={vCode}
        onChange={(e) => {
          if (e.target.value) {
            setCode(e.target.value);
          }
        }}
        placeholder="Enter code"
        display={account ? undefined : 'none'}
        _focus={{ borderColor: 'none' }}
      />

      <Button
        variant={'brand'}
        onClick={handleVerification}
        data-testid="verifyUserRecord"
        _hover={{
          bgColor: '',
          color: '',
        }}
        isFullWidth
        my={3}
        mb={4}
      >
        {loading || load ? <Spinner size="md" /> : 'Submit'}
      </Button>


      
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
            Didn’t get a code?{" "}
            <Link
              onClick={handlResendOtp}
             //   verifyUserRecord();
             //   setshowTimer(true);
            //  }}
              color={"#319EF6"}
            >
              Resend
            </Link>
          </Text>
        </Flex>
      )}
    </>
  );
};

export default VerifyDetail;
