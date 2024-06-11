import React from "react";
import {
  Box,
  Flex,
  Modal,
 
  ModalContent,
 
  ModalOverlay,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import videoIcon from "../../../assets/VideoPlaceHolder.svg";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const src = "https://youtu.be/ONGm1fQP3b0";
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isMobileDevice ? "sm" : "lg"}
      >
        <ModalOverlay />
        <ModalContent >
          <ReactPlayer
            light={videoIcon}
            controls
            url={src}
            width={ isMobileDevice ? '100%': '640px'}
          height={ isMobileDevice ? '100%' : '360px'}
          />
        </ModalContent>
      </Modal>
      <Flex width="90%" mt={-20}>
        <Spacer />
        <Box className="TutVideo" onClick={onOpen} cursor={"pointer"}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3330_21092)">
              <rect width="56" height="56" rx="4" fill="#4CAFFF" />
              <path
                d="M23.87 37.2805C23.08 37.2805 22.33 37.0905 21.67 36.7105C20.11 35.8105 19.25 33.9805 19.25 31.5705V24.4405C19.25 22.0205 20.11 20.2005 21.67 19.3005C23.23 18.4005 25.24 18.5705 27.34 19.7805L33.51 23.3405C35.6 24.5505 36.76 26.2105 36.76 28.0105C36.76 29.8105 35.61 31.4705 33.51 32.6805L27.34 36.2405C26.13 36.9305 24.95 37.2805 23.87 37.2805ZM23.87 20.2205C23.33 20.2205 22.85 20.3405 22.42 20.5905C21.34 21.2105 20.75 22.5805 20.75 24.4405V31.5605C20.75 33.4205 21.34 34.7805 22.42 35.4105C23.5 36.0405 24.98 35.8605 26.59 34.9305L32.76 31.3705C34.37 30.4405 35.26 29.2505 35.26 28.0005C35.26 26.7505 34.37 25.5605 32.76 24.6305L26.59 21.0705C25.61 20.5105 24.69 20.2205 23.87 20.2205Z"
                fill="#F1F5F8"
              />
            </g>
            <defs>
              <clipPath id="clip0_3330_21092">
                <rect width="56" height="56" rx="4" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      </Flex>
    </>
  );
};

export default Index;
