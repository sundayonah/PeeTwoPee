import { transactionData } from "../../state/order";
import { ITradeInfo } from "../../utils/hooks/useOrder";

import BuyTransactionCompleted from "./BuyTransactionCompleted";
import CoinReleasePending from "./CoinReleasePending";
import PaymentInfo from "./PaymentInfo";

type IOrder = {
  transactionState: number;
  bankDetails: Object;
  sendMessageToDatabase: (type: string, text: string) => void;
  cancelOrder: () => void;
  startDispute: () => void;
  disableDisputeButton: boolean;
  setTransactionState: React.Dispatch<React.SetStateAction<transactionData>>;
  tradeInfo: ITradeInfo;
  orderId?: string;
  startDisputeAppeal: () => void;
  isSecondDisputePerson: boolean;
  settransactionTimeElapsed: React.Dispatch<React.SetStateAction<boolean>>;
  transactionTimeElapsed: boolean;
  cancelTransaction: any;
  setopenSetTimeNotification: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function BuyOrder({
  transactionState,
  bankDetails,
  sendMessageToDatabase,
  cancelOrder,
  startDispute,
  disableDisputeButton,
  orderId,
  setTransactionState,
  tradeInfo,
  startDisputeAppeal,
  isSecondDisputePerson,
  settransactionTimeElapsed,
  transactionTimeElapsed,
  cancelTransaction,
  setopenSetTimeNotification,
}: IOrder) {
  return (
    <>
      {transactionState === transactionData["COMPLETE YOUR PAYMENT"] ? (
        <PaymentInfo
          setopenSetTimeNotification={setopenSetTimeNotification}
          settransactionTimeElapsed={settransactionTimeElapsed}
          transactionTimeElapsed={transactionTimeElapsed}
          bankDetails={bankDetails}
          sendMessageToDatabase={sendMessageToDatabase}
          cancelOrder={cancelOrder}
          orderId={orderId}
          setTransactionState={setTransactionState}
          tradeInfo={tradeInfo}
          cancelTransaction={cancelTransaction}
        />
      ) : transactionState === transactionData["COIN RELEASE PENDING"] ? (
        <CoinReleasePending
          startDisputeAppeal={startDisputeAppeal}
          isSecondDisputePerson={isSecondDisputePerson}
          tradeInfo={tradeInfo}
          sendMessageToDatabase={sendMessageToDatabase}
          startDispute={startDispute}
          disableDisputeButton={disableDisputeButton}
          setTransactionState={setTransactionState}
          orderId={orderId}
        />
      ) : (
        <BuyTransactionCompleted tradeInfo={tradeInfo} />
      )}
    </>
  );
}
