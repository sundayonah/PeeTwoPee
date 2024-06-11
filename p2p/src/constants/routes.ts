import React from 'react';

export type AppRoutes = {
  path: string;
  exact: boolean;
  component: any;
};

//const LandingPage = React.lazy(() => import("../pages/Landing"));
const App = React.lazy(() => import('../pages/Home'));
const Buy = React.lazy(() => import('../pages/Buy'));
//const MerchantReg = React.lazy(() => import("../pages/Merchant/Registration"));

const MerchantBadge = React.lazy(() => import('../pages/Merchant/badge/index'));
const CouncilReg = React.lazy(() => import('../pages/Council/Registration'));
const Wallet = React.lazy(() => import('../pages/Wallet/Index'));

const OrderCompleted = React.lazy(
  () => import('../pages/Wallet/components/OrderCompleted')
);
const DisputeStatistics = React.lazy(
  () => import('../pages/Council/disputetatistics')
);
const Sell = React.lazy(() => import('../pages/Sell'));
const Account = React.lazy(() => import('../pages/account/index'));
const EditProfile = React.lazy(() => import('../pages/account/Profile/index'));

const SellOrder = React.lazy(
  () => import('../pages/Sell/components/SellOrderPage')
);
const BuyOrderTrade = React.lazy(() => import('../pages/BuyTradePage'));
const UnAuthorized = React.lazy(() => import('../pages/UnAuthorized'));
const PostAds = React.lazy(
  () => import('../pages/account/myAds/PostAds/PostAd')
);
const Dispute = React.lazy(() => import('../pages/Council/dispute/index'));
const DisputeHome = React.lazy(
  () => import('../pages/Council/dispute/joinDispute/index')
);

const AML = React.lazy(() => import('../pages/Aml'));

const Notification = React.lazy(() => import('../pages/Notification/index'));

export const routes: AppRoutes[] = [
  // { path: "/", exact: true, component: LandingPage },
  { path: '/app', exact: true, component: App },
  { path: '/app/:referralID', exact: true, component: App },
  { path: '/unauthorized', exact: true, component: UnAuthorized },
  { path: '/trade/buy', exact: true, component: Buy },
  { path: '/trade/sell', exact: true, component: Sell },
  { path: '/aml', exact: true, component: AML },
];

///council/dispute
export const authRoutes: AppRoutes[] = [
  { path: '/account/balance', exact: true, component: Wallet },
  { path: '/account/notification', exact: true, component: Notification },

  { path: '/sell/order/:orderID', exact: true, component: SellOrder },
  { path: '/buy/order/trade/:txID', exact: true, component: BuyOrderTrade },
  { path: '/account/transaction', exact: true, component: Wallet },
  { path: '/account/orderCompleted', exact: true, component: OrderCompleted },
  { path: '/profile/account', exact: true, component: Account },
  { path: '/edit/profile', exact: true, component: EditProfile },

  { path: '/profile/trades/current', exact: true, component: Account },
  { path: '/profile/ads', exact: true, component: Account },

  { path: '/council/dispute/stats', exact: true, component: DisputeStatistics },

  { path: '/merchant/badge', exact: true, component: MerchantBadge },

  { path: '/merchant/register', exact: true, component: App },
  { path: '/council/register', exact: true, component: CouncilReg },
  { path: '/postad/:orderID', exact: true, component: PostAds },
  { path: '/postad', exact: true, component: PostAds },
  { path: '/council/dispute', exact: true, component: Dispute },
  { path: '/council/dispute/:disputeId', exact: true, component: DisputeHome },
];
