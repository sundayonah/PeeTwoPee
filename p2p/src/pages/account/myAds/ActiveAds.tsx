import { useSelector, useDispatch } from "react-redux";
import AdsList from "../commonents/AdsList";
import { setPageNumber } from "../../../state/ads/index";
import { RootState } from "../../../state/store";

import "react-datepicker/dist/react-datepicker.css";

import Pagination from "../../../components/Pagination";
const ActiveAds = ({
  setrefetchCounter,
}: {
  setrefetchCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();

  const { userAds } = useSelector((state: RootState) => state.ads);

  const { pageNumber, recordPerPage, adsTotal } = useSelector(
    (state: RootState) => state.ads
  );

  return (
    <>
      <AdsList setrefetchCounter={setrefetchCounter} userAds={userAds} />
      {pageNumber > 1 && (
        <Pagination
          pageSize={recordPerPage}
          currentPage={pageNumber}
          siblingCount={1}
          totalCount={adsTotal}
          onPageChange={(page) => {
            dispatch(setPageNumber({ pageNumber: page }));
          }}
        />
      )}
    </>
  );
};

export default ActiveAds;
