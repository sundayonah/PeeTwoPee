import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { createWeb3ReactRoot } from "@web3-react/core";
import { Provider } from "react-redux";
import getLibrary from "./getLibrary";

export function testRender(jsx:any, { store,mocks, ...otherOpts }:{store:any,mocks:any}) {
    const Web3ReactProviderReloaded = createWeb3ReactRoot("https://ropsten.infura.io/v3/8400db8ec41b4f1e8f4e003d4904cd77");
  return render(
    <Web3ReactProviderReloaded getLibrary={getLibrary}>
        <MockedProvider mocks={mocks}>
  <Provider store={store}>
    {jsx}
    </Provider>
    </MockedProvider> 
    </Web3ReactProviderReloaded>
    , otherOpts);
}

