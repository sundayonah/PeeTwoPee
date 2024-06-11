import { shortenAddress } from '../../utils';


describe('shorten address',()=>{
  // it("shorten the address passed to it",()=>{
  //     const shortenedAddress = shortenAddress("0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767")
  //     const expected = "0x3552...F767"
  //       expect(shortenedAddress).toEqual(expected)
  // })
    it.each([
      ['0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767', '0x3552...F767',, ],
      ['0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767', '0x3552b...7F767', 5, ],
      ['0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767', '0x3...7', 1, ],
      ['0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767', '0x3552b6...07F767', 6, ],
      ['0x3552b618Dc1c3d5e53818C651Bc41Ae7A307F767', '0x3552b618...A307F767', 8, ],
    ])('truncates "%s" to "%s" correctly', (address, expected, startLength) => {
      expect(shortenAddress(address, startLength)).toEqual(expected)
    })
  
})

