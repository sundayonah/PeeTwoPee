import { useMemo } from "react";

/**
 *
 * @param totalCount is the total number of items in the list
 * @param pageSize is the number of items per page
 * @param siblingCount is the number of items to display on each side of the current page
 * @param currentPage is the current page number
 *
 * @returns paginationRange is an array of page numbers to display in the pagination component
 */
const usePagination= ({
    totalCount,
    pageSize,
    siblingCount=1,
    currentPage,
}:{
    totalCount:number,
    pageSize:number,
    siblingCount:number,
    currentPage:number,
}) =>{
     const range = (start:number,end:number)=>{
            let length = end - start +1;
            return Array.from({length},(_,i)=>i+start);
        }
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
       // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    if(totalPageNumbers >= totalPageCount){
       
        return range(1,totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount,1);

    const rightSiblingIndex = Math.min(currentPage + siblingCount,totalPageCount);


    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    const DOTS = "DOTS"

    if(!shouldShowLeftDots && shouldShowRightDots){
        let leftItemCount = 3+2 * siblingCount
        let leftRange = range(1,leftItemCount);
        return [...leftRange, DOTS, totalPageCount];
    }

    if(shouldShowLeftDots && !shouldShowRightDots){
        let rightItemCount = 3+2 * siblingCount
        let rightRange = range(totalPageCount - rightItemCount + 1,totalPageCount);
        return [firstPageIndex, DOTS, ...rightRange];
    }
    if(shouldShowLeftDots && shouldShowRightDots){
        let middleRange = range(leftSiblingIndex,rightSiblingIndex);
        return [firstPageIndex,DOTS,...middleRange,DOTS, lastPageIndex]
    }
    }
    , [totalCount, pageSize, currentPage, siblingCount]);
    return paginationRange;
}

export default usePagination
