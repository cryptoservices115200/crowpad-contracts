const CronosToken = artifacts.require("CronosToken")
const CrowpadAirdropper = artifacts.require("CrowpadAirdropper")
const totalAmount = "1000000000000000000000000"

module.exports = async function (deployer, networks, accounts) {
  // deploy Airdropper
  await deployer.deploy(CrowpadAirdropper)
  const crowpadAirdropper = await CrowpadAirdropper.deployed()

  // get cronosToken
  const cronosToken = await CronosToken.at("0x823A790e7672afcAFe8CE408aA1f5EFf6bc3ccd7")

  // approve Airdropper as spender in token contract
  cronosToken.approve(crowpadAirdropper.address, totalAmount)
}
