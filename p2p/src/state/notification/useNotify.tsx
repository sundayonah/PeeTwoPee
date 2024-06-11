import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addNotification, clearNotiffications } from ".";
import { FETCHNOTIFICATIONS } from "../../pages/Notification/gql/querries";
import { NOTIFICATION_SUBSCRIPTION } from "../../pages/Notification/gql/subscription";
import { playSound } from "../../utils";
import { useActiveWeb3React } from "../../utils/hooks";
import { useAppDispatch } from "../hooks";
import { RootState } from "../store";

const useNotify = () => {
  const dispatch = useAppDispatch();


  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const { data } = useSubscription(NOTIFICATION_SUBSCRIPTION);
  const { account, chainId } = useActiveWeb3React();

  useEffect(() => {
    if (
      data &&
      data?.notification?.notification?.receivers?.includes(account)
    ) {
      dispatch(
        addNotification({
          ...data?.notification?.notification,
          txnId: data?.notification?.notification?.transaction?._id,
        })
      );
      
      playSound();
    }
  }, [data, dispatch, account]);

  useEffect(() => {
    dispatch(clearNotiffications());
  }, [chainId, account, dispatch]);

  const { data: notifcatons, refetch } = useQuery(FETCHNOTIFICATIONS, {
    variables: {
      //"page": "",
      //"recordPerPage": "",
      chainId: chainId,
    },
  });
// 
  useEffect(() => {
     if(notifcatons?.fetchNotifications?.notifications){
        notifcatons?.fetchNotifications?.notifications
       
        .filter((items) => items.chainId == chainId && !items.readers?.includes(account) && items?.receivers.includes(account)
        )
        .slice(0, 5)
        .reverse()
        .forEach((notfcation) => {
          if(notifications.length < 5 )
          {dispatch(
            addNotification({
              ...notfcation,
              txnId: notfcation?.transaction?._id,
             read_by_to : notfcation?.readers?.includes(account)

            })
          )}
        });
    refetch()
      }
  }, [account, chainId ,  dispatch, notifcatons]);
};

export default useNotify;
