import { useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_BY_ADDRESS } from "../../pages/Home/gql/mutations";

export const useValidUser = (address: string) => {
  const [valid, setValid] = useState(false);
  const [fetchUser, { loading, data, error }] = useLazyQuery(
    FETCH_USER_BY_ADDRESS
  );

  useMemo(() => {
    if (data?.userByAddress.status === true) {
      setValid(true);
    } else if (data?.userByAddress.status === false) {
      setValid(false);
    }
  }, [data, address]);

  useMemo(async () => {
    if (address) {
      await fetchUser({ variables: { address: address } });
    }
  }, [address]);

  return { valid };
};
