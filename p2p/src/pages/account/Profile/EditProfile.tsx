import {
  Flex,
  useColorModeValue,
  Text,
  Button,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {  useEffect } from 'react';
import { VERIFY_EMAIL } from '../gql/mutations';
import { USER_BANKS } from '../gql/queries';

import { useMutation, useQuery } from '@apollo/client';
import { addToast } from '../../../components/Toast/toastSlice';
import { useActiveWeb3React } from '../../../utils/hooks';
import { useTranslation } from 'react-i18next';

const EditProfile = ({ setActiveBar, emailAddress, setEmailAddress }) => {
  const dispatch = useDispatch();
  const {t} = useTranslation()
  const mode = useColorModeValue('light', 'dark');
  const userDetails = useQuery(USER_BANKS);
  const { account } = useActiveWeb3React();
  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL, {
    variables: {
      params: {
        email: emailAddress,
        otp: '',
      },
    },
  });

  useEffect(() => {
    setEmailAddress(userDetails?.data?.userInfo?.email);
  }, [userDetails]);

  const handleVerify = async () => {
    try {
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (
        emailAddress != userDetails?.data?.userInfo?.email &&
        re.test(emailAddress)
      ) {
        // send a request to verify api
        await verifyEmail();
        setActiveBar(1);
      } else {
        if (emailAddress === '' || !re.test(emailAddress)) {
          dispatch(
            addToast({ message: 'Enter a valid email address', error: true })
          );
        }
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
        Edit Profile
      </Text>
      <Text
        fontSize="16px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        pt={2}
      >
        Add / Edit Profile Records
      </Text>

      <Text
        fontSize="14px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        py={2}
      >
        Fullname
      </Text>
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
        onFocus={() => {
       
        }}
        value={userDetails?.data?.userInfo?.fullname}
        disabled={true}
        placeholder="Enter fullname"
        display={account ? undefined : 'none'}
        _focus={{ borderColor: 'none' }}
      />

      <Text
        fontSize="14px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        py={2}
      >
        {t('un')}
      </Text>
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
        value={userDetails?.data?.userInfo?.username}
        disabled={true}
        placeholder="Enter username"
        display={account ? undefined : 'none'}
        _focus={{ borderColor: 'none' }}
      />

      <Text
        fontSize="14px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        py={2}
      >
        Phone
      </Text>
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
        value={userDetails?.data?.userInfo?.phone}
        disabled={true}
        placeholder="Enter username"
        display={account ? undefined : 'none'}
        _focus={{ borderColor: 'none' }}
      />

      <Text
        fontSize="14px"
        color={mode === 'dark' ? '#DCE5EF' : '#666666'}
        py={2}
      >
        Email
      </Text>
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
        value={emailAddress}
        onChange={(e) => {
          setEmailAddress(e.target.value);
        }}
        placeholder="Enter Email Address"
        display={account ? undefined : 'none'}
        _focus={{ borderColor: 'none' }}
      />

      <Button
        variant={'brand'}
        data-testid="verifyUserRecord"
        disabled={(userDetails?.data?.userInfo?.email == emailAddress)}
        onClick={handleVerify}
        _hover={{
          bgColor: '',
          color: '',
        }}
        isFullWidth
        my={3}
        mb={4}
      >
        {loading ? <Spinner size="md" /> : 'Continue'}
      </Button>
    </>
  );
};

export default EditProfile;
