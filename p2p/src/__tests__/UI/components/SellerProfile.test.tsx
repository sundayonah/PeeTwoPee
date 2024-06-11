import { render, screen } from '@testing-library/react';
import SellerInformation from "../../../pages/Sell/components/SellerInformation"


describe('<SellerInformation />',()=>{
  const sellerInformationNoImage ={
    username:"Gabriel Zone",
    badge:"G",
    img:"",
    orderCompleted:45,
    orderPercentage:34.6,
    status:"online"
  }
  const sellerInformation = {
    username:"John Doe",
    badge:"S",
    img:"93993",
    orderCompleted:45,
    orderPercentage:34.6,
    status:"online"
  }

  it("has the seller information with no Image",async ()=>{
     render(<SellerInformation seller={sellerInformationNoImage} />)
      const profilePicture = await screen.findByTestId("profilePicture")
        expect(profilePicture).toHaveTextContent(sellerInformationNoImage.username[0])
  })
  
  it("has the seller information",async ()=>{
      render(<SellerInformation seller={sellerInformation} />)
      const profilePicture = screen.getByTestId("profilePicture")
      const profileUsername = screen.getByTestId("profileUsername")
      const profileStatus = screen.getByTestId("profileStatus")
      const profileInformation = screen.getByTestId("profileInformation")
      const profileBadge = screen.getByTestId("profileBadge")
      

        
        expect(profilePicture).toHaveAttribute("src",sellerInformation.img)
        expect(profileUsername).toHaveTextContent(sellerInformation.username)
        expect(profileStatus).toHaveStyle(`background:#22BB33`)
        expect(profileInformation).toHaveTextContent(`${sellerInformation.orderCompleted} Order(s) | ${sellerInformation.orderPercentage}% Completion`)
        expect(profileBadge).toBeInTheDocument()
  })

  it("Matches snapshot",()=>{
    const {container} = render(<SellerInformation seller={sellerInformation} />)
    expect(container).toMatchSnapshot()
})
})