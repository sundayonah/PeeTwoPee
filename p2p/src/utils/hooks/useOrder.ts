import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  FETCHORDERBYID,
  FETCHTRANSACTIONBYID,
  USERBYID,
} from "../../pages/Buy/gql/query";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { FETCH_USER_BY_ADDRESS } from "../../pages/Home/gql/mutations";
import { useActiveWeb3React } from ".";
import { CONTRACT_ADDRESSES, RigelDecentralizedP2PSystemContract } from "..";
import { ethers } from "ethers";

export const useGetOrderInfoFromReducer = (id: string) => {
  const orderInfo = useSelector(
    (state: RootState) => state.tradeInfo.userBuyOrders
  );
  const [orderInfoState, setOrderInfoState] = useState<{
    amountToPay: string;
    orderId: string;
    amountToReceive: string;
    fiat: string;
    asset: string;
    price: number;
  }>();

  useMemo(() => {
    setOrderInfoState(orderInfo.find((item) => item.orderId === id));
  }, [id]);

  return { orderInfoState };
};

export interface ITradeInfo {
  asset: string;
  from: string;
  to: string;
  crypto_amount: number;
  order_type?: string;
  productId: number;
  chainId: number;
  price: number;
  token_address?: string;
  fiat: string;
  _id: string;
  status: string;
  createdAt: string;
  tStartTime: string;
  tradeRequestSent: boolean;
  tradeRequestAccepted: boolean;
  buyer_paid: boolean;
  auto_reply: string;
  terms: string;
  disputeCreator: string;
  feedback: { to: number; from: number };
  whoCancelled: {
    to: boolean;
    from: boolean;
  };
}

export const useFetchOrderById = (id: string) => {
  const { account } = useActiveWeb3React();
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<{
    asset: string;
    auto_reply: string;
    createdAt: string;
    crypto_amount: number;
    limit_min: number;
    limit_max: number;
    price: number;
    fiat: string;
    token_address?: string;

    terms: string;
    _id: string;
    user: {
      fullname: string;
      rank: string;
      completed_orders?: number;
      order_completion_rate?: number;
      _id: string;
      banks: {
        bank_name: string;
      }[];
    };
  }>();
  const [orderOwner, setOrderOwner] = useState<{
    address: string;
    fullname: string;
    username?: string;
    banks: {
      account_name: string;
      account_number: string;
      bank_name: string;
    }[];
  }>();
  const {
    data,
    error,
    loading: orderLoading,
  } = useQuery(FETCHORDERBYID, {
    variables: {
      id: id,
    },
  });

  const { data: userByIdData } = useQuery(USERBYID, {
    variables: {
      user_id: orderInfo?.user._id,
    },
  });

  useMemo(() => {
    setLoading(true);
    if (!orderLoading) {
      if (data?.fetchOrderById.status === true) {
        setOrderInfo(data?.fetchOrderById.orders[0]);
        if (userByIdData?.userById.status === true) {
          setOrderOwner(userByIdData?.userById.user);
          setLoading(false);
        }

        setLoading(false);
      } else if (data?.fetchOrderById.status === false) {
        setLoading(false);
      }
    } else {
      setLoading(true);
    }
  }, [data, id, userByIdData, account]);
  return { loading, orderInfo, orderOwner };
};
export interface IFromInfo {
  address?: string;
  fullname: string;
  rank?: string;
  completed_orders?: number;
  order_completion_rate?: number;
  userRankInfo?: any;
  banks?: {
    account_name: string;
    account_number: string;
    bank_name: string;
  }[];
}
export const useFetchTransactionByID = (id: string) => {
  const { account } = useActiveWeb3React();
  const [loading, setLoading] = useState(false);
  const [fromInfo, setFromInfo] = useState<IFromInfo>();

  const [toInfo, setToInfo] = useState<{
    address: string;
    fullname: string;
    completed_orders?: number;
    order_completion_rate?: number;
    rank?: string;
    banks: {
      account_name: string;
      account_number: string;
      bank_name: string;
    }[];
  }>();

  const [tradeInfo, setTradeInfo] = useState<{
    asset: string;
    from: string;
    to: string;
    crypto_amount: number;
    productId: number;
    chainId: number;
    price: number;
    terms?: string;
    auto_reply?: string;
    fiat: string;
    _id: string;
    status: string;
    createdAt: string;
  }>();

  const {
    data,

    loading: fetchtxLoading,
    startPolling,
    stopPolling,
  } = useQuery(FETCHTRANSACTIONBYID, {
    variables: {
      id: id,
    },
    fetchPolicy: "no-cache",
  });
  // 

  const {
    data: fromIdData,
    error: fromIdError,
    loading: fromIdLoading,
  } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: data?.fetchTransactionById.transactions[0].from,
    },
    fetchPolicy: "no-cache",
  });

 
  const {
    data: toIdData,
    error: toIdError,
    loading: toIdLoading,
  } = useQuery(FETCH_USER_BY_ADDRESS, {
    variables: {
      address: data?.fetchTransactionById.transactions[0].to,
    },
    fetchPolicy: "no-cache",
  });

  useMemo(() => {
    setLoading(true);
    if (!fetchtxLoading) {
      if (data?.fetchTransactionById.status === true) {
        setTradeInfo(data?.fetchTransactionById.transactions[0]);

        if (fromIdData?.userByAddress.status === true) {
          setFromInfo(fromIdData?.userByAddress.user);
          // setLoading(false);
        }

        if (toIdData?.userByAddress.status === true) {
          setToInfo(toIdData?.userByAddress.user);
          // setLoading(false);
        }
        if (
          fromIdData?.userByAddress.status === true &&
          toIdData?.userByAddress.status === true
        ) {
          setLoading(false);
        }
        // setLoading(false);
      } else if (data?.fetchTransactionById.status === false) {
        // setLoading(false);
      }
    } else {
      setLoading(true);
    }
  }, [id, data, toIdData, fromIdData, account]);

  return { loading, tradeInfo, toInfo, fromInfo, startPolling, stopPolling };
};

export const useOrderFee = (asset: string, address: string, type?: string) => {
  const { account, chainId, library } = useActiveWeb3React();
  const [fee, setFee] = useState("");
  const [notFormattedFee, setNotFormattedFee] = useState("");
  //  const dispatch = useDispatch();
  useMemo(async () => {
    try {
      if (account) {
        if (asset) {
          const p2pInstance = await RigelDecentralizedP2PSystemContract(
            CONTRACT_ADDRESSES[chainId]["P2P"],
            library
          );

          if (type === "sell") {
            const fee = await p2pInstance.getTokenFeeForBuyer(address);

            setFee((parseFloat(fee.toString()) / 10).toString());
            setNotFormattedFee(fee.toString());
          } else {
            //  
            const fee = await p2pInstance.getFees();
            // const isAdded = await p2pInstance.isAssestAdded(address);

            //   
            setFee(ethers.utils.formatEther(fee._sellerFee.toString()));
            setNotFormattedFee(fee._sellerFee.toString());
          }
        }
      }
    } catch (e) {
       
      // dispatch(
      //   setOpenModal({
      //     message: `I think there is an issue, try another order`,
      //     trxState: TrxState.TransactionFailed,
      //   })
      // );
    }
  }, [account, asset]);

  return { fee, notFormattedFee };
};
