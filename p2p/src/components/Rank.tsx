import { Box, Button, Flex, Img, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import NGNCurrency from '../assets/NGNCurrency.png'
// import Gold from "../assets/Gold.svg";
// import Silver from "../assets/Silver.svg";
// import Bronze from "../assets/Bronze.svg";
// import Diamond from "../assets/Diamond.svg";
import { rankInfo } from '../utils/constants/constants';

const Rank = ({rank,margin}:{rank:string,margin?:string}) => {
    const  [rankData,setRankData] = useState<{
        title:string;
        img:string;
        text:string;
        range:string
    }>({
        title: "",
        img: "",
        text: "",
        range: ""
    })
    const [openRank,setOpenRank] = useState(false)
  useEffect(()=>{
setRankData(rankInfo.filter(rankData => rankData?.title?.toLowerCase() === rank?.toLowerCase())[0])
  },[rank])

  
  return (
    <Popover isLazy placement='top-start'>
  <PopoverTrigger>
     <Box onClick={()=>setOpenRank(!openRank)} mt={margin ? margin: 0}>
      {rankData?.img && <Img src={rankData?.img} />}
     </Box>
     
  </PopoverTrigger>
  <PopoverContent background="#319EF6" cursor="pointer">
    <PopoverHeader fontWeight='semibold'>
        {rankData?.title}
        </PopoverHeader>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverBody>
     {rankData?.range}
    </PopoverBody>
  </PopoverContent>
</Popover>
  
  )
}

export default Rank