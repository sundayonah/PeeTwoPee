import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SellerListItemComponent from "../../../pages/Sell/components/SellListData/SellListItemComponent"


describe('<SellerListItemComponent />',()=>{
    const checkForConnection = () => {
    
    }
   const priceObject = {
    _id: "993",
    type: "sell",
    asset: "BUSD",
    fiat: "NGN",
    price_type: "string",
    price: "23",
    crypto_amount: 3,
    sold: 1,
    payment_method: "bank tranfer",
    limit_min: 7,
    limit_max: 10,
    duration: 12,
    terms: "string",
    status: "string",
    auto_reply: "",
    createdAt: "string",
    updatedAt: "string",
    user: {
        fullname:"string",
    }
      }
  it("has the ads information",async ()=>{
    const { container } = render(
     <SellerListItemComponent data={priceObject} page="buy" checkForConnection={checkForConnection} />   
    )
    const price = screen.getByText(priceObject.Price);
    const paymentMethod = screen.getByText(priceObject['Payment Method']);
    const available = screen.getByTestId("available")
    const limit = screen.getByTestId("limit")
    const button = screen.getByTestId("button")
    

    expect(price).toBeInTheDocument()
    expect(paymentMethod).toBeInTheDocument()
    expect(available).toHaveTextContent(`${priceObject.amount} ${priceObject.token}`)
    expect(limit).toHaveTextContent(`NGN${priceObject.Limits[0]} - NGN${priceObject.Limits[1]}`)
    expect(button).toHaveStyle(`background:#0CCB80`)
    expect(button).toHaveTextContent(`Buy ${priceObject.token}`)

     userEvent.click(button)
  })

  it("Matches snapshot",()=>{
    const {container} = render(<SellerListItemComponent priceObject={priceObject} page="Buy" checkForConnection={checkForConnection} />)
    expect(container).toMatchSnapshot()
})
})