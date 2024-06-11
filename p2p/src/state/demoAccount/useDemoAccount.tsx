import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { toggleDemoAccont } from '.'

const useDemoAccount = () => {

    const isDemoAccount = localStorage.getItem('isDemo')
    const dispatch = useDispatch()

    useEffect(() => {
        if(isDemoAccount == '1'){
            dispatch(toggleDemoAccont(true))
        }else if (isDemoAccount == '0'){
            dispatch(toggleDemoAccont(false))
        }
    }, [isDemoAccount])
    
  return 
}

export default useDemoAccount