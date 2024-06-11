import { act, render, screen } from '@testing-library/react';
import Timer from "../../../components/Timer/index"


describe('<Timer />',()=>{
    const updateUI = () =>{
        
    }
    it("renders out and changes background, once the timer is done",()=>{

            jest.useFakeTimers();
            render(<Timer secs="2" updateUI={updateUI}/>);
            act(() => {
              jest.advanceTimersByTime(2000);
            });
            const secs = screen.getByTestId("secs")
            expect(secs).toHaveStyle(`background:#CC334F`)
     
    
    })
    
})