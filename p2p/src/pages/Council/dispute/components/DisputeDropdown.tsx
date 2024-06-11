import React from "react";

import { NavLink } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  useMediaQuery,
  HStack, 
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UnstakeModal from "../../unstake/UnstakeModal";
import UpdateRankModal from "../../updateRank/UpdateRankModal";

export const Nav = ({
  to,
  label,
  text,
  margin,
}: {
  to: string;
  label: string;
  text?: string;
  isActive?: boolean;
  margin?: string;
}) => (
  <NavLink
    to={to}
    style={({ isActive }) =>
      isActive
        ? {
            color: "#319EF6",
            margin: `${margin ? margin : 0}`,
            fontSize: "16px",
          }
        : { margin: `${margin ? margin : 0}`, fontSize: "16px" }
    }
  >
    {label}
    {text && (
      <Text mt="9px" fontWeight="400" fontSize="12px">
        {text}
      </Text>
    )}
  </NavLink>
);

function DisputeDropdown() {
  const [openUnstakeModal, setOpenUnstakeModal] = React.useState(false);
  const [openUpdateRankeModal, setOpenUpdaterankModal] = React.useState(false);
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      <UnstakeModal
        onClose={() => setOpenUnstakeModal(false)}
        openUnstakeModal={openUnstakeModal}
      />
      <UpdateRankModal
        onClose={() => setOpenUpdaterankModal(false)}
        openUpdateRankModal={openUpdateRankeModal}
      />
      <Menu>
        <MenuButton
          variant="ghost"
          as={Button}
          transition="all 0.2s"
          rightIcon={<ChevronDownIcon />}
          fontWeight={200}
          _focus={{ color: "#319EF6" }}
          fontSize="16px"
          textTransform={"capitalize"}
        >
        <HStack><Text display={isMobileDevice ? "none": 'undefined'}>Dispute</Text> <Text>Menu</Text>  </HStack> 
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => setOpenUnstakeModal(true)}
            _focus={{ color: "#319EF6" }}
          >
            <Text my={2}>Unstake RGP or NFT</Text>
          </MenuItem>
          <MenuItem
            onClick={() => setOpenUpdaterankModal(true)}
            _focus={{ color: "#319EF6" }}
          >
            <Text my={2}>Update your rank</Text>
          </MenuItem>
          <MenuItem _focus={{ color: "#319EF6" }}>
            <Nav
              label="Dispute Statistics"
              to="/council/dispute/stats"
              //   margin="10px 0"
              //  text="View all your active trades"
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
export default DisputeDropdown;
