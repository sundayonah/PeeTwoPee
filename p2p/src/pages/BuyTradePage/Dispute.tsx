import { useMemo, useState } from "react";
import { disputeData } from "../../state/order";
import DisputeAppeal from "../Dispute/Buy/DisputeAppeal";
import DisputeCouncil from "../Dispute/Buy/DisputeCouncil";
import DisputeReviewAndVoting from "../Dispute/Buy/DisputeReviewAndVoting";

type IDispute = {
  disputeState: number;
  getAppealValue: (num: number) => void;
  cancelDispute: () => void;
  submitDispute: () => void;
  productId: number;
  tradeInfo: any;
};

export default function Dispute({
  disputeState,
  getAppealValue,
  cancelDispute,
  submitDispute,
  tradeInfo,
  productId,
}: IDispute) {
  const [prodId, setprodId] = useState<number>();
  useMemo(() => {
    if (productId && productId != null) {
      setprodId(productId);
      localStorage.setItem(
        `disputeForID${tradeInfo._id}`,
        productId.toString()
      );
    } else {
      setprodId(Number(localStorage.getItem(`disputeForID${tradeInfo._id}`)));
    }
  }, [productId]);

  return (
    <>
      {disputeState === disputeData["APPEALS"] ? (
        <DisputeAppeal
          tradeInfo={tradeInfo}
          productId={prodId}
          submitDispute={submitDispute}
          getAppealValue={getAppealValue}
          cancelDispute={cancelDispute}
        />
      ) : disputeState === disputeData["REVIEWS & VOTING"] ? (
        <DisputeReviewAndVoting productId={prodId} />
      ) : (
        <DisputeCouncil />
      )}
    </>
  );
}
