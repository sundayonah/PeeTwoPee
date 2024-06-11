import { useSelector } from "react-redux"
import { useActiveWeb3React } from "../../utils/hooks"
import { RootState } from "../store"

export function useBlockNumber(): number | undefined {
    const { chainId } = useActiveWeb3React()
  
    return useSelector((state: RootState) => state.application.blockNumber[chainId ?? -1])
  }