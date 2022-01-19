const CronosToken = artifacts.require("CronosToken")
const totalAmount = "1000000000000000000000000"

module.exports = function (deployer, networks, accounts) {
  // deploy cronos token
  deployer.deploy(CronosToken, "Cronos Token", "CRT", totalAmount)
}
