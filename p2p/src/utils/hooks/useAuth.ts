import { useCallback, useEffect, useMemo, useState } from "react";
import { UnsupportedChainIdError} from "@web3-react/core";
import {
  ConnectorNames,
  connectorsByName,
  connectorKey,
} from "../../connectors";
import { NoBscProviderError } from "@binance-chain/bsc-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
  NoEthereumProviderError,
} from "@web3-react/injected-connector";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../components/Toast/toastSlice";
import { useActiveWeb3React } from "../../utils/hooks/useActiveWeb3React";
import { useMutation, useLazyQuery } from "@apollo/client";
import { LOGIN, FETCH_USER_BY_ADDRESS } from "../../pages/Home/gql/mutations";
import { RootState } from "../../state/store";
import {uauth} from "../../connectors/index";

const useFetchUser = () => {
  const { account } = useActiveWeb3React();
  const [getUser, { data: userData, error: userError, loading: userLoading }] =
    useLazyQuery(FETCH_USER_BY_ADDRESS, {
      variables: {
        address: account,
      },
    });
  const [userQueryData, setUserQueryData] = useState<any>();

  useMemo(() => {
    if (userData) {
      setUserQueryData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (account) {
      getUser();
    }
  }, [account]);

  return { userQueryData };
};

export const useLogin = () => {
  const { account, error,active } = useActiveWeb3React();
  const [login, { data: loginData, loading: loginLoading, error: loginError }] =
    useMutation(LOGIN, {
      variables: {
        input: account,
      },
    });


  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const refresh = useSelector((state: RootState) => state.accountUi.refresh);
  const disconnected = window.localStorage.getItem("connectv2");
  
  const [isUsupportedNtwrk, setIsUnsupportedNtwrk] = useState(false)

  
  //for unsupported network
  useEffect(() => {
    setIsUnsupportedNtwrk(false)
    if(error?.name === 'UnsupportedChainIdError'){
        setIsUnsupportedNtwrk(true)
    }
  }, [error, active, account])
  

  const { userQueryData } = useFetchUser();

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
 
    if (loginData?.login.status === true) {
      localStorage.setItem("authToken", loginData.login.token);
      setAuthenticated(true);
      setLoading(false);
    }
  }, [loginData]);

  useEffect(() => {
    const Login = async () => {
      const authToken = localStorage.getItem("authToken");

      if (account) {
        setLoading(true);
        if (!refresh) {
          if (userQueryData?.userByAddress.status === true) {
            if (authToken) {
              const decodedJwt = parseJwt(authToken);
              if (decodedJwt.address == account) {
                if (decodedJwt.exp * 1000 < Date.now()) {
                  login();
                } else {
                  setAuthenticated(true);
                  setLoading(false);
                }
              } else {
                login();
              }
            } else {
              login();
            }
          } else if (userQueryData?.userByAddress.status === false) {
            setAuthenticated(false);
            setLoading(false);
          }
        } else if (refresh) {
          setAuthenticated(true);
          setLoading(false);
          // setReload(false);
        }
      } else {
        if (disconnected) {
          setLoading(true);
        } else {
          setLoading(false);
          setAuthenticated(false);
        }
        // setAuthenticated(false);
      }
    };
    Login();
  }, [account, userQueryData, refresh]);

  return { loading, authenticated, isUsupportedNtwrk };
};

const useAuth =  () => {
  const context = useActiveWeb3React();
  const { activate, deactivate, setError, error } = context;
  const dispatch = useDispatch();

  const login = useCallback(
   async (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];

      if (connector) {
        await activate(connector, async (error: Error) => {
          if (!error) {
            activate(connector);
          }
          if (error instanceof UnsupportedChainIdError) {
            setError({
              name: "UnsupportedChainIdError",
              message: error.message,
            });
          } else {
            window.localStorage.removeItem(connectorKey);
            if (
              error instanceof NoEthereumProviderError ||
              error instanceof NoBscProviderError
            ) {
              dispatch(addToast({ message: "No provider found", error: true }));
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = undefined;
              }
              dispatch(
                addToast({
                  message: "Please authorize your account",
                  error: true,
                })
              );
            } else {
              dispatch(
                addToast({
                  message: `Please check if wallet is logged in or has pending transactions.`,
                  error: true,
                })
              );
            }
          }
        });
      } else {
       //  
      }
    },
    [activate, setError]
  );


  const logout = useCallback(() => {
    deactivate();
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = undefined;
    }
    window.localStorage.removeItem(connectorKey);
    window.localStorage.removeItem("authToken");
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;
