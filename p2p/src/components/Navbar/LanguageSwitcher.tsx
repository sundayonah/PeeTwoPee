import {
    Menu,
    MenuButton,
    MenuItem,
    MenuDivider,
    MenuList,
    IconButton,
    Img,
    Box,
    Text,
    Flex
  
  } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { setLanguage } from '../../state/user';

const LanguageSwitcher = () => {
    const {languages,language} = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch()
    const selectFlag = (lang:any) => {
        dispatch(setLanguage({language:lang}))
    }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="sm"
        ml={1}
        variant="ghost"
        fontSize="lg"
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        _hover={{ bg: 'gray.100' }}
        _focus={{ boxShadow: 'outline' }}
        icon={<Flex padding="0 3px" alignItems="center">
            <Img src={`https://flagcdn.com/20x15/${language.icon}.png`} />
            <Text fontSize="12px" ml="2px">{language.value.toUpperCase()}</Text>
        </Flex>}

      />
      <MenuList>
        {languages.map((lang,index)=>{
            return (
                <MenuItem onClick={()=>selectFlag(lang)} key={index} ><Img src={`https://flagcdn.com/24x18/${lang.icon}.png`} /><Box ml="6px">{lang.text}</Box></MenuItem>
            )
        })

        }
        {/* <a
          target="_blank"
          href="https://www.linkedin.com/company/rigelprotocol" rel="noreferrer"
        >
          <MenuItem>Linkedin</MenuItem>
        </a>

        <a target="_blank" href="https://medium.com/rigelprotocol" rel="noreferrer">
          <MenuItem>Medium</MenuItem>
        </a>
        <MenuDivider /> */}
      
      </MenuList>
    </Menu>
  )
}

export default LanguageSwitcher