import casual from "casual"

const fakeUser = (account?:string | null)=> ({
    id:"89292",
    address:account ? account : "0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767",
    phone:"8156736373",
    fullName:casual.full_name,
    country_code:"+234",
    country:casual.country,
    type:"merchant",
    OTP:"TGJKOWO",
    bank: [
        {
          name:casual.full_name,
          account:"0363998906",
          bank:"GTBank"
        },
        {
          name:casual.full_name,
          account:"03639989",
          bank:"first bank"
        },
        {
          name:casual.full_name,
          account:"03639906",
          bank:"data bank"
        },
  
      ]
})

export {
    fakeUser
}