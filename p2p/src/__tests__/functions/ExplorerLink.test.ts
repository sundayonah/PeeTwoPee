import { SupportedChainId } from '../../constants/chains';
import { ExplorerDataType, getExplorerLink, shortenAddress } from '../../utils';

describe('explorer link',()=>{
    it("gets the explorer link",()=>{
      let data = "ejieiejndijeo0003"
      let chainID = SupportedChainId.BINANCETEST
        const shortenedAddress = getExplorerLink(chainID,data,ExplorerDataType.TRANSACTION)
        const expected = `https://testnet.bscscan.com/tx/${data}`
          expect(shortenedAddress).toEqual(expected)
    })
  })