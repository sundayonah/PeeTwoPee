import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { routes, AppRoutes, authRoutes } from "../constants/routes";
import Navbar from "../components/Navbar";
import ReactGA from "react-ga4";
import AppWrapper from "../components/AppWrapper";
import useConnectWallet from "../utils/hooks/useConnectWallet";
import { useLogin } from "../utils/hooks";
import Notify from "../components/Toast";
import PrivateRoute from "../components/PrivateRoute";
import TransactionStateModal from "../components/Modals/TransactionModals";
import LoadingPage from "../components/LoadingPage/LoadingPage";
//import UnAuthorized from "./UnAuthorized";
import useNotify from "../state/notification/useNotify";
import UnsupportedNetwork from "../components/unsupportedNetwork/UnsupportedNetwork";
import Landing from "./Landing";
import useDemoAccount from "../state/demoAccount/useDemoAccount";

export default function App() {
  useConnectWallet();
  useNotify();
  useDemoAccount()
  const { loading, authenticated, isUsupportedNtwrk } = useLogin();
  ReactGA.initialize("G-ZMLPK8PCWD");
  ReactGA.send("pageview");
   
  return (
    <Suspense fallback={"loading...."}>
      <Router>
        <AppWrapper>
          <Routes>
            <Route path='/' element={<Landing />} />
          </Routes>
          <Navbar />
          <Notify />
          <TransactionStateModal />
          {loading && !isUsupportedNtwrk && <LoadingPage />}
          {isUsupportedNtwrk ? (
            <UnsupportedNetwork />
          ) : (
            <Routes>
              {routes.map((route: AppRoutes, index: number) => {
                const { component: Component, path, exact } = route;
                return (
                  <Route key={index} path={path} element={<Component />} />
                );
              })}
              {!loading ?
                authRoutes.map((route: AppRoutes, i: number) => {
                  const { component: Component, path, exact } = route;
                  return (
                    <Route
                      key={"auth" + i}
                      path={path}
                      element={
                        <PrivateRoute authenticated={authenticated}>
                          <Component />
                        </PrivateRoute>
                      }
                    />
                  );
                })
                : null}
            </Routes>
          )}
        </AppWrapper>
      </Router>
    </Suspense>
  );
}