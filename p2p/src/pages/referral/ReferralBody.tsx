import {  Tr, Td, Text } from "@chakra-ui/react";
import moment from 'moment';

interface ReferralBodyProps {
referral : {
  fullname:string,
  address: string,
  rank:string,
  ref_earnings : number,
  createdAt : string
}
}

const getDtae = (_ : any) => {
  return   new Date(parseFloat(_)).toLocaleString()
  }



function ReferralBody({ referral }: ReferralBodyProps) {
  return (
      <Tr>
        <Td>
          <Text fontSize='14px'>{referral?.fullname}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{referral?.address}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{referral?.rank ? referral?.rank : '-----'}</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{referral?.ref_earnings ? referral?.ref_earnings : '0'} RGP</Text>
        </Td>
        <Td>
          <Text fontSize='14px'>{moment(getDtae(referral?.createdAt) ).format(moment.HTML5_FMT.DATE)}</Text>
        </Td>
       
      </Tr>
  );
}

export default ReferralBody;
