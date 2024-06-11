import { Box } from "@chakra-ui/react"

export const StatusTag = ({status,mt,mr}:{status:boolean,mt:string,mr?:string}) => {
    return (
        <Box
        width="7px"
        height="7px"
        borderRadius="50%"
        background={status ? "#22BB33": "red"}
        mt={mt}
        data-testid="profileStatus"
        mr={mr ?? 0}
        >

        </Box>
    )
}
