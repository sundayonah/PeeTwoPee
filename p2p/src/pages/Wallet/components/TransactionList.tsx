import React, { useState } from "react";
import {
  Box,
  useDisclosure,
  Thead,
  Tr,
  Th,
  TableContainer,
  Table,
  useColorModeValue,
  Tbody,
  useMediaQuery,
} from "@chakra-ui/react";
import { TransactionItem } from ".";
import { useQuery } from "@apollo/client";
import { FETCHTRANSACTIONBYID } from "../gql/query";
import { useActiveWeb3React } from "../../../utils/hooks";
import Pagination from "../../../components/Pagination";

export interface TransactionObject {
  asset: string;
  from: string;
  to: string;
  tx_id: string;
  fiat: string;
  updatedAt: string;
  crypto_amount: number;
  status: string;
  price: number;
}

export default function TransactionList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId } = useActiveWeb3React();
  const [currentPage, setCurrentPage] = useState(1);
  const headBgColor = useColorModeValue("#F2F5F8", "#213345");
  const [isMobileResponsive] = useMediaQuery("(max-width : 768px)");

 
  const { loading, data, error } = useQuery(FETCHTRANSACTIONBYID, {
    variables: {
      params: {
        chainId: chainId ?? 97,
        recordPerPage: 5,
        page: currentPage,
      },
    },
  });
 // 

  return (
    <Box>
      {isMobileResponsive ? (
        <Box>
          {data?.fetchTransactionByUserId.status === true &&
            data?.fetchTransactionByUserId.transactions.length !== 0 &&
            data?.fetchTransactionByUserId.transactions.map((transaction) => (
              <TransactionItem transaction={transaction} click={onOpen} />
            ))}
        </Box>
      ) : (
        <>
          <TableContainer fontSize={14} mt={6}>
            <Table size='lg' variant='simple'>
              <Thead bgColor={headBgColor} fontWeight='light'>
                <Tr>
                  <Th
                    textTransform='initial'
                    fontFamily='inherit'
                    fontSize={16}
                    fontWeight='400'
                  >
                    Transaction
                  </Th>
                  <Th textTransform='initial' fontSize={16} fontWeight='400'>
                    Details
                  </Th>
                  <Th textTransform='initial' fontSize={16} fontWeight='400'>
                    Status
                  </Th>
                  <Th textTransform='initial' fontSize={16} fontWeight='400'>
                    Amount
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.fetchTransactionByUserId?.status === true &&
                  data?.fetchTransactionByUserId?.transactions.length !== 0 &&
                  data?.fetchTransactionByUserId?.transactions.map(
                    (transaction) => (
                      <TransactionItem
                        transaction={transaction}
                        click={onOpen}
                      />
                    )
                  )}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}

     

      <Pagination
        pageSize={5}
        currentPage={currentPage}
        siblingCount={1}
        totalCount={data?.fetchTransactionByUserId?.totalRecord ?? 1}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* <TransactionDetail isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
    </Box>
  );
}
