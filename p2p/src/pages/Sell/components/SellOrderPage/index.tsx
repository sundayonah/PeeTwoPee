import {
  Box,
  Button,
  Divider,
  Grid,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BackComponent from "../../../../components/BackComponent";
import {  useParams } from "react-router-dom";
import ChatBox from "../../../../components/ChatBox";
import QuestionFAQ from "../../../../components/QuestionFAQ";
import DisputeHeading from "../../../Dispute/Buy/DisputeHeading";

import { Footer } from "../../../../components/footer";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../components/ChatBox/integration/firebase";
import {  transactionData } from "../../../../state/order";
import { useFetchOrderById } from "../../../../utils/hooks/useOrder";
import { formatMongodbTime } from "../../../../utils";
import { useActiveWeb3React } from "../../../../utils/hooks";
import LockToken from "./LockToken";
import OrderSkeletonPage from "../../../../components/skeleton/OrderSkeletonPage";

export default function SellOrderPage({ history }: { history: any }) {
  const [transactionState, settransactionState] = useState(
    transactionData["COMPLETE YOUR PAYMENT"]
  );
  const [releaseCrypto, setReleaseCrypto] = useState(false);
  const [openDispute, setOpenDispute] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");
  const borderColor = useColorModeValue("#DEE6ED", "#213345");
  const reciever = { name: "dayo", id: "9309303088" };
  const sender = { name: "shola", id: "9390390930" };
  const { account } = useActiveWeb3React();

  const { orderID } = useParams();
 

  const { loading, orderInfo, orderOwner } = useFetchOrderById(orderID ?? "");
 
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "messages"),
        where("txID", "==", orderID ?? ""),
        orderBy("createdAt")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs
          .map((doc)=> {
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
  }, [account,orderInfo]);

 
  const deleteUserMessages = async () => {
    const q = query(
      collection(db, "messages"),
      where("recieverID", "==", reciever.id),
      where("senderID", "==", sender.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (item) => {
      await deleteDoc(doc(db, "messages", item.id));
    });
  };
  const cancelOrder = async () => {
    // navigate("/");
    deleteUserMessages();
  };
  const moveToTheNextStage = (num: number) => {
    settransactionState(num);
  };


  return (
    <>
      {loading ? (
        // <LoadingPage />
        <OrderSkeletonPage />
      ) : (
        <Box>
          <BackComponent text='P2P Home' link='/trade/buy' />
          <Box px={6} py={5}>
            <DisputeHeading
              text=''
              heading={
                orderOwner?.address == account
                  ? `Buy ${orderInfo?.asset}`
                  : `Sell ${orderInfo?.asset} `
              }
              orderNumber={orderInfo?._id ?? ""}
              time={
                formatMongodbTime(orderInfo?.createdAt) ?? "2022-04-06 14:51:22"
              }
            />


            <Grid
              py={6}
              templateColumns={isMobileDevice ? "100%" : "58% 40%"}
              gap={4}
              boxSizing='border-box'
            >
              <Box border={`1px solid ${borderColor}`} borderRadius='8px' p={5}>
                <Box width='100%'>
                  <LockToken orderInfo={orderInfo} orderOwner={orderOwner} />
                </Box>
              </Box>
              <Box border={`1px solid ${borderColor}`} borderRadius='8px' p={5}>
                <ChatBox
                  dispute={openDispute}
                  fromInfo={{
                    fullname: orderInfo?.user.fullname ?? "",
                    rank:orderInfo?.user.rank ?? "",
                    completed_orders:orderInfo?.user.completed_orders ?? 0,
                    order_completion_rate:orderInfo?.user.order_completion_rate ?? 0,
                  }}
                  page='buy'
                  completed={releaseCrypto}
                  messages={messages}
                  sendMessage={()=>null}
                  disabled={true}
                />
                <Button onClick={cancelOrder}>je</Button>
              </Box>
            </Grid>
            <Divider my={8} />

            <Box w={isMobileDevice ? "100%" : "50%"}>
              <QuestionFAQ />
            </Box>
          </Box>
          <Footer />
        </Box>
      )}
    </>
  );
}
