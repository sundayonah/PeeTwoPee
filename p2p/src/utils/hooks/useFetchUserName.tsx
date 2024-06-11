import { useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_BY_ADDRESS } from "../../pages/Home/gql/mutations";

export const useFetchUserName = (address: string) => {
  const [userName, setUserName] = useState('');
  const [fetchUser, { loading, data, error }] = useLazyQuery(
    FETCH_USER_BY_ADDRESS
  );
  function capitalizeFirstLetter(string: string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
  useMemo(() => {
    if (data?.userByAddress.status === true) {      
      setUserName( capitalizeFirstLetter(data?.userByAddress?.user?.fullname));
    } 
  }, [data, address]);
  useMemo(async () => {
    if (address) {
      await fetchUser({ variables: { address: address } });
    }
  }, [address]);

  return { userName };
};
