import { Box, Flex, Img, Link, Text } from "@chakra-ui/react";
import LogoDark from '../../assets/logoDark.png'
import { IoLogoTwitter,IoLogoDiscord,IoLogoGithub } from "react-icons/io5";
import { FaTelegramPlane,FaMediumM,FaLinkedinIn  } from "react-icons/fa"
import { useTranslation } from "react-i18next";

export function FooterSocialMedia (){
    const sociaLinks = [
      //  { name:"facebook", link:"facebook.com", icon:<color="#000C15" /> },
        { name:"twitter", link:"https://twitter.com/rigelprotocol", icon:<IoLogoTwitter color="#000C15"/> },
        { name:"discord", link:"https://discord.com/invite/j86NH95GDD", icon:<IoLogoDiscord color="#000C15" /> },
        { name:"medium", link:"https://medium.com/rigelprotocol", icon:<FaMediumM color="#000C15" /> },
        { name:"telegram", link:"https://www.t.me/rigelprotocol", icon:<FaTelegramPlane color="#000C15" /> },
        { name:"github", link:"https://github.com/rigelprotocol", icon:<IoLogoGithub color="#000C15" /> },
        { name:"linkedin", link:"https://www.linkedin.com/company/rigelprotocol", icon:<FaLinkedinIn color="#000C15" />},
    ]

    const {t}= useTranslation()
    return (
        <Box color="white">
           <Img src={LogoDark} />
           <Text my="20px">{t('footer_text')}</Text>
           <Flex>
{sociaLinks.map((social,index)=>{
    return (
    <Flex justifyContent="center" alignItems="center" key={index} width="24px" height="24px" background="#FFF" mr={3} borderRadius="50%" >
        <Link href={social.link} isExternal>{social.icon}</Link>
        
    </Flex>)
})}
           </Flex>
        </Box>
    )
}