import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import SmartSwapLPTokenABI1 from './abis/SmartSwapRouterV2.json';
import CouncilMemberStakeABI from './abis/RigelCouncilMemberStake.json';
import erc20TokenAbi from './abis/erc20.json';
import erc1155TokenAbi from './abis/erc1155.json';
import RigelDecentralizedP2PSystemabi from './abis/p2p.json';
import RigelDecentralizedRewardSystemabi from './abis/reward.json';

//Liquuidity provider token contracts

export const smartSwapLPTokenPoolOne = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(address, SmartSwapLPTokenABI1, library?.getSigner());
};

export const CouncilMemberStakeContract = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(address, CouncilMemberStakeABI, library?.getSigner());
};

export const ERC20Token = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(address, erc20TokenAbi, library?.getSigner());
};

export const ERC1155Contract = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(address, erc1155TokenAbi, library?.getSigner());
};

export const RigelDecentralizedP2PSystemContract = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(
    address,
    RigelDecentralizedP2PSystemabi,
    library?.getSigner()
  );
};

export const RigelDecentralizedRewardSystem = async (
  address: string,
  library: Web3Provider | undefined
) => {
  return new Contract(
    address,
    RigelDecentralizedRewardSystemabi,
    library?.getSigner()
  );
};
