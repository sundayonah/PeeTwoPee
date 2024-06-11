import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";
import usePagination from "../utils/hooks/usePagination";

export default function Pagination ({
    pageSize,
    currentPage,
    siblingCount,
    totalCount,
    onPageChange,
}:{
    pageSize:number,
    currentPage:number,
    siblingCount:number,
    totalCount:number,
    onPageChange:(page:number)=>void
}) {

    const paginationRange= usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    })

    if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
        return null;
      }


      const onNext = () => {
        onPageChange(currentPage + 1);
      };

      const onPrevious = () => {
        onPageChange(currentPage - 1);
      };
    return (
      <Box>
        {totalCount > pageSize && <Flex my={10} justifyContent="flex-end">
            <ChevronLeftIcon
            mt={1}
            width="20px"
            height="20px"
            color="#2C3E50"
            _hover={{background:"#319EF6",color:"white"}}
            onClick={()=>currentPage === 1 ? ()=>{}:onPrevious()}
            cursor={currentPage === 1 ? "not-allowed":"pointer"}
            />

      {paginationRange?.map((pageNumber,index) => {

         // If the pageItem is a DOT, render the DOTS unicode character
         if (pageNumber === "DOTS") {
           return <li className="pagination-item dots" key={index}>&#8230;</li>;
         }

         // Render our Page Pills
         return (
           <Box
             key={index}
             bg={pageNumber === currentPage ? "#319EF6" : ""}
             borderRadius="2px"
             padding="1px 9px" mx={1}
             onClick={() => onPageChange(Number(pageNumber) || 1)}
             cursor="pointer"
           >
             {pageNumber}
           </Box>
         );
       })}
    <ChevronRightIcon
            mt={1}
            width="20px"
            height="20px"
            color="#2C3E50"
            cursor={pageSize*currentPage >=totalCount ? "not-allowed":"pointer"}
            _hover={{background:"#319EF6",color:"white"}}
            onClick={()=> pageSize*currentPage >=totalCount ? null:onNext()}
            />
        </Flex>}
      </Box>
        

    )
}
