import React, { useRef, useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USER_BY_ADDRESS } from "../../../../pages/Home/gql/mutations";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Link,
  Spacer,
  Spinner,
  Square,
  Text,
  Textarea,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { imageREf } from "../DisputeAppeal"; 
import { UPDATEFIRSTPERSONRES } from "../../gql/mutations";
import { useActiveWeb3React } from "../../../../utils/hooks";
import ReasonsBox from "./ReasonsBox";
import { useTranslation } from "react-i18next";

export type responseType = {
  responseMessage: string;
  responseProof: imageREf;
};

type ApealProps = {
  initiatorAddress: string;
  appealReason: string;
  appealDesc: string;
  disputeStatus: string;
  userVote: number;
  appealProofs: imageREf[];
  refresh?: () => void;
  transactionId?: string;
  isWinner: boolean;
  enableEditAppeal: boolean;
  dispueteId: string;
  tradeType: string;
  responses: [responseType];
};

export const WinBox = () => {
  return (
    <Box
      mx={3}
      border={"1px solid #00C516 "}
      p={1.5}
      rounded="sm"
      backgroundColor={"#E9FBEB"}
    >
      <Text color={"#00C516"}> Won</Text>
    </Box>
  );
};

export const LostBox = () => {
  return (
    <Box
      border={"1px solid #FF3358 "}
      p={1.5}
      mx={3}
      rounded="sm"
      backgroundColor={"#FFE5EA"}
    >
      <Text color={"#FF3358"}> Lost</Text>
    </Box>
  );
};

const UserAppealBox = ({
  enableEditAppeal,
  disputeStatus,
  isWinner,
  initiatorAddress,
  userVote,
  appealReason,
  appealProofs,
  appealDesc,
  refresh,
  tradeType,
  dispueteId,
  responses,
}: ApealProps) => {
  const inactiveColour = useColorModeValue("#666666", "#999999");

  const fileRef = useRef();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const activeColour = useColorModeValue("#333333", "#F1F5F8");
  const lightColor = useColorModeValue("#666666", "#DCE5EF");

  const backgroundListColor = useColorModeValue("#FEF8E7", "#213345");
  const [enableAddReason, setEnableAddReason] = useState(false);
  const [description, setDescription] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const { chainId } = useActiveWeb3React();

  const [newImage, setNewImag] = useState<{
    imageName: string;
    imgType: string;
    uri: string;
  } | null>();

  const newAppealProofObj = {
    uri: newImage?.uri,
    name: newImage?.imageName,
    extension: newImage?.imgType,
  };
const {t } = useTranslation()

  const {
    data: userData,
    error: fromIdError,
    loading: fromIdLoading,
  } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: initiatorAddress,
    },
  });

  const [
    addFirstREason,
    { data: readonsData, loading: reasonloading, error: reasonError },
  ] = useMutation(UPDATEFIRSTPERSONRES, {
    variables: {
      params: {
        dispute_id: dispueteId,
        chainId: chainId,
        newDescription: description,
        newAppealProof: newAppealProofObj ,
      },
    },
  });

  const [
    addFirstREasonWithoutProof,
    { data: wreadonsData, loading: wreasonloading, error: wreasonError },
  ] = useMutation(UPDATEFIRSTPERSONRES, {
    variables: {
      params: {
        dispute_id: dispueteId,
        chainId: chainId,
        newDescription: description,
      },
    },
  });    


    
const handleAddReasonToAppeal = () => {
  try {
    if(newImage){
      addFirstREason();
    }else {
      addFirstREasonWithoutProof();
    }
  } catch (error) {
     
  }
}


  useEffect(() => {
    if (readonsData?.addFirstPersonResponse?.status === true || wreadonsData?.addFirstPersonResponse?.status === true ) {
      setEnableAddReason(false);
      setNewImag(null);
      setDescription('')
    }
  }, [readonsData, wreadonsData ]);

  const handleChange = async (e) => {
    setImageUploading(true);
    e.preventDefault();
    const [file] = e.target.files;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fox9qotr");
    try {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/www-rigelprotocol-com/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      setNewImag({
        imageName: data.original_filename,
        imgType: data.format,
        uri: data.secure_url,
      });
      setImageUploading(false);
    } catch (error) {
      setImageUploading(false);
    }
  };

  return (
    <>
      <VStack
        mb={20}
        border="0.1px solid"
        rounded="md"
        borderColor="gray.200"
        w={"full"}
        alignItems="flex-start"
        pt={5}
      >
        <Flex
          p={4}
          justifyContent={isMobileDevice ? "center" : "space-between"}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={16} color={activeColour}>
            {t("a_from")} {isMobileDevice && <br />}{" "}
            <span style={{ color: "#319EF6" }}>
              {userData?.userByAddress?.user?.fullname}
            </span>{" "}
            <span style={{ color: inactiveColour }}>({tradeType})</span>
          </Text>

          <Spacer />
          {disputeStatus == "VOTINGENDED" &&
            (isWinner ? <WinBox /> : <LostBox />)}
          <Box p={1.5} rounded="sm" backgroundColor={"#EBF6FE"}>
            <Text color={"#319EF6"}>{userVote} votes in favour</Text>
          </Box>
        </Flex>

        <Divider />
        <Box w={"full"} fontSize={14} p={4}>
          <Text color={inactiveColour}>{t('r_app')}</Text>

          <Text color={activeColour}> {appealReason}</Text>

          <Flex justifyContent="space-between" alignItems={"center"}>
            <Text color={inactiveColour} pt={10}>
            {t('a_mess')}
            </Text>
          </Flex>

          <Box
            px={3}
            p={3}
            my={3}
            border="0.1px solid"
            rounded="md"
            borderColor="gray.200"
            w={"full"}
          >
            <Box
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#DEE5ED",
                  borderRadius: "24px",
                },
              }}
              width={"100%"}
              maxH="120px"
            >
              <Text color={activeColour}>{appealDesc}</Text>
            </Box>
          </Box>
          <Flex justifyContent="space-between" alignItems={"center"}>
            <Text color={inactiveColour} mb={1} mt={2}>
              {t('att')}
            </Text>
          </Flex>

          {appealProofs &&
            appealProofs.map((item: imageREf, index) => (
              <Box
                key={index}
                p={3}
                border="0.1px solid"
                rounded="md"
                borderColor="gray.200"
              >
                <Flex justifyContent="space-between" alignItems={"center"}>
                  <HStack>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2432 15.1669H3.72983C2.7165 15.1669 1.78983 14.6536 1.2565 13.7869C0.723166 12.9203 0.676499 11.8669 1.12983 10.9536L2.2765 8.65361C2.64983 7.90694 3.24983 7.44028 3.92317 7.36694C4.5965 7.29361 5.28317 7.62694 5.80317 8.27361L5.94983 8.46028C6.24317 8.82028 6.58317 9.01361 6.9165 8.98028C7.24983 8.95361 7.5565 8.71361 7.78317 8.30694L9.04317 6.03361C9.56317 5.09361 10.2565 4.60694 11.0098 4.64028C11.7565 4.68028 12.3965 5.24028 12.8232 6.22694L14.9098 11.1003C15.2965 12.0003 15.2032 13.0269 14.6632 13.8469C14.1298 14.6803 13.2232 15.1669 12.2432 15.1669ZM4.10983 8.36694C4.08317 8.36694 4.0565 8.36694 4.02983 8.37361C3.6965 8.40694 3.38983 8.67361 3.16983 9.10694L2.02317 11.4069C1.72317 12.0003 1.7565 12.7003 2.10317 13.2669C2.44983 13.8336 3.06317 14.1736 3.72983 14.1736H12.2365C12.8898 14.1736 13.4698 13.8603 13.8298 13.3136C14.1898 12.7669 14.2498 12.1136 13.9898 11.5136L11.9032 6.64028C11.6498 6.04028 11.2965 5.67361 10.9565 5.66028C10.6432 5.64028 10.2365 5.97361 9.9165 6.54028L8.6565 8.81361C8.26983 9.50694 7.66317 9.94028 7.00317 10.0003C6.34317 10.0536 5.66983 9.73361 5.16983 9.10694L5.02317 8.92028C4.74317 8.55361 4.42317 8.36694 4.10983 8.36694Z"
                        fill="#666666"
                      />
                      <path
                        d="M4.64844 5.83398C3.2751 5.83398 2.14844 4.71398 2.14844 3.33398C2.14844 1.95398 3.26844 0.833984 4.64844 0.833984C6.02844 0.833984 7.14844 1.95398 7.14844 3.33398C7.14844 4.71398 6.02844 5.83398 4.64844 5.83398ZM4.64844 1.83398C3.82177 1.83398 3.14844 2.50732 3.14844 3.33398C3.14844 4.16065 3.82177 4.83398 4.64844 4.83398C5.4751 4.83398 6.14844 4.16065 6.14844 3.33398C6.14844 2.50732 5.4751 1.83398 4.64844 1.83398Z"
                        fill="#666666"
                      />
                    </svg>

                    <Text>{item.name + "." + item.extension}</Text>
                  </HStack>
                  <Link isExternal href={item?.uri} color={"#319EF6"}>
                    View
                  </Link>
                </Flex>
              </Box>
            ))}
        </Box>
        {responses &&
          responses.map((items, index) => (
            <ReasonsBox
              index={index}
              key={index}
              proofObj={items.responseProof}
              appealDesc={items.responseMessage}
            />
          ))}

        <Box w={"full"} p={4}>
          {enableEditAppeal && !enableAddReason && (
            <Button disabled={disputeStatus == "VOTINGENDED"} onClick={()=> setEnableAddReason(true)} variant={"brand"}>{t('ad_mess')}</Button>
          )}

         { enableAddReason && <>
          <Box my={6}>
            <Text color={lightColor} fontSize="14px" my="8px">
            {t('desc')}
            </Text>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Text color={lightColor} fontSize="14px">
            {t('uploads_op')}
          </Text>
          <Text fontSize="12px" color=" #999999" my="8px">
           {t('docs')}
          </Text>

         { newImage?
         <Text>{newImage.imageName + '.' + newImage.imgType}</Text>
         :
         <Square
            cursor={"pointer"}
            onClick={() => {
              fileRef.current?.click()!;
            }}
            color={lightColor}
            fontSize="22px"
            size="40px"
            borderRadius="4px"
            background={backgroundListColor}
          >
            {" "}
            {imageUploading ? <Spinner /> : <>+</>}
          </Square>
          }

          <input
            ref={fileRef}
            onChange={handleChange}
            multiple={false}
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
          />

          <Box my="25px">
            <Button
              // background="#A7D6FB"
              isLoading={wreasonloading || reasonloading}
              width={isMobileDevice ? "220px" : "248px"}
              height="48px"
              borderRadius="6px"
              variant={"brand"}
              disabled={!description}
              onClick={handleAddReasonToAppeal}
            >
              {t('ad_mess')}
            </Button>
            <Button
              background="transparent"
              width={isMobileDevice ? "100px" : "148px"}
              height="48px"
              borderRadius="6px"
              border="1px solid #666666"
              // color={lightColor}
              ml={[0, 0, 4]}
              my={[3, 3, 0]}
              onClick={()=> setEnableAddReason(false)}
            >
              {t('cancel')}
            </Button> 
          </Box>
          </>}
        </Box>
      </VStack>
    </>
  );
};

export default UserAppealBox;
