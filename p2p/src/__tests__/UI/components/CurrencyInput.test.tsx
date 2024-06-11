import { render, screen } from '@testing-library/react';
import CurrencyInput from "../../../pages/Sell/components/CurrencyInput"


describe('<CurrencyInput />',()=>{
  it("has the payment method",()=>{
      render(<CurrencyInput />)
      const paymentMethod = screen.getByText("Payment Method")
        expect(paymentMethod).toBeInTheDocument()
  })
})