

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  IconButton,

} from '@chakra-ui/react';
import { IoEllipsisHorizontalOutline } from 'react-icons/io5';

const SocialMediaLinks = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="sm"
        ml={2}
        variant="ghost"
        fontSize="lg"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
        icon={<IoEllipsisHorizontalOutline />}
      />
      <MenuList>
        <a
          target="_blank"
          href="https://www.linkedin.com/company/rigelprotocol" rel="noreferrer"
        >
          <MenuItem>Linkedin</MenuItem>
        </a>

        <a target="_blank" href="https://medium.com/rigelprotocol" rel="noreferrer">
          <MenuItem>Medium</MenuItem>
        </a>
        <MenuDivider />
        <a target="_blank" href="https://www.t.me/rigelprotocol" rel="noreferrer">
          <MenuItem>Telegram</MenuItem>
        </a>
        <a target="_blank" href="https://twitter.com/rigelprotocol" rel="noreferrer">
          <MenuItem>Twitter</MenuItem>
        </a>
        <MenuDivider />
        <a target="_blank" href="https://github.com/rigelprotocol" rel="noreferrer">
          <MenuItem>Github</MenuItem>
        </a>
        <a target="_blank" href="https://discord.gg/j86NH95GDD" rel="noreferrer">
          <MenuItem>Discord</MenuItem>
        </a>
      </MenuList>
    </Menu>
  );
};

export default SocialMediaLinks;
