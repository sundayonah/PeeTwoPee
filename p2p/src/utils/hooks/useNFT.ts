import { useMemo, useState } from "react";
// import erc721abi from '../abis/erc721.json'
import { useActiveWeb3React } from ".";
import { ERC1155Contract } from "..";

import { CONTRACT_ADDRESSES } from "../addresses";
import axios from "axios";

export const getSmartswapNft = (id: number) => {
  switch (id) {
    case 1:
      return Array.from({ length: 25 }, (_, i) => i + 1);

    case 2:
      return Array.from({ length: 25 }, (_, i) => i + 26);

    case 3:
      return Array.from({ length: 25 }, (_, i) => i + 51);

    case 4:
      return Array.from({ length: 300 }, (_, i) => i + 76);

    case 5:
      return Array.from({ length: 300 }, (_, i) => i + 376);

    case 6:
      return Array.from({ length: 500 }, (_, i) => i + 676);

    case 7:
      return Array.from({ length: 500 }, (_, i) => i + 1176);

    case 8:
      return Array.from({ length: 500 }, (_, i) => i + 1676);

    case 9:
      return Array.from({ length: 1000 }, (_, i) => i + 2176);

    case 10:
      return Array.from({ length: 1000 }, (_, i) => i + 3176);

    case 11:
      return Array.from({ length: 1000 }, (_, i) => i + 4176);

    case 12:
      return Array.from({ length: 1000 }, (_, i) => i + 5176);

    case 13:
      return Array.from({ length: 1000 }, (_, i) => i + 6176);

    case 14:
      return Array.from({ length: 1000 }, (_, i) => i + 7176);

    default:
      return Array.from({ length: 25 }, (_, i) => i + 1);
  }
};

export const getLaunchpadNft = (id: number) => {
  switch (id) {
    case 1:
      return Array.from({ length: 10 }, (_, i) => i + 1);

    case 2:
      return Array.from({ length: 9 }, (_, i) => i + 12);

    case 3:
      return Array.from({ length: 10 }, (_, i) => i + 21);

    case 4:
      return Array.from({ length: 25 }, (_, i) => i + 31);

    case 5:
      return Array.from({ length: 25 }, (_, i) => i + 56);

    case 6:
      return Array.from({ length: 25 }, (_, i) => i + 81);

    case 7:
      return Array.from({ length: 300 }, (_, i) => i + 106);

    case 8:
      return Array.from({ length: 300 }, (_, i) => i + 406);

    case 9:
      return Array.from({ length: 300 }, (_, i) => i + 706);

    case 10:
      return Array.from({ length: 500 }, (_, i) => i + 1006);

    case 11:
      return Array.from({ length: 500 }, (_, i) => i + 1506);

    case 12:
      return Array.from({ length: 500 }, (_, i) => i + 2006);

    default:
      return Array.from({ length: 10 }, (_, i) => i + 1);
  }
};

export const getGiftDappNft = (id: number) => {
  switch (id) {
    case 1:
      return Array.from({ length: 12 }, (_, i) => i + 1);

    case 2:
      return Array.from({ length: 12 }, (_, i) => i + 13);

    case 3:
      return Array.from({ length: 12 }, (_, i) => i + 25);

    case 4:
      return Array.from({ length: 30 }, (_, i) => i + 37);

    case 5:
      return Array.from({ length: 30 }, (_, i) => i + 67);

    case 6:
      return Array.from({ length: 30 }, (_, i) => i + 97);

    case 7:
      return Array.from({ length: 30 }, (_, i) => i + 127);

    case 8:
      return Array.from({ length: 30 }, (_, i) => i + 157);

    case 9:
      return Array.from({ length: 45 }, (_, i) => i + 187);

    case 10:
      return Array.from({ length: 75 }, (_, i) => i + 232);

    case 11:
      return Array.from({ length: 75 }, (_, i) => i + 307);

    case 12:
      return Array.from({ length: 75 }, (_, i) => i + 382);

    case 13:
      return Array.from({ length: 75 }, (_, i) => i + 457);

    case 14:
      return Array.from({ length: 75 }, (_, i) => i + 532);
    case 15:
      return Array.from({ length: 75 }, (_, i) => i + 607);
    case 16:
      return Array.from({ length: 75 }, (_, i) => i + 682);
    case 17:
      return Array.from({ length: 75 }, (_, i) => i + 757);
    case 18:
      return Array.from({ length: 150 }, (_, i) => i + 832);
    case 19:
      return Array.from({ length: 150 }, (_, i) => i + 982);
    case 20:
      return Array.from({ length: 150 }, (_, i) => i + 1132);
    case 21:
      return Array.from({ length: 150 }, (_, i) => i + 1282);
    case 22:
      return Array.from({ length: 150 }, (_, i) => i + 1432);
    case 23:
      return Array.from({ length: 375 }, (_, i) => i + 1582);
    case 24:
      return Array.from({ length: 375 }, (_, i) => i + 1957);
    case 25:
      return Array.from({ length: 750 }, (_, i) => i + 2332);
    case 26:
      return Array.from({ length: 750 }, (_, i) => i + 3082);
    case 27:
      return Array.from({ length: 750 }, (_, i) => i + 3832);
    case 28:
      return Array.from({ length: 750 }, (_, i) => i + 4582);
    case 29:
      return Array.from({ length: 1500 }, (_, i) => i + 5332);
    case 30:
      return Array.from({ length: 1500 }, (_, i) => i + 6832);
    case 31:
      return Array.from({ length: 3000 }, (_, i) => i + 8332);

    default:
      return Array.from({ length: 12 }, (_, i) => i + 1);
  }
};

export const useNFTFetch = (
  accessWallet: boolean,
  setAccessWallet: React.Dispatch<React.SetStateAction<boolean>>,
  selectedNftCollection: string | undefined,
  tokenIds: any[]
) => {
  const { account, chainId, library } = useActiveWeb3React();
  // const [nftArray, setNftArray] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any[]>();
  const [newUri, setNewUri] = useState("");

  // useMemo(() => {
  //   if (tokenUri) {
  //     try {
  //       const newURI =
  //         LAUNCHPAD_NFT[chainId as number] === selectedNftCollection
  //           ? "https://ipfs.io/ipfs" +
  //             tokenUri.split("/")[2] +
  //             "/" +
  //             tokenUri.split("/")[3]
  //           : "https://ipfs.io/ipfs" + tokenUri.split("/")[2];

  //       setNewUri(newURI);
  //     } catch (err) {
  //        
  //     }
  //   }
  // }, [tokenUri]);

  const formatUri = (uri: any) => {
    return `https://ipfs.io/ipfs/` + uri.split('"')[0] + uri.split('"')[1];
  };

  useMemo(async () => {
    if (tokenIds && selectedNftCollection) {
     //  
      if (accessWallet) {
       //  
        try {
          setLoading(true);

          const uriArray = [];

          const NFTcontract = await ERC1155Contract(
            selectedNftCollection,
            library
          );
         //  

          for (let i = 0; i < tokenIds.length; i++) {
           //  

            if (tokenIds[i].length) {
              for (let j = 0; j < tokenIds[i].length; j++) {
              //   
                const tokenUri = await NFTcontract.uri(tokenIds[i][j]);

                const metadata = await axios.get(
                  formatUri(tokenUri.split("//")[1])
                );

                uriArray.push({
                  id: tokenIds[i][j],
                  metadata: metadata.data,
                });
              }
            } else {
              const tokenUri = await NFTcontract.uri(tokenIds[i]);

              const metadata = await axios.get(
                formatUri(tokenUri.split("//")[1])
              );

              uriArray.push({
                id: tokenIds[i],
                metadata: metadata.data,
              });
            }
          }

          setMetadata(uriArray);

          setLoading(false);
          setAccessWallet(false);
        } catch (err) {
           
          setLoading(false);
          setAccessWallet(false);
        }
      }
    }
  }, [accessWallet, chainId, account, tokenIds]);

  return { loading, newUri, metadata };
};

export const useFormatURI = (
  nftArray: number[] | undefined,
  formattedURI: string
) => {
  const [formattedTokenUri, setTokenUri] =
    useState<Array<{ tokenId: number; image: any }>>();

  const getImage = async (uri: string) => {
    const request = await axios
      .get(uri)
      .then((res) => {
        return res.data.image;
      })
      .catch((err) => {
        return "";
      });

    return request;
  };

  useMemo(async () => {
    if (nftArray) {
      const tokenURIs = [];
      for (let i = 0; i < nftArray?.length; i++) {
        const imageUri =
          formattedURI + "/" + nftArray[i].toString() + "." + "json";
        const image = await getImage(imageUri);
        const tokenUri = { tokenId: nftArray[i], image: image };
        tokenURIs.push(tokenUri);
      }
      setTokenUri(tokenURIs);
    }
  }, [nftArray]);

  return { formattedTokenUri };
};

export const useNftApproveCheck = (
  nftAddress: string | undefined,
  tokenId: number | undefined,
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { account, library } = useActiveWeb3React();
  const [isApproved, setIsApproved] = useState(false);
  const { chainId } = useActiveWeb3React();

  useMemo(async () => {
    try {
      if (nftAddress) {
        const erc1155Contract = await ERC1155Contract(nftAddress, library);
        const isApproved = await erc1155Contract.isApprovedForAll(
          account,
          CONTRACT_ADDRESSES[chainId]["STAKING"]
        );
        setIsApproved(isApproved);
        setReload(false);
      }
    } catch (err) {
       
    }
  }, [account, tokenId, reload]);

  return { isApproved };
};
