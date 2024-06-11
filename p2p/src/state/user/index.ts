import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const currentTimestamp = () => new Date().getTime();

export interface SerializedToken {
    chainId: number
    address: string
    decimals: number
    symbol?: string
    name?: string
  }
interface ILang {
  value:string;
  text:string;
  icon:string;
}
interface UserState {
    id : number;
    tokens: {
        [chainId: number]: {
          [address: string]: SerializedToken
        }
      };
      languages:ILang[];
      language:ILang;
      timestamp: number;
      selectedFiat: {name:string,logo:string,currency:string};
      defaultTokenNav:any;
      paymentMethods: string[];
      chainId:number| null;
      walletBalances: any
}

const initialState : UserState = {
    id : 2,
    tokens: {},
    timestamp: currentTimestamp(),
    defaultTokenNav:{
      "BSC":["RGP",'BUSD',"USDT","BRISE","HYVE","XRPC","ALGOBLK","LFW"],
      "BSCTEST" : ["RGP",'BUSD',"USDT"],
      "MATIC":["RGP"," USDC","USDT"],
    },
    language:{ value: 'en', text: "English" ,icon:"gb" },
   languages: [
      // { value: '', text: "Options" },
      { value: 'en', text: "English",icon:"gb" },
      { value: 'hi', text: "हिंदी",icon:"in" },
      { value: 'fr', text: "Français",icon:"fr" },
      { value: 'ru', text: "Русский",icon:"ru" },
      { value: 'zh', text: "中国人",icon:"cn" },
      { value: 'vi', text: "Tiếng Việt",icon:"vn"},
    ],
    paymentMethods: ["Bank Transfer"],
    chainId: 56,
    selectedFiat:{name:"United state of America",logo:"https://countryflagsapi.com/svg/us",currency:"USD"},
    walletBalances: {
     "BSC": [
      {
        symbol: 'RGP',
        // address:"0x9f0227A21987c1fFab1785BA3eBa60578eC1501B",
        address:"0xFA262F303Aa244f9CC66f312F0755d89C3793192",
        name:"RigelToken",
        id:"rigel-protocol",
        pinned:true,
        logo:"https://bscscan.com/token/images/rigelprotocol_32.png"
      },
      {
        name: 'BUSD Token',
        symbol: 'BUSD',
        // address: '0x10249E900B919FDEe9e2ED38b4cd83C4df857254',
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        id:"binance-usd",
        pinned:true,
        logo:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BUSD-BD1/logo.png"

      },
      {
        name: 'USDT Token',
        // address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        address: "0x55d398326f99059fF775485246999027B3197955",
        symbol: 'USDT',
        id:"tether",
        pinned:true,
        logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDT.svg"  
      }
  
     ],
     "BSCTEST": [
      {
        symbol: 'RGP',
        address:"0x9f0227A21987c1fFab1785BA3eBa60578eC1501B",
        name:"RigelToken",
        id:"rigel-protocol",
        pinned:true,
        logo:"https://bscscan.com/token/images/rigelprotocol_32.png"
      },
      {
        name: 'BUSD Token',
        symbol: 'BUSD',
        address: '0x10249E900B919FDEe9e2ED38b4cd83C4df857254',
        id:"binance-usd",
        pinned:true,
        logo:"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BUSD-BD1/logo.png"
      },
      {
        name: 'USDT Token',
        address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        symbol: 'USDT',
        id:"tether",
        pinned:true,
        logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDT.svg"  
      }
  
     ],
      "MATIC": [
        {
          "symbol": "RGP",
          "name": "Rigel Token",
          // "address": "0x8E62F88FD28F95cE0dD0557c8419215b5599CE64",
          "address": "0x4AF5ff1A60a6eF6C7c8f9C4E304cD9051fCa3Ec0",
          "id": "rigel-protocol",
          "pinned": true,
          logo:"https://bscscan.com/token/images/rigelprotocol_32.png"
      },
      {
        "symbol": "USDC",
        "name": "USDCToken",
        // "address": "0xd22c5DbE967C2f9ac302729354fE32eB88b6B645",
        "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        "id": "usd-coin",
        "pinned": true,
        logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDC.svg"

    },
    {
      // address: "0x7E1cF971de65eB065A72595B3Ac9e1b9Cc630564",
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      id:"tether",
      name: "USDTToken",
      pinned: true,
      symbol: "USDT",
      logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDT.svg"    
    }
      ],
      "MATICTEST": [
        {
          "symbol": "RGP",
          "name": "Rigel Token",
          "address": "0x8E62F88FD28F95cE0dD0557c8419215b5599CE64",
          "id": "rigel-protocol",
          "pinned": true,
          logo:"https://bscscan.com/token/images/rigelprotocol_32.png"
      },
      {
        "symbol": "USDC",
        "name": "USDCToken",
        "address": "0xd22c5DbE967C2f9ac302729354fE32eB88b6B645",
        "id": "usd-coin",
        "pinned": true,
        logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDC.svg"
    },
    {
      address: "0x7E1cF971de65eB065A72595B3Ac9e1b9Cc630564",
      id:"tether",
      name: "USDTToken",
      pinned: true,
      symbol: "USDT"  ,
      logo:"https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDT.svg"  
    }
      ]
    }
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        updateId : (state , action : PayloadAction<{id : number}>) => {
            state.id = action.payload.id
        },
        addSerializedToken: (state, { payload: { serializedToken } }) => {
            state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {}
            state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken
            state.timestamp = currentTimestamp()
        },
        removeSerializedToken: (state, { payload: { address, chainId } }) => {
            state.tokens[chainId] = state.tokens[chainId] || {}
            delete state.tokens[chainId][address]
            state.timestamp = currentTimestamp()
          },
          addToDefaultTokenNav: (state, { payload: { token,chainId } }) => {
            let chainID = chainId ==97 || chainId == 56 ? "BSC" : chainId==137|| chainId==80001 ? "MATIC" : "BSC"
            
        state.defaultTokenNav[chainID].indexOf(token.toUpperCase()) === -1 ? 
        state.defaultTokenNav[chainID].push(token.toUpperCase()) : 
        state.defaultTokenNav[chainID].splice(state.defaultTokenNav[chainID].indexOf(token.toUpperCase()),1)
          },
          setLanguage(state,action){
            state.language= action.payload.language
          },
    setChainId( state, action) {
       
      state.chainId = action.payload
    },
    setSelectedFiat( state, action) {
      state.selectedFiat = action.payload.fiat
    },
    addToWalletBalances(state, { payload: { token,chainId } }) {
     //  
      let chainID = chainId ==97 ?"BSCTEST" : chainId==80001 ? "MATICTEST" : chainId == 56 ? "BSC" : "MATIC"
      state.walletBalances[chainID].map((item:any)=>item.symbol.toLowerCase()).indexOf(token.symbol.toLowerCase()) === -1 && state.walletBalances[chainID].push(token)
    },
    removeFromWalletBalances(state, { payload: { token ,chainId } }) {
     //  
      let chainID = chainId ==97 ?"BSCTEST" : chainId==80001 ? "MATICTEST" : chainId == 56 ? "BSC" : "MATIC"
      state.walletBalances[chainID].map((item:any)=>item.symbol.toLowerCase()).indexOf(token.symbol.toLowerCase()) !== -1 && 
      state.walletBalances[chainID].splice(state.walletBalances[chainID].map((item:any)=>item.symbol.toLowerCase()).indexOf(token.symbol.toLowerCase()),1)
    } 

          
    }
});

export const  {updateId,setLanguage ,addSerializedToken,removeSerializedToken,addToDefaultTokenNav,removeFromWalletBalances,setChainId,addToWalletBalances,setSelectedFiat }  = userSlice.actions
export default userSlice.reducer;
