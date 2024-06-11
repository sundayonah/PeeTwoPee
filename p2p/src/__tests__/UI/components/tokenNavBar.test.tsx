import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderResult,screen } from '@testing-library/react';
import TokenNavBarHeader from "../../../pages/Sell/components/TokenNavbarHeader"


describe('<TokenNavBar />',()=>{
    it("renders out a default token",()=>{
        render(<TokenNavBarHeader/>)
        const BNBToken = screen.getByText("BNB")
        expect(BNBToken).toBeInTheDocument()
    })
    it("Matches snapshot",()=>{
        const {container} = render(<TokenNavBarHeader />)
        expect(container).toMatchSnapshot()
    })
})