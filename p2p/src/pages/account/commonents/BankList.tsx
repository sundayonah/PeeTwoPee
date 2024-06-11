
import { useMutation } from '@apollo/client';
import {   Divider, Flex, Grid, Box,   Switch, Text, useColorModeValue, useMediaQuery, Input } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { EDIT_BANK } from '../gql/mutations';
import DeleteBank from '../modals/DeleteBank';
import EditBank, { BankInfo } from '../modals/EditBank';


const BankList = ({data, refresh}: {data: any, refresh: () => void;}) => {
  
  function handleEffect() {
    refresh()
    setOpenDeleteBank(false)
    setOpenEditBank(false)
  }
  
  const LIGHT_THEME = "light";
  const DARK_THEME = "dark";
  
  
  const mode = useColorModeValue(LIGHT_THEME, DARK_THEME);
   // const activeColour = useColorModeValue('#333333', '#DCE5EF');
    const inactiveColour = useColorModeValue('#666666', '#999999');
   const bgColour = useColorModeValue('#FFFFFF','#15202B');
    const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
    const [openEditBank, setOpenEditBank] = useState(false)
    const [openDeleteBank, setOpenDeleteBank] = useState(false)
    
    const [itemTodelete, setItemToDelete] = useState<any>()
    const [bankToEdit, setBankToEdit] = useState<BankInfo>()

    function handleDelete(id:number) {
      setItemToDelete(id)
      setOpenDeleteBank(true)
   }


   function handleEditBank(bank: BankInfo) {
    setBankToEdit(bank)
    setOpenEditBank(true)
 }

 

const [
  editBank,
  { loading: updatingStatus, error: errorAdd, data: dataAdd },
] = useMutation(EDIT_BANK);

const {t} = useTranslation()
useEffect(() => {
  if(dataAdd?.editBankRecord?.status){
    refresh()
  }
}, [dataAdd])
 
  return (
   <>
    {bankToEdit &&  <EditBank bank={bankToEdit} handleResult={handleEffect} openModal={openEditBank} closeModal={()=> setOpenEditBank(false)}/>}
   
   <DeleteBank cb={handleEffect} bankId={itemTodelete} openModal={openDeleteBank} closeModal={()=> setOpenDeleteBank(false)}/>
  
     <Box
    justifyContent='space-between'
    flexDirection={["column", "column", "row"]}
    color={inactiveColour}
    padding={['0px', '0px', '15px 0px']}
    width={["100%", "100%", "100%"]}
  >

    {data &&  data.map((bank: any, index: any)=> (
     <Box  background={bgColour} border='1px solid'
     my={isMobileDevice ? "25px":0}
     py={isMobileDevice?"15px": 0}
      borderColor={
        mode === LIGHT_THEME
          ? "#F2F5F8 !important"
          : mode === DARK_THEME
          ? "#213345 !important"
          : "#F2F5F8 !important"
      }>
     
    <Divider />
     <Grid 
       py={isMobileDevice ?"10px":3} key={index} color={inactiveColour} templateColumns={isMobileDevice ?  'repeat(2, 1fr)' :  'repeat(5, 1fr)'} gap={4}  px={["10px","10px","20px"]}>
      <Box width="100%">
        <Text >{t('acct_name')}</Text>
        <Text fontSize={["16px","16px","18px"]} fontWeight={700}> {bank.account_name}</Text>
      </Box>
      <Box width={["100%", "100%", "100%"]}>
        <Text >{t('bank_name')}</Text>
        <Text fontSize={["16px","16px","18px"]} fontWeight={700}> {bank.bank_name}</Text>
      </Box>
      <Box width={["100%", "100%", "100%"]}>
        <Text >{t('acct_no')}</Text>
       
        <Text fontSize={["16px","16px","18px"]} fontWeight={700}> {bank.account_number}</Text>
      </Box>
     {/* <Box width={["100%", "100%", "100%"]}>
        <Text >Bank Sort Code</Text>
        <Text fontSize={["16px","16px","18px"]} fontWeight={700}> {bank.id}</Text>
    </Box> */}
     {!isMobileDevice && 
     <>
      <Box width={["100%", "100%", "100%"]}>
        <Flex fontSize={14} >
          <Text onClick={()=> handleEditBank(bank)}  cursor={'pointer'} m={2} pt={3}>Edit</Text>
          <Text m={2} pt={3}>| </Text>
          <Text onClick={()=> handleDelete(bank.id)} cursor={'pointer'} m={2} pt={3}>Delete</Text>
        </Flex>
      </Box>
      <Box width={["100%", "100%", "100%"]}>
        <Flex fontSize={14} >
          <Switch isChecked={bank?.is_enabled}  
          onChange={
            ()=> {
            editBank({ 
              variables: {
                params: {
                    id: bank.id,
                    is_enabled: !bank.is_enabled
                },
              },}
            )
          }} 
          pt={3.5} m={2} size='sm' />
          <Text cursor={'pointer'} pt={3} m={2}>{bank?.is_enabled ? "ON" : "OFF"}</Text>
        </Flex>
      </Box>
     </>
    }
    </Grid>
   {isMobileDevice && 
  
   <Grid  templateColumns={isMobileDevice ?  'repeat(2, 1fr)' :  'repeat(5, 1fr)'} gap={4}>
    <Box width={["100%", "100%", "100%"]}>
        <Flex fontSize={14} >
          <Text onClick={()=> handleEditBank(bank)}  cursor={'pointer'} m={2}>{t('edit')}</Text>
          <Text m={2}>| </Text>
          <Text onClick={()=> handleDelete(bank.id)} cursor={'pointer'} m={2}>{t('delete')}</Text>
        </Flex>
      </Box>
      <Box width={["100%", "100%", "100%"]}>
        <Flex fontSize={14} >
          <Switch pt={0.5} m={2} size='sm' />
          <Text cursor={'pointer'} m={2}>{t('on')}</Text>
        </Flex>
      </Box>
    </Grid>}
    
    </Box>
    ))}

  </Box>

  </>
  )
}

export default BankList