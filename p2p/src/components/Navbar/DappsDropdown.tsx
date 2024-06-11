import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Text,
  Link,
  Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AiOutlineAppstore } from "react-icons/ai";
import { useTranslation } from "react-i18next";


function DappsDropdown() {
const { t } = useTranslation()
  const menuList = [
    {
      header : "P2P",
      subheader : t('p2p_text'),
      url : "/"
    },
    {
      header : "SmartSwap",
      subheader : t('smartswap_text'),
      url : "https://smartswap.rigelprotocol.com"
    },{
      header : "GiftDApp",
      subheader : t('giftdapp_text'),
      url : "https://giftdapp.rigelprotocol.com"
    },{
      header : "SmartBid",
      subheader : t('smartbid_text'),
      url : "https://smartswap.rigelprotocol.com/smartbid",
    },{
      header : "AutoTrade",
      subheader :t('autotrade_text'),
      url : "https://smartswap.rigelprotocol.com/auto-period"
    },{
      header : "Farms",
      subheader : t('farm_text'),
      url : "https://smartswap.rigelprotocol.com/farm"
    },{
      header : "Launchpad",
      subheader : t('launchpad_text'),
      url : "https://launchpad.rigelprotocol.com"
    }

  ]
  return (
    <>
      <Menu>
        <MenuButton
          variant="ghost"
          as={Button}
          transition="all 0.2s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.100" }}
          _focus={{ boxShadow: "outline" }}
          rightIcon={<ChevronDownIcon />}
          leftIcon={<AiOutlineAppstore />}
          fontSize="14px"
          className='HeaderDApps'
        />
        <MenuList>
         
          {
            menuList.map((list:{header:string,subheader:string,url:string},index)=>{
              return (
                <MenuItem>
                <Link href={list.url} isExternal= {list.url==="/"? false :true}>
                   <Stack direction={'column'} spacing={0} >
                    <Text>  {list.header}</Text>
                    <Text color={'gray.500'}>{list.subheader}</Text>
                  </Stack>
                </Link>
                 
                </MenuItem>
              )
            })
          }
          {/* <MenuItem>
          <Link href="https://launchpad.rigelprotocol.com/" isExternal>
             <Stack direction={'column'} spacing={0} >
              <Text>  LaunchPad </Text>
              <Text color={'gray.500'}>  Join projects hosted on RigelProtocol.</Text>
            </Stack>
          </Link>
           
          </MenuItem> */}
        </MenuList>
      </Menu>
    </>
  );
}

export default DappsDropdown;
