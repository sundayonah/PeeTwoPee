const abiDecoder = require("abi-decoder");

function decode(abi, receipt) {
  abiDecoder.addABI(abi);
  
  const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
  const ID = decodedLogs[0].events[4].value;

  return ID;
}

module.exports = decode;

