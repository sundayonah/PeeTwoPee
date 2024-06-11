import { screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { fakeUser } from "../../../lib/testUtils";
import wait from 'waait';
import { REGISTER_USER, VERIFY_USER_RECORD } from "../../../pages/Home/gql/mutations";
import Signup from "../../../pages/Home/index"
import store from "../../../state/store";
import { screanId, setActiveBar } from "../../../state/accountUi";
import { testRender } from "../../../utils/TestUtil";
import { act } from 'react-dom/test-utils';

const me = fakeUser()

const mocks = [
    // mutation mocks
    {
        request :{
           query: REGISTER_USER,
           variables:{
            input: {
                address: me.address,
                fullname: me.fullName,
                phone: `${me.country_code}${me.phone}`,
                country_code: me.country_code,
                country: me.country,
                type:me.type,
                otp: me.OTP,
                bank: {
                  bank_name: me.bank[0].bank,
                  account_number:me.bank[0].account,
                  account_name: me.bank[0].name,
                },
              },
           }
        },
result: {
data:{
    user: {
        _id:"9299292",
        address:me.address,
        fullname:me.fullName,
        phone:`${me.country_code}${me.phone}`,
        country: me.country_code,
        type: me.type,
        banks: {
          id:"883983",
          bank_name: me.bank[0].bank,
          account_number:me.bank[0].account,
          account_name: me.bank[0].name,
        },
        // createdAt
        // updatedAt
      },
      token:me.OTP
    }
}
},
{
  request: {
    query: VERIFY_USER_RECORD,
    variables: { 
      params: {
        address: me.address,
        phone: `${me.country_code}${me.phone}`,
        country_code: me.country_code,
      },
     },
  },
  result: {
    data: {
     user: {
      __typename: 'verifyUserRecord',
      _id:"9299292",
      address:me.address,
      fullname:me.fullName,
      phone:`${me.country_code}${me.phone}`,
      country: me.country_code,
      type: me.type,
      banks: {
        id:"883983",
          bank_name: me.bank[0].bank,
          account_number:me.bank[0].account,
          account_name: me.bank[0].name,
      }
      // createdAt
      // updatedAt
      
     },
     token:me.OTP
    },
  },
},
]



describe('<SignUp/>', () => {
    
  
    it('calls the mutation properly', async () => {
      const dummyDispatch = jest.fn()
    // const wrapper=  render(
    //   <Web3ReactProviderReloaded getLibrary={getLibrary}>
    //     <ReactRedux store={store}>
    //          <MockedProvider mocks={mocks}>
    //       <Signup />
    //     </MockedProvider> 
    //      </ReactRedux>
    //      </Web3ReactProviderReloaded>
       
    //   );
    const signUp=testRender(<Signup/>, { store,mocks });

      // Type into the boxes
       userEvent.type(screen.getByPlaceholderText(/name/i), me.fullName);
       userEvent.type(screen.getByPlaceholderText(/number/i), me.phone);
      act(()=>{
        userEvent.click(screen.getByTestId('verifyUserRecord'));
      store.dispatch(setActiveBar(screanId.VERIFYNUMBER));
      })
      
      await waitFor(() => wait(1));
      const verifyNumber = screen.getByTestId("verifyNumber")
      expect(verifyNumber).toBeInTheDocument()
      act(()=>{
      store.dispatch(setActiveBar(screanId.PAYMETHOD));
      })
      const paymentDetails = screen.getByTestId("paymentDetails")
        userEvent.click(paymentDetails);
      const paymentMethod = screen.getByText("Add a payment method to receive payments.")
        expect(paymentMethod).toBeInTheDocument()
    
    });
  });