import { Box, ListItem, OrderedList } from "@chakra-ui/react"

export default function ListedColoredText({disputeInfo,background,border,overflow,header,textColor}: {
    disputeInfo: String[],
    background: string,
    overflow?:boolean,
    header?:string,
    border?:string,
    textColor?:string}) {
    return (
        <Box background={border ? "transparent": background} border={border ? "1px solid":"none"} borderColor={border? border:""} borderRadius="4px">
            {header && <Box fontSize="12px" color="#666666" borderBottom="1px solid #DEE6ED" padding="14px">
                {header}
                </Box>
            }
        <Box padding="20px" fontSize="14px" color={textColor ? textColor : "#333"} height={overflow ? "100px" :"auto"} overflowY={overflow ? "scroll" : "auto"}>
        <OrderedList>
        {disputeInfo.map((info,index)=>{
            return <ListItem key={index} color={border && border}>{info}</ListItem>
        })}
    </OrderedList>
    </Box>
    </Box>
    )
}