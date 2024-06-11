import ReactGA from "react-ga4";


export const GOpenedAnAd = (
  name:string,
  type:string,
  asset:string,
  currency:string,
  rank:string="none",
  chainID?:string | number | number,
) => {

  ReactGA.gtag('event', 'opened_ads', {
    name,
    type,
    asset,
    currency,
    rank,
    chainID
  })
}

export const GInteractedWithAd = (
    name:string,
    type:string,
    asset:string,
    currency:string,
    chainID?:string | number,
    rank:string="none",
  ) => {
    ReactGA.gtag('event', 'interacted_with_an_ad', {
      name,
      type,
      asset,
      currency,
      rank,
      chainID
    })
  }
export const GCreatedAnAccount = (
    name:string,
    chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'created_an_account', {
      name,
      chainID
    })
  }
export const GCreatedATrade = (
    type:string,
    asset:string,
    currency:string,
    chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'created_a_trade', {
      type,
      asset,
      currency,
      chainID
    })
  }
export const GSentMoney = (
    tradeID:string,
    asset:string,
    quantity:string | number,    
  chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'sent_seller_the_money', {
      tradeID,
      asset,
      quantity,
  chainID
    })
  }
export const GReleasedToken = (

    asset:string,
    fiat:string,
    crypto_amount:string | number,
tradeID:string,
chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'released_token_to_buyer', {
   asset,
   fiat,
   crypto_amount,
   tradeID,
    chainID
    })
  }
export const GDisputeStarted = (
    message:string,
    dispute_creator:string,
    productID:string | number,

  chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'started_dispute', {
      message,
      dispute_creator,
      productID,
      chainID
    })
  }
export const GClickedStartDispute = (
    asset:string,
    currency:string,
    dispute_creator:string,
    tradeID:string,

  chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'clicked start dispute button', {
      asset,
      currency,
      dispute_creator,
      tradeID,
      chainID
    })
  }



export const GLockedTokens = (
    message:string,
    asset:string,
    amount:string | number,    
  chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'locked_token', {
      message,
      asset,
      amount,
      chainID
    })
  }
export const GUnlockTokens = (
    message:string,
    asset:string,
    amount:string | number,
    chainID?:string | number,
  ) => {
    ReactGA.gtag('event', 'unlock_token', {
      message,
      asset,
      amount,
      chainID
    })
  }
export const GCouncilJoinedADispute = (
    message:string,
    disputeID:string |number,
    fiat:string,
    asset:string,
    chainID?:string | number | number,

  ) => {
    ReactGA.gtag('event', 'council joined a dispute', {
      message,
      disputeID,
      fiat,
      asset,
      chainID
    })
  }

  export const GFailedEvent = (
    event:string,
    message:string,
    tradeID?:string | number,
    chainID?:string | number,
    buyer?:string,
    seller?:string,
    asset?:string,
  ) => {
    ReactGA.gtag('event', 'failed_event', {
      seller,
        event,
        tradeID,
        message,
        buyer,
      asset,
      chainID
    })
  }