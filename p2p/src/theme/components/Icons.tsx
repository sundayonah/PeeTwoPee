import React from 'react';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';
import {
  IoMdClose,
  IoMdAdd,
  IoMdArrowForward,
  IoMdRemove,
} from 'react-icons/io';
import { RiErrorWarningLine } from 'react-icons/ri';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { BsExclamationCircle } from "react-icons/bs";

export const CopyIcon = () => {
  const iconColor = useColorModeValue('#666666', '#DCE5EF');
  return (
    <Icon as={FiCopy} w="28px" color={iconColor} h="28px" mr={4} mt={1.5} />
  );
};

export const CloseIcon = () => {
  return <Icon as={IoMdClose} h="18px" w="18px" />;
};
export const ExternalLinkIcon = ({ size }: { size: string }) => {
  const iconColor = useColorModeValue('#666666', '#DCE5EF');
  return (
    <Icon
      as={HiOutlineExternalLink}
      w={size}
      color={iconColor}
      h={size}
    />
  );
};

export const WarningIcon = ({ color }: any) => {
  return (
    <Icon
      as={RiErrorWarningLine}
      w="32px"
      color={color}
      padding="4px"
      h="32px"
      mr={2}
    />
  );
};

export const ExclamationIcon = () => {
  const iconColor = useColorModeValue('#666666', '#DCE5EF');
  return (
    <Icon
      as={BsExclamationCircle}
      w="16px"
      color={iconColor}
      h="16px"
      mt={0.5}
    />
  );
};
