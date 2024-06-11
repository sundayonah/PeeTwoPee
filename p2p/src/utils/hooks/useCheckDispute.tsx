 
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
 
import { setDisputeResponder } from "../../state/dispute";
import { useActiveWeb3React } from "./useActiveWeb3React";

const useCheckDispute = (data: any) => {
  const dispatch = useDispatch();
  const [isSecondDisputePerson, setSecDisputePerson] = useState(false);
  const { account } = useActiveWeb3React();


  useEffect(() => {
    if (isSecondDisputePerson) {
      dispatch(setDisputeResponder(true));
    }
  }, [isSecondDisputePerson, dispatch]);
  
  useEffect(() => {
    if (data) {
      if (data?.status == "dispute") {
        if (account == data?.from || account == data?.to) {
              setSecDisputePerson(account !== data?.disputeCreator);
        }
      }
    }
  }, [data, account]);

  return { isSecondDisputePerson };
};

export default useCheckDispute;
