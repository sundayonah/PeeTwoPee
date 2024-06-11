
import { Tbody, Tr, Td, Text, Button } from "@chakra-ui/react";
import { transaction } from "../../../../state/tradeHistory/index";
import { Link } from "react-router-dom";
import { ParseFloat } from "../../../../utils";
import { useTranslation } from "react-i18next";

interface TradeBodyProps {
  trade: transaction;
  account: string;
}
const getDtae = (_ : any) => {
  return   new Date(parseFloat(_)).toLocaleString()
  }

function TradeBody({trade,account }: TradeBodyProps) {
  const {t} = useTranslation()
  return ( 
    <Tbody>
      <Tr>
        <Td>
          <Text fontSize='14px'>{ ParseFloat(trade?.crypto_amount, 4)} {trade.asset}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{trade.price * trade.crypto_amount} {trade.fiat}</Text>
        </Td>
        <Td textAlign="center">
          <Text fontSize='14px'>{trade?.to === account ? t('buy') :t('sell') }</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{trade.price} {trade.fiat}/{trade.asset}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{t(`${trade.status}`)}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{trade?.fee ?? 0} RGP</Text>
        </Td>
        <Td>
              {getDtae(trade.createdAt) }
        </Td>
        <Td>
          <Link to={`/buy/order/trade/${trade._id}`}>
           <Button
            my={3}
            variant={"brand"}
            isFullWidth
          >
            {t('view_trade')}
          </Button>
          </Link>
       
        </Td>
      </Tr>
    </Tbody>
  );
}

export default TradeBody;
