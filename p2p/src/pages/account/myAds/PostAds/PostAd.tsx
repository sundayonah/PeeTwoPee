import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import PostAdSideNav from "./PostAdSideNav";
import { useDispatch, useSelector } from "react-redux";
import { AdsPostSteps, setAdsBar } from "../../../../state/accountUi";
import { RootState } from "../../../../state/store";
import { setIsEditAd } from "../../../../state/ads/index";
import TradeTypeAndPrice from "./TradeTypeAndPrice";
import ApproveQuantity from "./ApproveQuantity";
import PaymentMethod from "./PaymentMethod";
import AutoResponse from "./AutoResponse";
import { GCreatedATrade } from "../../../../utils/GAnalytics/gTrade";
import { AdsObj, IBankDetails } from "../AdsType";
import ComfirmAdsPost from "../../modals/ComfirmAdsPost";
import AdSuccess from "../../modals/AdSuccess";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { EDIT_ADS, CREATE_ADS } from "../../gql/mutations";
import { FETCH_ORDER_PER_USER, GET_TOKEN_PRICE } from "../../gql/queries";
import { useActiveWeb3React } from "../../../../utils/hooks/useActiveWeb3React";
import { getERC20Token } from "../../../../utils/utilsFunctions";
import { RGPADDRESSES, RGP } from "../../../../utils/addresses";
import {
  setCloseModal,
  setOpenModal,
  TrxState,
} from "../../../../state/application";
import {
  getExplorerLink,
  ExplorerDataType,
} from "../../../../utils/getExplorerLink";
import { addToast } from "../../../../components/Toast/toastSlice";
import { useCreateOrderAllowance } from "../../../../utils/hooks/useCreateOrderAllowance";
import { useOrderFee } from "../../../../utils/hooks/useOrder";
import JSBI from "jsbi";
import { useParams } from "react-router-dom";
import { FETCHORDERBYID } from "../../../Buy/gql/query";
import { formatDecimalNumber } from "../../../../utils/functions/util";
import { CONTRACT_ADDRESSES } from "../../../../utils";
import PostAddHeader from "./PostAddHeader";

const PostAd = () => {
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const activeAdsBar = useSelector(
    (state: RootState) => state.accountUi.activeAdsBar
  );
  const { chainId, account, library } = useActiveWeb3React();
  const [currency, setCurrency] = useState<any>({
    name: "",
    logo: "",
    currency: "",
  });
  const [userAdsInput, setUserAdsInput] = useState<AdsObj>({
    type: "",
    asset: "",
    token_address: "",
    token_logo: "",
    token_decimal: 0,
    fiat: { currency: "", logo: "", name: "" },
    price_type: "",
    price: 0,
    chainId: chainId,
    crypto_amount: 0,
    limit_min: 0,
    limit_max: 0,
    status: "online",
    duration: 15,
    terms: "",
    auto_reply: "",
    price_percent: 0,
  });
  const { orderID } = useParams();
  const adsState = useSelector((state: RootState) => state.ads);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [openComfirmModal, setOpenConfirmModal] = useState(false);
  const [checkTokenApproval, setCheckTokenApproval] = useState(0);
  const [checkRGPApproval, setCheckRGPApproval] = useState(0);
  const [assetAddress, setAssetAddress] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [editState, setEditState] = useState<AdsObj>();
  const [currentPrice, setCurrentPrice] = useState<any>();
  const [assetPrice, setAssetPrice] = useState<any>();
  const [isEdit, setisEdit] = useState(false);
  const [accountDet, setAccountDet] = useState<IBankDetails>();
  const editInput = useSelector((state: RootState) => state.ads.editInput);
  const recordPerPage = useSelector(
    (state: RootState) => state.ads.recordPerPage
  );
  const tokenAddress = useSelector(
    (state: RootState) => state.ads.tokenAddress
  );
  const tokenSymbol = useSelector((state: RootState) => state.ads.tokenSymbol);
  const { refetch } = useQuery(FETCH_ORDER_PER_USER, {
    variables: {
      params: {
        type: "",
        asset: "",
        status: "",
        recordPerPage: recordPerPage,
        start_date: "",
        end_date: "",
        page: 1,
      },
    },
  });

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useQuery(FETCHORDERBYID, {
    variables: {
      id: orderID ?? "",
    },
  });

  const {
    data: priceData,
    loading: priceLoading,
    error: priceError,
    startPolling,
  } = useQuery(GET_TOKEN_PRICE, {
    variables: {
      param: {
        asset: isEdit ? editState?.asset : userAdsInput.asset,
        fiat: isEdit ? editState?.fiat : userAdsInput.fiat,
      },
    },
    onCompleted: (data) => {
      if (data?.getTokenPrice.status === true) {
        setAssetPrice(formatDecimalNumber(data.getTokenPrice.price));
      } else if (data?.getTokenPrice.status === false) {
        setAssetPrice("");
      }
    },
  });

  useEffect(() => {
    if (
      window.location.pathname === "/postad" ||
      window.location.pathname === `/postad/${orderID}`
    ) {
      startPolling(5000);
    }
  }, []);

  const { notFormattedFee, fee } = useOrderFee("RGP", RGP[chainId]);

  const { hasTokenBeenApproved } = useCreateOrderAllowance(
    checkTokenApproval,
    isEdit
      ? editState.crypto_amount.toString()
      : userAdsInput.crypto_amount.toString(),
    isEdit ? editState.asset : userAdsInput.asset
  );

  const { hasTokenBeenApproved: hasRGPBeenApproved } = useCreateOrderAllowance(
    checkRGPApproval,
    fee,
    "RGP"
  );

  const handleInput = (value: string | number | any, name: string) => {
    if (isEdit) {
      setEditState((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setUserAdsInput((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const selectBank = (value: string) => {
    let accountInfo = adsState.bankDetails.find((bank) => bank.name === value);
    setAccountDet(accountInfo);
  };

  useEffect(() => {
    setAssetAddress(tokenAddress);
    setAssetSymbol(tokenSymbol);
  }, [userAdsInput.asset]);

  useEffect(() => {
    dispatch(setAdsBar(0));
  }, []);

  useEffect(() => {
    if (orderData?.fetchOrderById.status === true) {
      const order = orderData?.fetchOrderById.orders[0];
      setisEdit(true);
      setEditState({
        type: order.type,
        asset: order.asset,
        token_decimal: order.token_decimal,
        token_logo: order.token_logo,
        token_address: order.token_address,
        fiat: order.fiat,
        price_type: order.price_type,
        price: order.price,
        chainId: order.chainId,
        crypto_amount: order.crypto_amount,
        limit_min: order.limit_min,
        limit_max: order.limit_max,
        status: order.status,
        duration: order.duration,
        terms: order.terms,
        auto_reply: order.auto_reply,
        price_percent: order.price_percent,
      });
    }
  }, [orderData]);

  console.log({tokenAddress, isEdit})

  const sellApproval = async () => {
    if (account) {
      const token = await getERC20Token(tokenAddress, library);
      try {
        dispatch(
          setOpenModal({
            message: `${tokenSymbol.toUpperCase()} Approval`,
            trxState: TrxState.WaitingForConfirmation,
          })
        );

        const tokenDecimals = await token.decimals();
        const approveAmount = JSBI.BigInt(
          5 * userAdsInput.crypto_amount * 10 ** tokenDecimals
        );
        const approval = await token.approve(
          CONTRACT_ADDRESSES[chainId as number]["P2P"],
          approveAmount.toString(),
          {
            from: account,
          }
        );
        const { confirmations } = await approval.wait(1);
        const { hash } = approval;
        if (confirmations >= 1) {
          const explorerLink = getExplorerLink(
            chainId as number,
            hash,
            ExplorerDataType.TRANSACTION
          );
          setCheckTokenApproval(checkTokenApproval + 1);
          setCheckRGPApproval(checkRGPApproval + 1);
          dispatch(
            setOpenModal({
              message: `${tokenSymbol.toUpperCase()} Approval Successful`,
              trxState: TrxState.TransactionSuccessful,
            })
          );
          dispatch(
            addToast({
              message: `Approved ${tokenSymbol.toUpperCase()}`,
              URL: explorerLink,
              error: false,
            })
          );
        }
      } catch (err) {
        dispatch(
          setOpenModal({
            message: `${tokenSymbol.toUpperCase()} Approval`,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  };

  const approveRGP = async () => {
    if (account) {
      const token = await getERC20Token(
        RGPADDRESSES[chainId as number],
        library
      );

      try {
        dispatch(
          setOpenModal({
            message: `RGP Approval`,
            trxState: TrxState.WaitingForConfirmation,
          })
        );
        const walletBal = await token.balanceOf(account);

        const approveAmount = JSBI.add(
          JSBI.BigInt(walletBal.toString()),
          JSBI.BigInt(notFormattedFee)
        );

        const approval = await token.approve(
          CONTRACT_ADDRESSES[chainId as number]["P2P"],
          approveAmount.toString(),
          {
            from: account,
          }
        );
        const { confirmations } = await approval.wait(1);
        const { hash } = approval;
        if (confirmations >= 1) {
          const explorerLink = getExplorerLink(
            chainId as number,
            hash,
            ExplorerDataType.TRANSACTION
          );
          setCheckRGPApproval(checkRGPApproval + 1);
          setCheckTokenApproval(checkTokenApproval + 1);

          dispatch(
            setOpenModal({
              message: `RGP Approval Successful`,
              trxState: TrxState.TransactionSuccessful,
            })
          );
          dispatch(
            addToast({
              message: `Approved RGP`,
              URL: explorerLink,
              error: false,
            })
          );
        }
      } catch (err) {
        dispatch(
          setOpenModal({
            message: `RGP Approval`,
            trxState: TrxState.TransactionFailed,
          })
        );
      }
    }
  };

  const [createAds, { data, loading, error }] = useMutation(CREATE_ADS, {
    variables: {
      params: {
        ...userAdsInput,
        price:
          userAdsInput.price_type === "Floating"
            ? currentPrice
            : userAdsInput.price_type === "FLOATING"
            ? currentPrice
            : userAdsInput.price,
        limit_max: userAdsInput.limit_max,
        limit_min: userAdsInput.limit_min,
      },
    },
  });

  const [editAds] = useMutation(EDIT_ADS, {
    variables: {
      params: {
        _id: orderID,
        ...editState,
      },
    },
    onCompleted: () => navigate("/profile/ads"),
  });

  useMemo(() => {
    if (data?.createAds.status === true) {
      dispatch(setCloseModal());
      dispatch(
        addToast({
          message: "Ad created successfully!",
          error: false,
          hasExploreLink: false,
        })
      );
      navigate("/profile/ads");
    } else if (!loading && data?.createAds.status === false) {
      dispatch(
        addToast({
          message: data?.createAds.message,
          error: true,
        })
      );
    }
  }, [data]);

  useMemo(() => {
    if (editInput.isEditAd === true) {
      setUserAdsInput({
        type: editInput.type,
        asset: editInput.asset,
        token_address: editInput.token_address,
        token_decimal: editInput.token_decimal,
        token_logo: editInput.token_logo,
        fiat: { currency: editInput.fiat, name: "", logo: "" },
        price_type: editInput.price_type,
        price: editInput.price,
        chainId: chainId,
        crypto_amount: editInput.crypto_amount,
        limit_min: editInput.limit_min,
        limit_max: editInput.limit_max,
        status: "online",
        duration: 15,
        terms: editInput.terms,
        auto_reply: editInput.auto_reply,
      });
    }
  }, [data]);


  // console.log(data)

  const handleCreateAd = async () => {
    dispatch(
      setOpenModal({
        message: "creating Ads",
        trxState: TrxState.WaitingForConfirmation,
      })
    );
    await createAds({
      variables: {
        params: {
          ...userAdsInput,
          price:
            userAdsInput.price_type === "Floating"
              ? parseFloat(
                  formatDecimalNumber(
                    assetPrice * (userAdsInput.price_percent / 100)
                  )
                )
              : userAdsInput.price_type === "FLOATING"
              ? parseFloat(
                  formatDecimalNumber(
                    assetPrice * (userAdsInput.price_percent / 100)
                  )
                )
              : userAdsInput.price,
          limit_max: userAdsInput.limit_max,
          limit_min: userAdsInput.limit_min,
        },
      },
    });
    refetch();
  };
  const handleEditAd = async () => {
    await editAds({
      variables: {
        params: {
          _id: orderID,
          ...editState,
          price:
            editState.price_type === "Floating"
              ? parseFloat(
                  formatDecimalNumber(
                    assetPrice * (editState.price_percent / 100)
                  )
                )
              : editState.price_type === "FLOATING"
              ? parseFloat(
                  formatDecimalNumber(
                    assetPrice * (editState.price_percent / 100)
                  )
                )
              : editState.price,
          limit_max: editState.limit_max,
          limit_min: editState.limit_min,
        },
      },
    });
    dispatch(
      addToast({
        message: "Ad updated successfully!",
        error: false,
        hasExploreLink: false,
      })
    );
    refetch();
  };
  const checkMutation = () => {
    if (isEdit === true) {
      handleEditAd();
    } else {
      handleCreateAd();
      GCreatedATrade(
        userAdsInput.type,
        userAdsInput.asset,
        userAdsInput?.fiat?.currency,
        chainId
      );
    }
    dispatch(setAdsBar(AdsPostSteps.TRADETYPE));
    dispatch(
      setIsEditAd({
        isEditAd: false,
      })
    );
  };
  const sendTransactionToDatabase = async () => {
    // setCurrentPrice(currentPrice);
    checkMutation();
    refetch();
  };
  return (
    <>
      <Box fontSize='xl'>
        <Flex
          mb={isMobileDevice ? 10 : 5}
          minH='100vh'
          px='20px'
          zIndex={1}
          mt={5}
          flexWrap='wrap'
        >
          {isMobileDevice && (
            <Box mt={2} w={["100%", "100%", "37%", "29.5%"]}>
              <PostAddHeader />
            </Box>
          )}
          <Box
            w={["100%", "100%", "37%", "29.5%"]}
            mb={isMobileDevice ? 2 : 4}
            mt={isMobileDevice ? "20px" : "40px"}
          >
            <PostAdSideNav />
          </Box>
          <Box
            mx={isMobileDevice ? 0 : 4}
            mb={isMobileDevice ? 55 : 5}
            w={["100%", "100%", "37%", "33.5%"]}
          >
            {activeAdsBar === AdsPostSteps.TRADETYPE ? (
              <TradeTypeAndPrice
                assetPrice={assetPrice}
                userAdsInput={isEdit ? editState : userAdsInput}
                handleInput={handleInput}
                setCurrency={setCurrency}
                currency={currency}
                isEdit={isEdit}
              />
            ) : activeAdsBar === AdsPostSteps.APPROVEQUANTITY ? (
              <ApproveQuantity
                assetPrice={assetPrice}
                userAdsInput={isEdit ? editState : userAdsInput}
                handleInput={handleInput}
                AdInfo={
                  isEdit
                    ? {
                        ...editState,
                        paymentMethod: "Bank Transfer",
                        accountDet,
                      }
                    : {
                        ...userAdsInput,
                        paymentMethod: "Bank Transfer",
                        accountDet,
                      }
                }
                hasTokenBeenApproved={hasTokenBeenApproved}
                hasRGPBeenApproved={hasRGPBeenApproved}
                sellApproval={sellApproval}
                approveRGP={approveRGP}
                isEdit={isEdit}
              />
            ) : activeAdsBar === AdsPostSteps.PAYMETHOD ? (
              <PaymentMethod
                userAdsInput={isEdit ? editState : userAdsInput}
                selectBank={selectBank}
              />
            ) : activeAdsBar === AdsPostSteps.AUTORESPONSE ? (
              <AutoResponse
                isEdit={isEdit}
                userAdsInput={isEdit ? editState : userAdsInput}
                handleInput={handleInput}
                setOpenConfirmModal={setOpenConfirmModal}
              />
            ) : null}
          </Box>
          <ComfirmAdsPost
            assetPrice={assetPrice}
            approveRGP={approveRGP}
            openModal={openComfirmModal}
            currency={currency}
            closeModal={() => setOpenConfirmModal(false)}
            sendTransaction={sendTransactionToDatabase}
            AdInfo={
              isEdit
                ? {
                    ...editState,
                    paymentMethod: "Bank Transfer",
                    accountDet,
                  }
                : {
                    ...userAdsInput,
                    paymentMethod: "Bank Transfer",
                    accountDet,
                  }
            }
            hasTokenBeenApproved={hasTokenBeenApproved}
            hasRGPBeenApproved={hasRGPBeenApproved}
            sellApproval={sellApproval}
            isEdit={isEdit}
          />
        </Flex>
      </Box>
      <AdSuccess openModal={showSuccess} />
    </>
  );
};

export default PostAd;
