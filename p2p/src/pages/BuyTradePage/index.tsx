import {
  Box,
  Divider,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import BackComponent from "../../components/BackComponent";
import { useNavigate, useParams } from "react-router-dom";
import ChatBox from "../../components/ChatBox";
import DisputeProgress from "../Dispute/Buy/components/DisputeProgress";
import QuestionFAQ from "../../components/QuestionFAQ";
import DisputeHeading from "../Dispute/Buy/DisputeHeading";
import BuyOrder from "./BuyOrder";
import Dispute from "./Dispute";
import Joyride from "react-joyride";
import { Footer } from "../../components/footer";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../../components/ChatBox/integration/firebase";
import {
  disputeData,
  transactionData,
  transactionOwnerData,
} from "../../state/order";
import { useFetchTransactionByID } from "../../utils/hooks/useOrder";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { formatMongodbTime } from "../../utils";
import { useActiveWeb3React } from "../../utils/hooks";

import useCheckDispute from "../../utils/hooks/useCheckDispute";
import { FETCHTRANSACTIONBYID } from "../Buy/gql/query";
import { useMutation, useQuery } from "@apollo/client";
import { DISPUTEBYPID } from "../Dispute/gql/queries";
import { CANCELTRANSACTION } from "../Buy/gql/mutation";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import TradeNetworkValigation from "../../components/Modals/TradeNetworkValigation";

import Cancel from "./Cancel";
import { GClickedStartDispute } from "../../utils/GAnalytics/gTrade";
import ChatNotification from "../../components/Modals/ChatNotification";
import SetTimeModal from "../../components/Modals/SetTimeModal";
import { transactionStep } from "../../components/Onboarding/TransactionStep";
import WelcomeModal from "../../components/Onboarding/WelcomeModal";
import { useTranslation } from "react-i18next";

export default function BuyDisputeIndex({ history }: { history: any }) {
  const [transactionState, settransactionState] = useState(
    transactionData["COMPLETE YOUR PAYMENT"]
  );
  enum CURRENTCOMPONENT {
    TRANSACTION_PAGE = "TRANSACTION_PAGE",
    DISPUTE_PAGE = "DISPUTE_PAGE",
    CHAT_PAGE = "CHAT_PAGE",
  }
  const [disputeState, setDisputeState] = useState(disputeData["APPEALS"]);
  const [releaseCrypto, setReleaseCrypto] = useState(false);
  const [openDispute, setOpenDispute] = useState(false);
  const [openMobileChat, setOpenMobileChat] = useState({
    open: false,
    prev: 0,
  });
  const [currentComponent, setCurrentComponent] = useState(
    CURRENTCOMPONENT.TRANSACTION_PAGE
  );
  const [messages, setMessages] = useState<any>([]);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [disableDisputeButton, setDisableDisputeButton] = useState(false);
  const [transactionTimeElapsed, settransactionTimeElapsed] = useState(false);
  const [messagesForNotification, setmessagesForNotification] = useState<any>();
  const [clearedNotificstion, setclearedNotifications] = useState<any>();
  const [tradeInfo, setTradeInfo] = useState<{
    asset: string;
    from: string;
    to: string;
    crypto_amount: number;
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
    whoCancelled: { to: boolean; from: boolean };
  }>();
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const borderColor = useColorModeValue("#DEE6ED", "#213345");
  
  const bgColor = useColorModeValue("#319EF6", "#4CAFFF");
  const { account, library } = useActiveWeb3React();
  const [showChat, setShowChat] = useState(true);
  const [transactionTime, setTransactionTime] = useState<string | undefined>();
  const [transactioncancelled, setTransactioncancelled] = useState(false);
  const [showNotification, setshowNotification] = useState(false);
  const [openSetTimeNotification, setopenSetTimeNotification] = useState(false);
  const [timeNotificationClose, settimeNotificationClose] = useState(false);

  const [retryCounter, setretryCounter] = useState(0);

  const { chainId } = useActiveWeb3React();
  const [showTimer, setshowTimer] = useState(true);

  const { txID } = useParams();
  const { t } = useTranslation()

  const { loading, toInfo, fromInfo } = useFetchTransactionByID(txID ?? "");
  const selectedChainID = useSelector((state: RootState) => state.user.chainId);
  const network = chainId ?? selectedChainID;

  const {
    loading: Loading,
    data: Data,
    error: Error,
    refetch,
  } = useQuery(FETCHTRANSACTIONBYID, {
    variables: { id: txID ?? "" },
    fetchPolicy: "no-cache",
  });

  const [cancelTransaction] = useMutation(CANCELTRANSACTION, {
    variables: {
      chainId: chainId ?? network,
      transaction_id: tradeInfo?._id,
    },
    onCompleted: (data) => {
      setTransactioncancelled(true);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (tradeInfo?.status !== "cancelled") {
      const intervalId = setInterval(() => {
        refetch();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [tradeInfo?.status]);

  useMemo(() => {
    // custom auth

    signInAnonymously(auth)
      .then(() => {
      })
    

    if (Data?.fetchTransactionById.status === true) {
      setTradeInfo(Data?.fetchTransactionById.transactions[0]);
    }
  }, [Data]);

  const submitDispute = () => {
    setShowChat(false);
  };

  useEffect(() => {
    if (account) {
      if (tradeInfo?.from && tradeInfo?.to) {
        if (account !== tradeInfo?.from && account !== tradeInfo?.to) {
          navigate("/");
        } else {
          if (tradeInfo.status === "completed") {
            settransactionState(3);
          }
        }
      }
    }
  }, [tradeInfo, account]);

  useEffect(() => {
    if (
      account === tradeInfo?.from &&
      tradeInfo?.whoCancelled?.to &&
      !transactionTimeElapsed
    ) {
      cancelTransaction();
    }
  }, [
    tradeInfo?.from,
    account,
    tradeInfo?.whoCancelled?.to,
    transactionTimeElapsed,
  ]);

  useEffect(() => {
    if (account) {
      if (tradeInfo?.from && tradeInfo?.to) {
        if (account !== tradeInfo?.from && account !== tradeInfo?.to) {
          navigate("/");
        } else {
          if (tradeInfo.status === "completed") {
            settransactionState(3);
          }
        }
      }
    }
  }, [tradeInfo, account]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("txID", "==", txID ?? ""),
        orderBy("createdAt")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            if (doc.data() && doc?.data()?.type.includes("image")) {
              let image = doc.data().text;
              let split = image.split("/").join("%2F").split(" ").join("%20");
              let newObj = {
                ...doc.data(),
                text: split,
              };
              return newObj;
            } else {
              return doc.data();
            }
          })
        );
      }
    );
  }, [account, tradeInfo]);

  useEffect(() => {
    if (messages) {
      if (!openChatModal) {
        const filteredMessages = messages.filter(
          (message) =>
            message?.send !== account &&
            message?.createdAt?.seconds + 15 > Math.floor(Date.now() / 1000)
        );

        const difference = filteredMessages.filter(
          (ar) =>
            !clearedNotificstion?.find(
              (rm) =>
                rm?.createdAt?.seconds === ar?.createdAt?.seconds &&
                ar.txID === rm.txID
            )
        );
        setmessagesForNotification(difference);
        if (filteredMessages.length > 0) {
          setshowNotification(true);
        }
      }
      //  else {
      //   setmessagesForNotification([]);
      //   setshowNotification(false);
      // }
    }
  }, [messages]);

  const sendAutoReplyMessage = async (type: string, text: string = "") => {
    let reciever =
      tradeInfo?.from === account ? tradeInfo?.to : tradeInfo?.from;
    const messageObj = {
      type,
      text,
      txID: txID ?? "",
      send: reciever,
      createdAt: serverTimestamp(),
    };
    // alert("prepping")
    if (
      messages.findIndex((message: any) => message.send == reciever) == -1 &&
      text
    ) {
      await addDoc(collection(db, "messages"), messageObj);
    }
  };

  const navigate = useNavigate();
  const sendMessageToDatabase = async (type: string, text: string) => {
    await addDoc(collection(db, "messages"), {
      text,
      txID: txID ?? "",
      send: account,
      type,
      createdAt: serverTimestamp(),
    });

    // moveToTheNextStage(2);
    if (type === "message") {
      sendAutoReplyMessage(type, tradeInfo?.auto_reply);
    }
  };
  const deleteUserMessages = async () => {
    const q = query(
      collection(db, "messages"),

      where("txID", "==", txID ?? "")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (item) => {
      await deleteDoc(doc(db, "messages", item.id));
    });
  };
  const cancelOrder = async () => {
    cancelTransaction();
  };

  const { isSecondDisputePerson } = useCheckDispute(tradeInfo);

  const {
    data,
    loading: disputeLoading,
    error: disputeError,
  } = useQuery(DISPUTEBYPID, {
    variables: {
      params: {
        productId: tradeInfo?.productId,
        chainId: network,
      },
    },
  });

  const startDisputeAppeal = () => {
    setCurrentComponent(CURRENTCOMPONENT.DISPUTE_PAGE);
    setOpenDispute(true);
  };

  useEffect(() => {
    if (data?.disputeByProductId.status === true) {
      if (
        account === data?.disputeByProductId.dispute.disputeInitiator ||
        account === data?.disputeByProductId.dispute.secondPartyAddress
      ) {
        if (
          data?.disputeByProductId.dispute.disputeInitiator &&
          data?.disputeByProductId.dispute.secondPartyAddress &&
          data?.disputeByProductId.dispute.disputeStatus === "CREATED"
        ) {
          setCurrentComponent(CURRENTCOMPONENT.DISPUTE_PAGE);
          setDisputeState(2);
        } else if (
          data?.disputeByProductId.dispute.disputeInitiator ||
          (data?.disputeByProductId.dispute.secondPartyAddress &&
            data?.disputeByProductId.dispute.disputeStatus === "CREATED")
        ) {
          if (
            account === data?.disputeByProductId.dispute.disputeInitiator ||
            data?.disputeByProductId.dispute.secondPartyAddress
          ) {
            setCurrentComponent(CURRENTCOMPONENT.DISPUTE_PAGE);
            setDisputeState(2);
          }
        } else {
          setCurrentComponent(CURRENTCOMPONENT.DISPUTE_PAGE);
          setDisputeState(3);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.disputeByProductId?.dispute?.disputeStatus === "CREATED") {
      sendMessageToDatabase(
        "disputeStarted",
        "A dispute has been started. Council members have been assigned to moderate."
      );
    }
  }, [data]);

  const cancelDispute = () => {
    setCurrentComponent(CURRENTCOMPONENT.TRANSACTION_PAGE);
    setDisableDisputeButton(true);
  };
  const startDispute = () => {
    setCurrentComponent(CURRENTCOMPONENT.DISPUTE_PAGE);
    setOpenDispute(true);
  };

  // useEffect(() => {
  //   setCurrentComponent(1);
  // });

  const moveToTheNextStage = (num: number) => {
    settransactionState(num);
  };
  GClickedStartDispute(tradeInfo?.asset,tradeInfo?.fiat,tradeInfo?.from===account ? "buyer":"seller",tradeInfo?._id,chainId )

  const bankDetails = {
    Name: fromInfo?.banks ? fromInfo?.banks[0]?.account_name : "",
    "Bank Name": fromInfo?.banks ? fromInfo?.banks[0]?.bank_name : "",
    "Account Number": fromInfo?.banks ? fromInfo?.banks[0]?.account_number : "",
  };

  const updateUI = () => {
    if (transactionState === transactionData["COMPLETE YOUR PAYMENT"]) {
      cancelOrder();
    } else if (transactionState === transactionData["COIN RELEASE PENDING"]) {
      setDisableDisputeButton(false);
    }
  };
  const getAppealValue = (num: number) => {
    setDisputeState(num);
  };
  useEffect(() => {
    if (tradeInfo) {
      getRemainingTime();
      if (tradeInfo?.productId !== null) {
        setshowTimer(false);
      }
    }
  }, [tradeInfo, retryCounter, timeNotificationClose]);


  const getRemainingTime = () => {
    const createdDate = new Date(parseFloat(tradeInfo?.createdAt));

    if (createdDate !== undefined) {
      const timeDifference = Math.abs(
        Number(new Date(createdDate.getTime() + 0 * 60000)) - Number(new Date())
      );

      if (
        Number(new Date()) <
          Number(new Date(createdDate.getTime() + 0 * 60000)) &&
        !timeNotificationClose
      ) {
        setopenSetTimeNotification(true);
      } else {
        setopenSetTimeNotification(false);
        const seconds = Math.floor(timeDifference / 1000);

        if (tradeInfo?.status === "cancelled") {
          setTransactioncancelled(true);
        } else if (seconds < 900) {
          const secondsDiff = 900 - seconds;
          setTransactionTime(secondsDiff.toString());
        } else if (seconds >= 900 && tradeInfo?.productId === null) {
          updateUI();
        }
      }
    }
  };

 

  const openChatBox = (prev: number, open: boolean) => {
    setOpenMobileChat({ open, prev });
    setOpenChatModal(true);
  };

  const cancelledByAccount =
    tradeInfo?.from === account
      ? tradeInfo?.whoCancelled?.from
      : tradeInfo?.whoCancelled?.to;
      
  const [run, setRun] = useState(false);
  function strartWelcomeRide() {
    setRun(true);
  }
  useEffect(() => {
    const visits = window.localStorage.getItem("transationRide");
    if (!visits) {
      setWelcomeModal(true);
      window.localStorage.setItem("transationRide", "1");
    }
  }, []);

  const [welcomeModal, setWelcomeModal] = useState(false);
      
  return (
    <>
     <Joyride
          // @ts-ignore
        steps={transactionStep}
        run={run}
        continuous={true}
        scrollToFirstStep={true}
        showSkipButton={true}
        //callback={handleStepComplete}
        styles={{
          options: {
            arrowColor: bgColor,
            backgroundColor: bgColor,
            textColor: "#FFFFFF",
            primaryColor: bgColor,
          },
        }}
      />
      <WelcomeModal
        startToure={strartWelcomeRide}
        openModal={welcomeModal}
        closeModal={() => {
          window.localStorage.setItem("transationRide", "1");
          setWelcomeModal((state) => !state);
        }}
        textHeader={"Welcome to the P2P Platform"}
        welcomeText="
   Here, we'll walkthough how to sell/buy your cryptocurrencies or tokens"
      />
      {Loading ? (
        <LoadingPage />
      ) : (
        <Box>
          <BackComponent
            text={t('p2p_home')}
            link={tradeInfo?.from === account ? "/trade/sell" : "/trade/buy"}
          />
          <Box
            display={
              // tradeInfo?.status === "cancelled" && cancelledByAccount
              //   ? "none"
              //   : undefined

              tradeInfo?.status === "cancelled" && tradeInfo?.productId === null
                ? "none"
                : cancelledByAccount &&
                  tradeInfo?.status === "cancelled" &&
                  tradeInfo?.productId !== null
                ? "none"
                : !tradeInfo?.buyer_paid &&
                  transactionTimeElapsed &&
                  tradeInfo?.to === account
                ? "none"
                : undefined
            }
            px={4}
            py={5}
          >
            {currentComponent === CURRENTCOMPONENT.TRANSACTION_PAGE ? (
              <DisputeHeading
                heading={
                  tradeInfo?.from == account
                    ? `${t('sell')} ${tradeInfo?.asset} `
                    : `${t('buy')} ${tradeInfo?.asset} ${t('from')} ${fromInfo?.fullname}`
                }
                text={t('order_text')}
                orderNumber={tradeInfo?._id ?? ""}
                time={
                  formatMongodbTime(tradeInfo?.createdAt) ??
                  "2022-04-06 14:51:22"
                }
                timer={showTimer}
                secs={transactionTime}
                updateUI={updateUI}
                openChatBox={openChatBox}
              />
            ) : (
              <DisputeHeading
                heading={t('dispute')}
                text={t('dispute_text')}
                orderNumber={tradeInfo?._id ?? ""}
                time={
                  formatMongodbTime(tradeInfo?.createdAt) ??
                  "2022-04-06 14:51:22"
                }
              />
            )}
            {openChatModal && (
              <Modal
                isOpen={openChatModal}
                onClose={() => setOpenChatModal(false)}
                isCentered
                size='4xl'
                closeOnOverlayClick={false}
              >
                <ModalOverlay />

                <ModalContent
                  bg='transparent'
                  color='#fff'
                  borderRadius='6px'
                  p='-80px'
                  boxShadow='0'
                  mt={isMobileDevice ? "0px" : "0px"}
                >
                  {/* <ModalCloseButton
                onClick={handleCloseModal}
                border='2px #666 solid'
                m='4'
                color={tokenListTrgiggerBgColor}
              /> */}
                  <ModalBody>
                    <ChatBox
                      clearNotification={() => {
                        setclearedNotifications(messagesForNotification);
                        setmessagesForNotification([]);
                      }}
                      dispute={openDispute}
                      page='buy'
                      fromInfo={
                        fromInfo?.address === account ? toInfo : fromInfo
                      }
                      terms={tradeInfo?.terms}
                      tx_id={txID}
                      completed={releaseCrypto}
                      messages={messages}
                      sendMessage={sendMessageToDatabase}
                      modal={true}
                      closeChatModal={() => setOpenChatModal(false)}
                    />
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}

            <Grid
              py={6}
              templateColumns={
                isMobileDevice ? "100%" : showChat ? "58% 40%" : "100%"
              }
              gap={4}
              boxSizing='border-box'
            >
              <Box border={`1px solid ${borderColor}`} borderRadius='8px' py={5} px={["10px","10px",5]}>
                {currentComponent === CURRENTCOMPONENT.TRANSACTION_PAGE ? (
                  <DisputeProgress
                    disputeData={
                      tradeInfo?.from === account
                        ? transactionOwnerData
                        : transactionData
                    }
                    disputeState={transactionState}
                  />
                ) : (
                  <DisputeProgress
                    disputeData={disputeData}
                    disputeState={disputeState}
                  />
                )}

                <Divider my='40px' color='#DEE6ED' />

                <Box width='100%'>
                  {currentComponent === CURRENTCOMPONENT.TRANSACTION_PAGE ? (
                    <BuyOrder
                      startDisputeAppeal={startDisputeAppeal}
                      isSecondDisputePerson={isSecondDisputePerson}
                      tradeInfo={tradeInfo}
                      transactionState={transactionState}
                      disableDisputeButton={disableDisputeButton}
                      bankDetails={bankDetails}
                      cancelOrder={cancelOrder}
                      startDispute={startDispute}
                      sendMessageToDatabase={sendMessageToDatabase}
                      setopenSetTimeNotification={setopenSetTimeNotification}
                      orderId={txID ?? ""}
                      settransactionTimeElapsed={settransactionTimeElapsed}
                      transactionTimeElapsed={transactionTimeElapsed}
                      setTransactionState={settransactionState}
                      cancelTransaction={cancelTransaction}
                    />
                  ) : (
                    <Dispute
                      getAppealValue={getAppealValue}
                      disputeState={disputeState}
                      cancelDispute={cancelDispute}
                      submitDispute={submitDispute}
                      productId={tradeInfo.productId}
                      tradeInfo={tradeInfo}
                    />
                  )}
                </Box>
              </Box>

              {showChat && !isMobileDevice && (
                <Box
                  border={`1px solid ${borderColor}`}
                  borderRadius='8px'
                  p={5}
                  
                >
                  <ChatBox
                    dispute={openDispute}
                    page='buy'
                    fromInfo={fromInfo?.address === account ? toInfo : fromInfo}
                    terms={tradeInfo?.terms}
                    tx_id={txID}
                    completed={releaseCrypto}
                    messages={messages}
                    sendMessage={sendMessageToDatabase}
                  />

                  {/* <Button onClick={cancelOrder}>je</Button> */}
                </Box>
              )}
            </Grid>

            <Divider my={8} />

            <Box w={isMobileDevice ? "100%" : "50%"}>
              <QuestionFAQ />
            </Box>
          </Box>
          <Box
            display={
              tradeInfo?.status === "cancelled" && tradeInfo?.productId === null
                ? undefined
                : cancelledByAccount &&
                  tradeInfo?.status === "cancelled" &&
                  tradeInfo?.productId !== null
                ? undefined
                : !tradeInfo?.buyer_paid &&
                  transactionTimeElapsed &&
                  tradeInfo?.to === account
                ? undefined
                : "none"
            }
            px={6}
            py={5}
          >
            <DisputeHeading
              heading={t('order_cancel')}
              text=''
              orderNumber={tradeInfo?._id ?? ""}
              time={
                formatMongodbTime(tradeInfo?.createdAt) ?? "2022-04-06 14:51:22"
              }
              timer={false}
              cancel={true}
              secs={""}
              updateUI={updateUI}
            />

            <Grid
              py={6}
              templateColumns={
                isMobileDevice ? "100%" : showChat ? "58% 40%" : "100%"
              }
              gap={4}
              boxSizing='border-box'
            >
              <Box border={`1px solid ${borderColor}`} borderRadius='8px' p={5}>
                <Box width='100%'>
                  <Cancel tradeInfo={tradeInfo} />
                </Box>
              </Box>

              {showChat && !isMobileDevice && (
                <Box
                  border={`1px solid ${borderColor}`}
                  borderRadius='8px'
                  p={5}
                >
                  <ChatBox
                    dispute={openDispute}
                    page='buy'
                    fromInfo={fromInfo?.address === account ? toInfo : fromInfo}
                    terms={tradeInfo?.terms}
                    tx_id={txID}
                    completed={releaseCrypto}
                    messages={messages}
                    sendMessage={sendMessageToDatabase}
                  />

                  {/* <Button onClick={cancelOrder}>je</Button> */}
                </Box>
              )}
            </Grid>

            <Divider my={8} />

            <Box w={isMobileDevice ? "100%" : "50%"}>
              <QuestionFAQ />
            </Box>
          </Box>
          <Footer />
        </Box>
      )}
      {/* <Transactioncancelled
        openModal={transactioncancelled}
        fromAddress={tradeInfo?.from}
      /> */}

      <TradeNetworkValigation
        openModal={
          Data?.fetchTransactionById?.transactions[0]?.chainId &&
          Data?.fetchTransactionById?.transactions[0]?.chainId != chainId
        }
        chainId={Data?.fetchTransactionById.transactions[0].chainId}
      />

      <ChatNotification
        messages={messagesForNotification}
        isOpen={showNotification}
        onClose={() => setshowNotification(false)}
        onOpen={() => setshowNotification(true)}
        openChat={() => openChatBox(0, true)}
        ischatModalOpen={openChatModal}
        clearNotification={() => {
          setclearedNotifications(messagesForNotification);
          setmessagesForNotification([]);
        }}
      />

      <SetTimeModal
        setShowAccountModal={setopenSetTimeNotification}
        openModal={openSetTimeNotification}
        setretryCounter={setretryCounter}
        retryCounter={retryCounter}
        settransactionTimeElapsed={settransactionTimeElapsed}
        settimeNotificationClose={settimeNotificationClose}
      />
    </>
  );
}
