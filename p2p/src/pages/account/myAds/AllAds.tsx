import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdsList from "../commonents/AdsList";
import { setAllPageNumber } from "../../../state/ads/index";
import { RootState } from "../../../state/store";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../../../components/Pagination";
import { useMediaQuery } from "@chakra-ui/react";
import AdsMobilePage from "./AdsMobilePage";
import DeleteAd from "../modals/DeleteAd";
import { useMutation } from "@apollo/client";
import { DELETE_ADS } from "../gql/mutations";
import { addToast } from "../../../components/Toast/toastSlice";

const AllAds = ({
  loading,
  setrefetchCounter,
  refetch
}: {
  loading: boolean;
  refetch: ()=> void
  setrefetchCounter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const dispatch = useDispatch();
  const { allPageNumber, recordPerPage, adsTotal } = useSelector(
    (state: RootState) => state.ads
  );
  const [openDeleteAd, setOpenDeleteAd] = useState(false);
  const [itemId, setItemId] = useState("");
  const { userAds } = useSelector((state: RootState) => state.ads);

  const [deleteAds] = useMutation(DELETE_ADS, {
    variables: {
      id: itemId,
    },
  });
  const handleDeleteAd = async () => {
    await deleteAds();
    dispatch(
      addToast({
        message: "Ad deleted successfully!",
        error: false,
        hasExploreLink: false,
      })
    );

     refetch();
  };

  const [isMobileDevice] = useMediaQuery("(max-width: 750px)");

  return (
    <>
      {isMobileDevice ? (
        <AdsMobilePage
          userAds={userAds}
          setItemId={setItemId}
          setOpenDeleteAd={setOpenDeleteAd}
          setrefetchCounter={setrefetchCounter}
        />
      ) : (
        <AdsList
          setrefetchCounter={setrefetchCounter}
          userAds={userAds}
          setItemId={setItemId}
          setOpenDeleteAd={setOpenDeleteAd}
          loading={loading}
        />
      )}

      {allPageNumber >= 1 && (
        <Pagination
          pageSize={recordPerPage}
          currentPage={allPageNumber}
          siblingCount={1}
          totalCount={adsTotal}
          onPageChange={(page) => {
            dispatch(setAllPageNumber({ allPageNumber: page }));
          }}
        />
      )}
      <DeleteAd
        openModal={openDeleteAd}
        closeModal={() => setOpenDeleteAd(false)}
        onConfirm={() => {
          handleDeleteAd();
        }}
      />
    </>
  );
};

export default AllAds;
